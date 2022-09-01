use {
  crate::CollectionError,
  anchor_lang::{
      prelude::*,
      solana_program::{
          program::{invoke},
      },
  },
  anchor_spl::token::Token
};

pub struct TokenMintToParams<'a> {
  /// CHECK: account constraints checked in account trait
  pub mint : UncheckedAccount<'a>,
  /// CHECK: account constraints checked in account trait
  pub account : UncheckedAccount<'a>,
  pub owner : Signer<'a>,

  pub token_program : Program<'a, Token>,
  pub amount : u64,
}

#[inline(always)]
pub fn spl_token_mint_to(params : TokenMintToParams<'_>) -> Result<()> {
  let TokenMintToParams {
      mint,
      account,
      owner,
      token_program,
      amount,
  } = params;
  let result = invoke(
      &spl_token::instruction::mint_to(
          token_program.key,
          mint.key,
          account.key,
          owner.key,
          &[],
          amount,
      )?,
      &[
        mint.to_account_info().clone(),
        account.to_account_info().clone(),
        owner.to_account_info().clone(),
        token_program.to_account_info().clone()
      ],
  );
  result.map_err(|_| CollectionError::TokenMintToFailed.into())
}