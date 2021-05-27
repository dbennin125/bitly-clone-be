const { Router } = require('express');
const ShrunkUrl = require('../models/ShrunkUrl');
const ShrinkURLService = require('../service/ShrinkURLService');

module.exports = Router()
  .post('/', (req, res, next) => {
    ShrinkURLService
      .create(req.body)
      .then(shortURL => res.send(shortURL))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    ShrunkUrl
      .find()
      .then(shortURLs => res.send(shortURLs))
      .catch(next);
  });
