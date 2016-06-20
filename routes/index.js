var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title : "NFL-Picks | Home Page", csrfToken: req.csrfToken()});
});

module.exports = router;
