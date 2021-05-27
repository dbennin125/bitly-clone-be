const chance = require('chance').Chance();
const ShrunkUrl = require('../models/ShrunkUrl');

module.exports = class ShrinkURLService {
  static create({ url }) {
    const id = chance.string({
      length: 10,
      alpha:true,
      numeric: true,
      symbols: false,
      casing: 'lower'
    });
    return ShrunkUrl.insert({
      id,
      longUrl: url
    });
  }
};
