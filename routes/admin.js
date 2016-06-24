var express = require('express');
var models = require('../models');
var middleware = require('../middleware');
var router = express.Router();

/* GET add team page. */
router.get('/addteam', middleware.requireAdmin ,function (req, res, next) {
    res.render('addTeam', { title: 'Admin: Add Team', csrfToken: req.csrfToken()});
});

/* POST add team to database */
router.post('/addteam', function (req, res) {

    //
    var team = new models.Team({
        city: req.body.city,
        name: req.body.tname,
        division: req.body.div,
    });

    //
    team.save(function (err) {
        if (err) {
            var error = 'Something bad happened! Please try again.';

            res.render('addTeam', {
                error: error, csrfToken: req.csrfToken()
            });
        } else {
            res.render('addTeam', {
                correct: "Team Added.", csrfToken: req.csrfToken()
            });
        }
    });
});

/* GET add gameweek page. */
router.get('/addgameweek', middleware.requireAdmin ,function (req, res, next) {
    models.Team.find({}, null, {sort: {city: 1 }},function(err, teams){
        res.render('addGameweek', { title: 'Admin: Add Gameweek', teams: teams, csrfToken: req.csrfToken()});
    });
});

/* POST add team to database */
router.post('/addgameweek', function (req, res) {



    //
    var gameweek = new models.Gameweek({
        gameweek: req.body.gw,
        startdate: req.body.start,
        enddate: req.body.end,
    });

    //
    gameweek.save(function (err) {
        if (err) {
            var error = 'Something bad happened! Please try again.';

            res.render('addGameweek', {
                error: error, csrfToken: req.csrfToken()
            });
        } else {
            res.render('addGameweek', {
                correct: "Gameweek Added.", csrfToken: req.csrfToken()
            });
        }
    });
});

module.exports = router;
