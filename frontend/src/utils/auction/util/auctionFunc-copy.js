
import {
  // AccountInfo,
  // PublicKey,
  // SystemProgram,
  // SYSVAR_CLOCK_PUBKEY,
  // SYSVAR_RENT_PUBKEY,
  // TransactionInstruction,
  // Connection,
  // clusterApiUrl,
  // SystemProgram,
  // SYSVAR_RENT_PUBKEY,
} from "@solana/web3.js";

import BN from 'bn.js';
import moment from 'moment';

// import * as anchor from "@project-serum/anchor";


import { 
  toPublicKey,
  findProgramAddress,
} from './ids.js'

export const AUCTION_PREFIX = 'auction';
export const EXTENDED = 'extended';
export const BIDDER_POT_TOKEN = 'bidder_pot_token';



export async function getBidderPotKey(
  auctionProgramId,
  auctionKey,
  bidderPubkey,
  ) {
  return (
    await findProgramAddress(
      [
        Buffer.from(AUCTION_PREFIX),
        toPublicKey(auctionProgramId).toBuffer(),
        toPublicKey(auctionKey).toBuffer(),
        toPublicKey(bidderPubkey).toBuffer(),
      ],
      toPublicKey(auctionProgramId),
    )
  )[0];
}

export async function getAuctionExtended(
  auctionProgramId,
  resource,
  ) {
  return (
    await findProgramAddress(
      [
        Buffer.from(AUCTION_PREFIX),
        toPublicKey(auctionProgramId).toBuffer(),
        toPublicKey(resource).toBuffer(),
        Buffer.from(EXTENDED),
      ],
      toPublicKey(auctionProgramId),
    )
  )[0];
}

export const StartAuctionArgs = (_resource) => {
  const instruction = 4;
  // StringPublicKey;
  const resource = _resource;
}

export const PlaceBidArgs = (_resource, _amount) => {
  const instruction = 6;
  // StringPublickey
  const resource = _resource;
  // BN
  const amount = _amount;
}

export const AuctionDataExtended = (
  _totalUncancelledBids,
  _tickSize,
  _gapTickSizePercentage,
  _instantSalePrice,
  _name,
  ) => {
    
  const totalUncancelledBids = _totalUncancelledBids;
  const tickSize = _tickSize;
  const gapTickSizePercentage = _gapTickSizePercentage;
  const instantSalePrice = _instantSalePrice;
  const name = _name;
}

export const WinnerLimit = (_type, _usize) => {
  const type = _type;
  const usize = _usize;
}

export const PriceFloor = (_type, _hash, _minPrice) => {
  let type = type;
  let hash = hash || new Uint8Array(32);
  let minPrice;

  if (type === 1) {
    if (_minPrice) {
      hash.set(_minPrice.toArrayLike(Buffer, 'le', 8), 0);
    } else {
      minPrice = new BN(
        (_hash || new Uint8Array(0)).slice(0, 8),
        'le',
      );
    }
  }
}

export const CancelBidArgs = ( _resource ) => {
  const instruction = 0;
  // StringPublicKey;
  const resource = _resource;
}

export const BidState = (_type, _bids, _max) => {
    const type = _type;
    const bids = _bids;
    const max = _max;

  const getWinnerAt = (winnerIndex) => {
    const convertedIndex = bids.length - winnerIndex - 1;

    if (convertedIndex >= 0 && convertedIndex < bids.length) {
      return bids[convertedIndex].key;
    } else {
      return null;
    }
  }

  const getAmountAt = (winnerIndex) => {
    const convertedIndex = bids.length - winnerIndex - 1;

    if (convertedIndex >= 0 && convertedIndex < bids.length) {
      return bids[convertedIndex].amount;
    } else {
      return null;
    }
  }

  const getWinnerIndex = (bidder) => {
    if (bids) return null;

    const index = bids.findIndex(b => b.key === bidder);
    // auction stores data in reverse order
    if (index !== -1) {
      const zeroBased = bids.length - index - 1;
      return zeroBased < max.toNumber() ? zeroBased : null;
    } else return null;
  }
}

export const SetAuthorityArgs = () => {
  const instruction = 5;
}

