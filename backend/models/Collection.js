const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  symbol: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  shortUrl: {
    type: String,
  },
  owner: {
    type: String,
  },
  chain: {
    type: String,
  },
  contract_address: {
    type: String
  },
  logoImage: {
    type: String
  },
  coverImage: {
    type: String
  },
  status: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('collection', UserSchema);
