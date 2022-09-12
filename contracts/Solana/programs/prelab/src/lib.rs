pub mod utils;
use borsh::{BorshDeserialize,BorshSerialize};
use anchor_spl::token::Token;
use {
    crate::utils::*,
    anchor_lang::{
        prelude::*,
        AnchorDeserialize,
        AnchorSerialize,
        Key,
        solana_program::{
            program_pack::Pack,
            program::{invoke_signed},
        }      
    },
    spl_token::state,
    mpl_token_metadata::{
        instruction::{
            create_metadata_accounts_v2,
            create_master_edition_v3,
            update_metadata_accounts,
        },
    }
};
declare_id!("C47gbJh2S4ESsLYDgxod6k83uawxEhYsNbLfNi1vuqvV");

pub const COLLECTION_SIZE : usize = 32 + 8 + 8 + 1;

#[program]
pub mod solana_anchor {
    use super::*;

    pub fn init_collection(
        ctx : Context<InitCollection>,
        _max_supply: u64,
        _bump : u8,
        ) -> Result<()> {
        let collection = &mut ctx.accounts.collection;
        collection.owner = *ctx.accounts.owner.key;
        collection.rand = *ctx.accounts.rand.key;
        collection.max_supply = _max_supply;
        collection.current_supply = 0;
        collection.bump = _bump;
        Ok(())
    }
    
    pub fn set_authority(
        ctx : Context<SetAuthority>,
        ) -> Result<()> {
        let collection = &mut ctx.accounts.collection;
        collection.owner = *ctx.accounts.new_owner.key;
        Ok(())
    }

    pub fn mint_nft(
        ctx : Context<MintNft>,
        _data : Metadata,
        ) -> Result<()> {
        let collection = &mut ctx.accounts.collection;
        let seeds = &[collection.rand.as_ref(), &[collection.bump]];
        let mint : state::Mint = state::Mint::unpack(&ctx.accounts.mint.data.borrow())?;
        if mint.decimals != 0 {
            return err!(CollectionError::InvalidMintAccount);
        }
        if mint.supply != 0 {
            return err!(CollectionError::InvalidMintAccount);
        }
        if collection.max_supply > collection.current_supply + 1 {
            return err!(CollectionError::ExceedAmount)
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

        let mut creators : Vec<mpl_token_metadata::state::Creator> = 
            vec![mpl_token_metadata::state::Creator{
                address: collection.key(),
                verified : true,
                share : 0,
            }];
        for c in _data.creators {

            creators.push(mpl_token_metadata::state::Creator{
                address : c.address,
                verified : false,
                share : c.share,
            });
        }

        invoke_signed(
            &create_metadata_accounts_v2(
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
                None,
                None,
            ),
            &[
                ctx.accounts.metadata.to_account_info().clone(),
                ctx.accounts.mint.to_account_info().clone(),
                ctx.accounts.owner.to_account_info().clone(),
                ctx.accounts.owner.to_account_info().clone(),
                ctx.accounts.owner.to_account_info().clone(),
                ctx.accounts.token_metadata_program.to_account_info().clone(),
                ctx.accounts.token_program.to_account_info().clone(),
                ctx.accounts.system_program.to_account_info().clone(),
                ctx.accounts.rent.to_account_info().clone(),
            ],
            &[seeds]
        )?;

        invoke_signed(
            &&create_master_edition_v3(
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
                ctx.accounts.master_edition.to_account_info().clone(),
                ctx.accounts.mint.to_account_info().clone(),
                ctx.accounts.owner.to_account_info().clone(),
                ctx.accounts.owner.to_account_info().clone(),
                ctx.accounts.owner.to_account_info().clone(),
                ctx.accounts.metadata.to_account_info().clone(),
                ctx.accounts.token_program.to_account_info().clone(),
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
                ctx.accounts.token_metadata_program.to_account_info().clone(),
                ctx.accounts.metadata.to_account_info().clone(),
                ctx.accounts.owner.to_account_info().clone(),                
            ],
            &[seeds]
        )?;
        collection.current_supply += 1 as u64;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct MintNft<'info> {
    #[account(mut)]
    owner : Signer<'info>,

    #[account(mut)]
    collection : Account<'info, Collection>,

    /// CHECK: account constraints checked in account trait
    #[account(mut,owner=spl_token::id())]
    mint : UncheckedAccount<'info>,

    /// CHECK: account constraints checked in account trait
    #[account(mut,owner=spl_token::id())]
    token_account : UncheckedAccount<'info>,

    /// CHECK: account constraints checked in account trait
    #[account(mut)]
    metadata : UncheckedAccount<'info>,

    /// CHECK: account constraints checked in account trait
    #[account(mut)]
    master_edition : UncheckedAccount<'info>,

    /// CHECK: account constraints checked in account trait
    #[account(address=mpl_token_metadata::id())]
    token_metadata_program : UncheckedAccount<'info>,

    token_program : Program<'info, Token>,

    system_program : Program<'info,System>,

    rent : Sysvar<'info,Rent>,
}

#[derive(Accounts)]
pub struct SetAuthority<'info>{
    #[account(mut, has_one=owner)]
    collection : Account<'info, Collection>,

    #[account(mut)]
    owner : Signer<'info>,
    /// CHECK: account constraints checked in account trait
    #[account(mut)]
    new_owner : UncheckedAccount<'info>,
}

#[derive(Accounts)]
#[instruction(_bump : u8)]
pub struct InitCollection<'info>{
    #[account(init, payer=owner, space=8+COLLECTION_SIZE)]
    collection : Account<'info, Collection>,

    #[account(mut)]
    owner : Signer<'info>,
    /// CHECK: account constraints checked in account trait 
    #[account()]
    rand: UncheckedAccount<'info>,

    system_program : Program<'info,System>,
}

#[account]
pub struct Collection{
    pub owner : Pubkey,
    pub max_supply : u64,
    pub current_supply: u64,
    pub rand: Pubkey,
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

#[error_code]
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