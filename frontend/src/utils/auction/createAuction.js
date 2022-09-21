
import {
  // AccountInfo,
  // PublicKey,
  // SystemProgram,
  // SYSVAR_CLOCK_PUBKEY,
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
} from "@/constants/constant";

import * as auction from "./util/auctionFunc";

import { 
  toPublicKey,
  findProgramAddress,
} from './util/ids'

export const AUCTION_PREFIX = 'auction';
export const BIDDER_POT_TOKEN = 'bidder_pot_token';

export async function createAuction(
  settings,
  creator,
  instructions,
) {

  const data = Buffer.from(serialize(auction.AUCTION_SCHEMA, settings));

  const auctionKey = (
    await findProgramAddress(
      [
        Buffer.from(AUCTION_PREFIX),
        toPublicKey(auctionProgramId).toBuffer(),
        toPublicKey(settings.resource).toBuffer(),
      ],
      toPublicKey(auctionProgramId),
    )
  )[0];

  const keys = [
    {
      pubkey: toPublicKey(creator),
      isSigner: true,
      isWritable: true,
    },
    {
      pubkey: toPublicKey(auctionKey),
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: toPublicKey(
        await auction.getAuctionExtended({
          auctionProgramId,
          resource: settings.resource,
        }),
      ),
      isSigner: false,
      isWritable: true,
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
  ];
  instructions.push(
    new TransactionInstruction({
      keys,
      programId: toPublicKey(auctionProgramId),
      data: data,
    }),
  );
}