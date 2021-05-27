const { Router } = require('express');
const ShrunkUrl = require('../models/ShrunkUrl');

module.exports = Router()
  .get('/:id', (req, res, next) => {
    ShrunkUrl
      .findById(req.params.id)
      .then(urlObj => res.redirect(urlObj.longUrl))
      .catch(next);
  });
