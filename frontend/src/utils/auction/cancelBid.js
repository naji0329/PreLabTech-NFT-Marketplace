import { TOKEN_PROGRAM_ID } from "@solana/spl-token";

import {
  // AccountInfo,
  // PublicKey,
  // SystemProgram,
  SYSVAR_CLOCK_PUBKEY,
  SYSVAR_RENT_PUBKEY,
  TransactionInstruction,
  // Connection,
  // clusterApiUrl,
  SystemProgram,
  // SYSVAR_RENT_PUBKEY,
} from "@solana/web3.js";

import { 
  // deserializeUnchecked, 
  serialize,
} from 'borsh';

import {
  auctionProgramId,
  // TOKEN_METADATA_PROGRAM_ID
} from "@/constants/constant.js";

import * as auction from './util/auctionFunc';

import { 
  toPublicKey,
  findProgramAddress,
} from './util/ids'


export const AUCTION_PREFIX = 'auction';
export const EXTENDED = 'extended';
export const BIDDER_POT_TOKEN = 'bidder_pot_token';


export async function cancelBid(
  bidderPubkey,
  bidderTokenPubkey,
  bidderPotTokenPubkey,
  tokenMintPubkey,
  resource,
  instructions,
) {
  const data = Buffer.from(
    serialize(
      auction.AUCTION_SCHEMA,
      new auction.CancelBidArgs({
        resource,
      }),
    ),
  );

  const auctionKey = (
    await findProgramAddress(
      [
        Buffer.from(AUCTION_PREFIX),
        toPublicKey(auctionProgramId).toBuffer(),
        toPublicKey(resource).toBuffer(),
      ],
      toPublicKey(auctionProgramId),
    )
  )[0];

  const bidderPotKey = await auction.getBidderPotKey({
    auctionProgramId,
    auctionKey,
    bidderPubkey,
  });

  const bidderMetaKey = (
    await findProgramAddress(
      [
        Buffer.from(AUCTION_PREFIX),
        toPublicKey(auctionProgramId).toBuffer(),
        toPublicKey(auctionKey).toBuffer(),
        toPublicKey(bidderPubkey).toBuffer(),
        Buffer.from('metadata'),
      ],
      toPublicKey(auctionProgramId),
    )
  )[0];

  const keys = [
    {
      pubkey: toPublicKey(bidderPubkey),
      isSigner: true,
      isWritable: false,
    },
    {
      pubkey: toPublicKey(bidderTokenPubkey),
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: toPublicKey(bidderPotKey),
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: toPublicKey(bidderPotTokenPubkey),
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: toPublicKey(bidderMetaKey),
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: toPublicKey(auctionKey),
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: toPublicKey(
        await auction.getAuctionExtended({ auctionProgramId, resource }),
      ),
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: toPublicKey(tokenMintPubkey),
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: SYSVAR_CLOCK_PUBKEY,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: SYSVAR_RENT_PUBKEY,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: SystemProgram.programId,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: TOKEN_PROGRAM_ID,
      isSigner: false,
      isWritable: false,
    },
  ];
  instructions.push(
    new TransactionInstruction({
      keys,
      programId: toPublicKey(auctionProgramId),
      data: data,
    }),
  );
}
