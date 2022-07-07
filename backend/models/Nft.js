const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
  tokenId: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  file: {
    type: String
  },
  ipfs_path: {
    type: String
  },
  metadata_url: {
    type: String
  },
  chain: {
    type: String
  },
  creater: {
    type: String
  },
  owner: {
    type: String
  },
  collection_id: {
    type: String
  },
  collection_name: {
    type: String
  },
  collection_symbol: {
    type: String
  },
  contract_address: {
    type: String
  },
  status: {
    type: String,
    default: 0
  },
  price: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

// Status ------ 0: Created  1: Verified  2:Listed

module.exports = mongoose.model('nft', Schema);
