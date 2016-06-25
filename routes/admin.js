var express = require('express');
var models = require('../models');
var middleware = require('../middleware');
var router = express.Router();

/* GET add team page. */
router.get('/', middleware.requireAdmin ,function (req, res, next) {
    res.send('Admin Home Page Here');
});
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

    var games = {};
    for(var i = 1; i <= req.body.numgames; i++){
        var game = {};
        game["homeTeam"] = req.body['ht' + i];
        game["awayTeam"] = req.body['at' + i];
        game["homeScore"] = 0;
        game["awayScore"] = 0;
        game["date"] = req.body['date' + i];
        game["time"] = req.body['time' + i];
        game["handicap"] = req.body['handicap' + i];
        game["spread"] = req.body['spread' + i];
        
        games["game" + i] = game;
    }
    
    console.log(games);

    //
    var gameweek = new models.Gameweek({
        gameweek: req.body.gw,
        startdate: req.body.start,
        enddate: req.body.end,
        fixtures: games,
    });

    //
    gameweek.save(function (err) {
        if (err) {
            var error = 'Something bad happened! Please try again.';

            res.redirect('/admin/addgameweek');
        } else {
            res.redirect('/admin/addgameweek');
        }
    });
});

module.exports = router;
