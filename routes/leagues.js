var express = require('express');
var models = require('../models');
var middleware = require('../middleware');
var router = express.Router();

/* GET leagues page. */
router.get('/', middleware.requireLogin, function(req, res, next) {
  res.render('leagues', { title: 'Leagues', csrfToken: req.csrfToken() });
});


router.post('/createleague', function (req, res) {

    var league = new models.League({
        lName: req.body.lname,
        eCode: req.body.ecode,
        admin: res.locals.user._id,
    });

    league.save(function (err) {
        if (err) {
            var error = 'Something bad happened! Please try again.';

            res.render('leagues', {
                error: error
            });
        } else {
            res.redirect('/leagues');
        }
    });
});

/* GET league table page. */
router.get('/:leagueid', middleware.requireLogin, function(req, res, next) {
  res.render('table', { title: 'League Table' });
});

module.exports = router;
