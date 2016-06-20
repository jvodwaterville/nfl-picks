var express = require('express');
var middleware = require('../middleware');
var router = express.Router();

/* GET leagues page. */
router.get('/', middleware.requireLogin, function(req, res, next) {
  res.render('leagues', { title: 'Leagues' });
});

/* GET league table page. */
router.get('/:leagueid', middleware.requireLogin, function(req, res, next) {
  res.render('table', { title: 'League Table' });
});

module.exports = router;
