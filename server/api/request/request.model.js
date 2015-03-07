'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RequestSchema = new Schema({
  description: String,
  requester: String,
  bidder: String,
  credit: Number,
  category: String,
  status: String
});

module.exports = mongoose.model('Request', RequestSchema);