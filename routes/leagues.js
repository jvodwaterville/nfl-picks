var express = require('express');
var router = express.Router();

/* GET leagues page. */
router.get('/', function(req, res, next) {
  res.render('leagues', { title: 'Leagues' });
});

/* GET league table page. */
router.get('/:leagueid', function(req, res, next) {
  res.render('table', { title: 'League Table' });
});

module.exports = router;
