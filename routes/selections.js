var express = require('express');
var router = express.Router();

/* GET selections page. */
router.get('/', function(req, res, next) {
  res.render('selections', { title: 'Selections' });
});

module.exports = router;
