var express = require('express');
var models = require('../models');
var middleware = require('../middleware');
var router = express.Router();

/* GET selections page. */
router.get('/', middleware.requireLogin, function(req, res, next) {
        res.render('selections', { title: 'NFL-Picks | Selections', csrfToken: req.csrfToken() });
});

module.exports = router;
