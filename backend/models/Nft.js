const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  file: {
    type: String
  },
  ipfs_path: {
    type: String
  },
  chain: {
    type: String
  },
  creater: {
    type: String
  },
  collection_id: {
    type: String,
  },
  collection_name: {
    type: String,
  },
  collection_symbol: {
    type: String,
  },
  contract_address: {
    type: String
  },
  status: {
    type: String,
    default: 0
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('nft', Schema);
