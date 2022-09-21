
import BN from 'bn.js';
// import moment from 'moment';

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

export class CreateAuctionArgs {
  constructor(
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
  ) {
  return ({
    instruction : 7,
    /// How many winners are allowed for this auction. See AuctionData.
    winners : _winners,
    /// End time is the cut-off point that the auction is forced to end by. See AuctionData.
    endAuctionAt : _endAuctionAt,
    /// Gap time is how much time after the previous bid where the auction ends. See AuctionData.
    auctionGap : _auctionGap,
    /// Token mint for the SPL token used for bidding. StringPublickey
    tokenMint : _tokenMint,
    /// Authority StringPublickey
    authority : _authority,
    /// The resource being auctioned. See AuctionData. StringPublickey
    resource : _resource,
    priceFloor : _priceFloor,
    tickSize : _tickSize,
    gapTickSizePercentage : _gapTickSizePercentage,
    name : _name,
    instantSalePrice : _instantSalePrice,
  });
}}

export class WinnerLimit {
  constructor(
    _type, 
    _usize
  ) {
    return ({
      type: _type,
      usize: _usize,
    })
  }
}

export class StartAuctionArgs {
  constructor(_resource) {
    return ({
      instruction : 4,
      // StringPublicKey;
      resource : _resource,
    })
  }
}

export class PriceFloor {
  constructor(
    _type, 
    _hash, 
    _minPrice
  ) {
    if (_type === 1) {
      if (_minPrice) {
        _hash.set(_minPrice.toArrayLike(Buffer, 'le', 8), 0);
      } else {
        _minPrice = new BN(
          (_hash || new Uint8Array(0)).slice(0, 8),
          'le',
        );
      }
    }

    return ({
      type: _type,
      hash: _hash,
      minPrice: _minPrice,
    })
  }
}

export class PlaceBidArgs {
  constructor(_resource, _amount) {
    return ({
      instruction: 6,
      resource : _resource,
      amount : _amount,
    })
  }
}

export class CancelBidArgs {
  constructor(_resource) {
    return ({
      instruction: 0,
      resource : _resource,
    })
  }
}

export class SetAuthorityArgs {
  constructor() {
    return ({
      instruction: 5,
    })
  }
}

export class AuctionData {
  
  // public timeToEnd() {
  //   const now = moment().unix();
  //   const ended = { days: 0, hours: 0, minutes: 0, seconds: 0 };
  //   let endAt = _endedAt?.toNumber() || 0;

  //   if (_auctionGap && _lastBid) {
  //     endAt = Math.max(
  //       endAt,
  //       _auctionGap.toNumber() + _lastBid.toNumber(),
  //     );
  //   }

  //   let delta = endAt - now;

  //   if (!endAt || delta <= 0) return ended;

  //   const days = Math.floor(delta / 86400);
  //   delta -= days * 86400;

  //   const hours = Math.floor(delta / 3600) % 24;
  //   delta -= hours * 3600;

  //   const minutes = Math.floor(delta / 60) % 60;
  //   delta -= minutes * 60;

  //   const seconds = Math.floor(delta % 60);

  //   return { days, hours, minutes, seconds };
  // }

  // public ended() {
  //   const now = moment().unix();
  //   if (!_endedAt) return false;

  //   if (_endedAt.toNumber() > now) return false;

  //   if (_endedAt.toNumber() < now) {
  //     if (_auctionGap && _lastBid) {
  //       const newEnding = _auctionGap.toNumber() + _lastBid.toNumber();
  //       return newEnding < now;
  //     } else return true;
  //   }
  // }
  
  constructor(
    _authority,
    _tokenMint,
    _lastBid,
    _endedAt,
    _endAuctionAt,
    _auctionGap,
    _priceFloor,
    _state,
    _bidState,
  ) {
    return ({
      /// Pubkey of the authority with permission to modify this auction.: StringPublicKey;
      authority : _authority,
      /// Token mint for the SPL token being used to bid: StringPublicKey,
      tokenMint : _tokenMint,
      /// The time the last bid was placed, used to keep track of auction timing.: BN | null,
      lastBid : _lastBid,
      /// Slot time the auction was officially ended by.: BN | null,
      endedAt : _endedAt,
      /// End time is the cut-off point that the auction is forced to end by.: BN | null,
      endAuctionAt : _endAuctionAt,
      /// Gap time is the amount of time in slots after the previous bid at which the auction ends.: BN | null,
      auctionGap : _auctionGap,
      /// Minimum price for any bid to meet.: PriceFloor,
      priceFloor : _priceFloor,
      /// The state the auction is in, whether it has started or ended.: AuctionState,
      state : _state,
      /// Auction Bids, each user may have one bid open at a time.: BidState,
      bidState : _bidState,
      /// Used for precalculation on the front end, not a backend key: bidRedemptionKey?: StringPublicKey,

      // const auctionDataExtended?: StringPublicKey;
    });
  }
}

export class BidState {
  constructor(
    _type, 
    _bids, 
    _max) {
    return ({
      type : _type,
      bids : _bids,
      max : _max,
    })
  }

  // public getWinnerAt(winnerIndex) {
  //   const convertedIndex = this.bids.length - winnerIndex - 1;

  //   if (convertedIndex >= 0 && convertedIndex < this.bids.length) {
  //     return this.bids[convertedIndex].key;
  //   } else {
  //     return null;
  //   }
  // }

  // public getAmountAt(winnerIndex) {
  //   const convertedIndex = this.bids.length - winnerIndex - 1;

  //   if (convertedIndex >= 0 && convertedIndex < this.bids.length) {
  //     return this.bids[convertedIndex].amount;
  //   } else {
  //     return null;
  //   }
  // }

  // public getWinnerIndex(bidder) {
  //   if (!this.bids) return null;

  //   const index = this.bids.findIndex(b => b.key === bidder);
  //   // auction stores data in reverse order
  //   if (index !== -1) {
  //     const zeroBased = this.bids.length - index - 1;
  //     return zeroBased < this.max.toNumber() ? zeroBased : null;
  //   } else return null;
  // }
}

export class AuctionDataExtended {
  constructor (
    _totalUncancelledBids,
    _tickSize,
    _gapTickSizePercentage,
    _instantSalePrice,
    _name,
  ) {
    return ({
      totalUncancelledBids : _totalUncancelledBids,
      tickSize : _tickSize,
      gapTickSizePercentage : _gapTickSizePercentage,
      instantSalePrice : _instantSalePrice,
      name : _name,
    })
  }
}

export class Bid {
  constructor(
    _key,
    _amount,
  ) {
    return ({
      // key: StringPublicKey;
      key: _key,
      amount: _amount,
    });
  }
}

export class BidderMetadata {
  constructor(
    _bidderPubkey,
    _auctionPubkey,
    _lastBid,
    _lastBidTimestamp,
    _cancelled,
  ) {
    return ({
      bidderPubkey : _bidderPubkey,
      auctionPubkey : _auctionPubkey,
      lastBid : _lastBid,
      lastBidTimestamp : _lastBidTimestamp,
      cancelled : _cancelled,
    })
  }
}

export class BidderPot {
  constructor(
    _bidderPot,
    _bidderAct,
    _auctionAct,
    _emptied,
  ) {
    return({
      /// Points at actual pot that is a token account
      bidderPot : _bidderPot,
      bidderAct : _bidderAct,
      auctionAct : _auctionAct,
      emptied : _emptied,
    })
  }
}


export const AUCTION_SCHEMA = new Map([
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