export const AuctionData = (
  _authority,
  _tokenMint,
  _lastBid,
  _endedAt,
  _endAuctionAt,
  _auctionGap,
  _priceFloor,
  _state,
  _bidState,
  ) => {
  /// Pubkey of the authority with permission to modify this auction.: StringPublicKey;
  const authority = _authority;
  /// Token mint for the SPL token being used to bid: StringPublicKey;
  const tokenMint = _tokenMint;
  /// The time the last bid was placed, used to keep track of auction timing.: BN | null;
  const lastBid = _lastBid;
  /// Slot time the auction was officially ended by.: BN | null;
  const endedAt = _endedAt;
  /// End time is the cut-off point that the auction is forced to end by.: BN | null;
  const endAuctionAt = _endAuctionAt;
  /// Gap time is the amount of time in slots after the previous bid at which the auction ends.: BN | null;
  const auctionGap = _auctionGap;
  /// Minimum price for any bid to meet.: PriceFloor;
  const priceFloor = _priceFloor;
  /// The state the auction is in, whether it has started or ended.: AuctionState;
  const state = _state;
  /// Auction Bids, each user may have one bid open at a time.: BidState;
  const bidState = _bidState;
  /// Used for precalculation on the front end, not a backend key: bidRedemptionKey?: StringPublicKey;

  // const auctionDataExtended?: StringPublicKey;

  const timeToEnd = () => {
    const now = moment().unix();
    const ended = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    let endAt = endedAt?.toNumber() || 0;

    if (auctionGap && lastBid) {
      endAt = Math.max(
        endAt,
        auctionGap.toNumber() + lastBid.toNumber(),
      );
    }

    let delta = endAt - now;

    if (!endAt || delta <= 0) return ended;

    const days = Math.floor(delta / 86400);
    delta -= days * 86400;

    const hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;

    const minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;

    const seconds = Math.floor(delta % 60);

    return { days, hours, minutes, seconds };
  }

  const ended = () => {
    const now = moment().unix();
    if (!endedAt) return false;

    if (endedAt.toNumber() > now) return false;

    if (endedAt.toNumber() < now) {
      if (auctionGap && lastBid) {
        const newEnding = auctionGap.toNumber() + lastBid.toNumber();
        return newEnding < now;
      } else return true;
    }
  }
}

export const Bid = (
  _key,
  _amount,
) => {
  // key: StringPublicKey;
  const key = _key;
  const amount = _amount;
}

export const BidderMetadata = (
  _bidderPubkey,
  _auctionPubkey,
  _lastBid,
  _lastBidTimestamp,
  _cancelled,
  ) => {
  const bidderPubkey = _bidderPubkey;
  const auctionPubkey = _auctionPubkey;
  const lastBid = _lastBid;
  const lastBidTimestamp = _lastBidTimestamp;
  const cancelled = _cancelled;
}

export const BidderPot = (
  _bidderPot,
  _bidderAct,
  _auctionAct,
  _emptied,
  ) => {
  /// Points at actual pot that is a token account
  const bidderPot = _bidderPot;
  const bidderAct = _bidderAct;
  const auctionAct = _auctionAct;
  const emptied = _emptied;
}


// -----------------------------------------------------------
// Must start From here.....................

// class Assignable {
//   constructor(properties) {
//     Object.keys(properties).map((key) => {
//       return (this[key] = properties[key]);
//     });
//   }
// }

// class SchemaArgs extends Assignable {}

export const CreateAuctionArgs = (
  _winners,
  _endAuctionAt,
  _auctionGap,
  _tokenMint,
  _authority,
  _resource,
  _priceFloor,
  _tickSize,
  _gapTickSizePercentage,
  _name,
  _instantSalePrice,
) => {
  const instruction = 7;
  /// How many winners are allowed for this auction. See AuctionData.
  const winners = _winners;
  /// End time is the cut-off point that the auction is forced to end by. See AuctionData.
  const endAuctionAt = _endAuctionAt;
  /// Gap time is how much time after the previous bid where the auction ends. See AuctionData.
  const auctionGap = _auctionGap;
  /// Token mint for the SPL token used for bidding. StringPublickey
  const tokenMint = _tokenMint;
  /// Authority StringPublickey
  const authority = _authority;
  /// The resource being auctioned. See AuctionData. StringPublickey
  const resource = _resource;
  const priceFloor = _priceFloor;
  const tickSize = _tickSize;
  const gapTickSizePercentage = _gapTickSizePercentage;
  const name = _name;
  const instantSalePrice = _instantSalePrice;
}


