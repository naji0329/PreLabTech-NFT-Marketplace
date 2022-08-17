pub mod utils;
use borsh::{BorshDeserialize,BorshSerialize};
use {
    crate::utils::*,
    anchor_lang::{
        prelude::*,
        AnchorDeserialize,
        AnchorSerialize,
        Key,
        solana_program::{
            program::{invoke_signed},
            program_pack::Pack,
        }      
    },
    metaplex_token_metadata::{
        instruction::{
            create_metadata_accounts,
            create_master_edition,
            update_metadata_accounts,
        },
    },
    spl_token::state,
};
declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

pub const collection_SIZE : usize = 32 + 8 + 8 + 1;

#[program]
pub mod solana_anchor {
    use super::*;

    pub fn init_collection(
        ctx : Context<InitCollection>,
        _max_supply: u64,
        _bump : u8,
        ) -> ProgramResult {
        let collection = &mut ctx.accounts.collection;
        collection.owner = *ctx.accounts.owner.key;
        collection.max_supply = _max_supply;
        collection.current_supply = 0;
        collection.bump = _bump;
        Ok(())
    }
    
    pub fn set_authority(
        ctx : Context<SetAuthority>,
        ) -> ProgramResult {
        let collection = &mut ctx.accounts.collection;
        collection.owner = *ctx.accounts.new_owner.key;
        Ok(())
    }

    pub fn mint_nft(
        ctx : Context<MintNft>,
        _data : Metadata,
        ) -> ProgramResult {
        let collection = &mut ctx.accounts.collection;
        let seeds = &[collection.rand.as_ref(), &[collection.bump]];
        let mint : state::Mint = state::Mint::unpack_from_slice(&ctx.accounts.mint.data.borrow())?;
        if mint.decimals != 0 {
            return Err(CollectionError::InvalidMintAccount.into());
        }
        if mint.supply != 0 {
            return Err(CollectionError::InvalidMintAccount.into());
        }
        if collection.max_supply > collection.current_supply + 1 {
            return Err(CollectionError::ExceedAmount.into())
        }
        spl_token_mint_to(
            TokenMintToParams{
                mint : ctx.accounts.mint.clone(),
                account : ctx.accounts.token_account.clone(),
                owner : ctx.accounts.owner.clone(),
                token_program : ctx.accounts.token_program.clone(),
                amount : 1 as u64,
            }
        )?;

        let mut creators : Vec<metaplex_token_metadata::state::Creator> = 
            vec![metaplex_token_metadata::state::Creator{
                address: collection.key(),
                verified : true,
                share : 0,
            }];
        for c in _data.creators {

            creators.push(metaplex_token_metadata::state::Creator{
                address : c.address,
                verified : false,
                share : c.share,
            });
        }

        invoke_signed(
            &create_metadata_accounts(
                *ctx.accounts.token_metadata_program.key,
                *ctx.accounts.metadata.key,
                *ctx.accounts.mint.key,
                *ctx.accounts.owner.key,
                *ctx.accounts.owner.key,
                *ctx.accounts.owner.key,
                _data.name,
                _data.symbol,
                _data.uri,
                Some(creators),
                _data.seller_fee_basis_points,
                true,
                _data.is_mutable,
            ),
            &[
                ctx.accounts.metadata.clone(),
                ctx.accounts.mint.clone(),
                ctx.accounts.owner.clone(),
                ctx.accounts.owner.clone(),
                ctx.accounts.owner.clone(),
                ctx.accounts.token_metadata_program.clone(),
                ctx.accounts.token_program.clone(),
                ctx.accounts.system_program.to_account_info().clone(),
                ctx.accounts.rent.to_account_info().clone(),
            ],
            &[seeds]
        )?;

        invoke_signed(
            &create_master_edition(
                *ctx.accounts.token_metadata_program.key,
                *ctx.accounts.master_edition.key,
                *ctx.accounts.mint.key,
                *ctx.accounts.owner.key,
                *ctx.accounts.owner.key,
                *ctx.accounts.metadata.key,
                *ctx.accounts.owner.key,
                None,
            ),
            &[
                ctx.accounts.master_edition.clone(),
                ctx.accounts.mint.clone(),
                ctx.accounts.owner.clone(),
                ctx.accounts.owner.clone(),
                ctx.accounts.owner.clone(),
                ctx.accounts.metadata.clone(),
                ctx.accounts.token_program.clone(),
                ctx.accounts.system_program.to_account_info().clone(),
                ctx.accounts.rent.to_account_info().clone(),
            ],
            &[seeds]
        )?;

        invoke_signed(
            &update_metadata_accounts(
                *ctx.accounts.token_metadata_program.key,
                *ctx.accounts.metadata.key,
                *ctx.accounts.owner.key,
                None,
                None,
                Some(true),
            ),
            &[
                ctx.accounts.token_metadata_program.clone(),
                ctx.accounts.metadata.clone(),
                ctx.accounts.owner.clone(),                
            ],
            &[seeds]
        )?;
        collection.current_supply += 1 as u64;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct MintNft<'info> {
    #[account(mut,signer)]
    owner : AccountInfo<'info>,

    #[account(mut)]
    collection : ProgramAccount<'info, Collection>,

    #[account(mut,owner=spl_token::id())]
    mint : AccountInfo<'info>,

    #[account(mut,owner=spl_token::id())]
    token_account : AccountInfo<'info>,

    #[account(mut)]
    metadata : AccountInfo<'info>,

    #[account(mut)]
    master_edition : AccountInfo<'info>,

    #[account(address=metaplex_token_metadata::id())]
    token_metadata_program : AccountInfo<'info>,

    #[account(address=spl_token::id())]
    token_program : AccountInfo<'info>,

    system_program : Program<'info,System>,

    rent : Sysvar<'info,Rent>,
}

#[derive(Accounts)]
pub struct SetAuthority<'info>{
    #[account(mut, has_one=owner)]
    collection : ProgramAccount<'info, Collection>,

    #[account(mut,signer)]
    owner : AccountInfo<'info>,

    #[account(mut)]
    new_owner : AccountInfo<'info>,
}

#[derive(Accounts)]
#[instruction(_bump : u8)]
pub struct InitCollection<'info>{
    #[account(init, payer=owner, space=8+collection_SIZE)]
    collection : ProgramAccount<'info, Collection>,
    #[account(mut,signer)]
    owner : AccountInfo<'info>,
    system_program : Program<'info,System>,
}

#[account]
pub struct Collection{
    pub owner : Pubkey,
    pub max_supply : u64,
    pub current_supply: u64,
    pub bump : u8,
}

#[derive(AnchorSerialize,AnchorDeserialize,Clone)]
pub struct Creator {
    pub address : Pubkey,
    pub verified : bool,
    pub share : u8,
}

#[derive(AnchorSerialize,AnchorDeserialize,Clone,Default)]
pub struct Metadata{
    pub name : String,
    pub symbol : String,
    pub uri : String,
    pub seller_fee_basis_points : u16,
    pub creators : Vec<Creator>,
    pub is_mutable : bool,
}

#[error]
pub enum CollectionError {
    #[msg("Token mint to failed")]
    TokenMintToFailed,

    #[msg("Token set authority failed")]
    TokenSetAuthorityFailed,

    #[msg("Token transfer failed")]
    TokenTransferFailed,

    #[msg("Invalid mint account")]
    InvalidMintAccount,

    #[msg("Exeed amount")]
    ExceedAmount,
}