export const AUCTION_SCHEMA = new MAP([
  [
    CreateAuctionArgs,
    {
      kind: 'struct',
      fields: [
        ['instruction', 'u8'],
        ['winners', WinnerLimit],
        ['endAuctionAt', { kind: 'option', type: 'u64' }],
        ['auctionGap', { kind: 'option', type: 'u64' }],
        ['tokenMint', 'pubkeyAsString'],
        ['authority', 'pubkeyAsString'],
        ['resource', 'pubkeyAsString'],
        ['priceFloor', PriceFloor],
        ['tickSize', { kind: 'option', type: 'u64' }],
        ['gapTickSizePercentage', { kind: 'option', type: 'u8' }],
        ['instantSalePrice', { kind: 'option', type: 'u64' }],
        ['name', { kind: 'option', type: [32] }],
      ],
    },
  ],
  [
    WinnerLimit,
    {
      kind: 'struct',
      fields: [
        ['type', 'u8'],
        ['usize', 'u64'],
      ],
    },
  ],
  [
    StartAuctionArgs,
    {
      kind: 'struct',
      fields: [
        ['instruction', 'u8'],
        ['resource', 'pubkeyAsString'],
      ],
    },
  ],
  [
    PlaceBidArgs,
    {
      kind: 'struct',
      fields: [
        ['instruction', 'u8'],
        ['amount', 'u64'],
        ['resource', 'pubkeyAsString'],
      ],
    },
  ],
  [
    CancelBidArgs,
    {
      kind: 'struct',
      fields: [
        ['instruction', 'u8'],
        ['resource', 'pubkeyAsString'],
      ],
    },
  ],

  [
    SetAuthorityArgs,
    {
      kind: 'struct',
      fields: [['instruction', 'u8']],
    },
  ],
  [
    AuctionData,
    {
      kind: 'struct',
      fields: [
        ['authority', 'pubkeyAsString'],
        ['tokenMint', 'pubkeyAsString'],
        ['lastBid', { kind: 'option', type: 'u64' }],
        ['endedAt', { kind: 'option', type: 'u64' }],
        ['endAuctionAt', { kind: 'option', type: 'u64' }],
        ['auctionGap', { kind: 'option', type: 'u64' }],
        ['priceFloor', PriceFloor],
        ['state', 'u8'],
        ['bidState', BidState],
      ],
    },
  ],
  [
    AuctionDataExtended,
    {
      kind: 'struct',
      fields: [
        ['totalUncancelledBids', 'u64'],
        ['tickSize', { kind: 'option', type: 'u64' }],
        ['gapTickSizePercentage', { kind: 'option', type: 'u8' }],
        ['instantSalePrice', { kind: 'option', type: 'u64' }],
        ['name', { kind: 'option', type: [32] }],
      ],
    },
  ],
  [
    PriceFloor,
    {
      kind: 'struct',
      fields: [
        ['type', 'u8'],
        ['hash', [32]],
      ],
    },
  ],
  [
    BidState,
    {
      kind: 'struct',
      fields: [
        ['type', 'u8'],
        ['bids', [Bid]],
        ['max', 'u64'],
      ],
    },
  ],
  [
    Bid,
    {
      kind: 'struct',
      fields: [
        ['key', 'pubkeyAsString'],
        ['amount', 'u64'],
      ],
    },
  ],
  [
    BidderMetadata,
    {
      kind: 'struct',
      fields: [
        ['bidderPubkey', 'pubkeyAsString'],
        ['auctionPubkey', 'pubkeyAsString'],
        ['lastBid', 'u64'],
        ['lastBidTimestamp', 'u64'],
        ['cancelled', 'u8'],
      ],
    },
  ],
  [
    BidderPot,
    {
      kind: 'struct',
      fields: [
        ['bidderPot', 'pubkeyAsString'],
        ['bidderAct', 'pubkeyAsString'],
        ['auctionAct', 'pubkeyAsString'],
        ['emptied', 'u8'],
      ],
    },
  ],
]);