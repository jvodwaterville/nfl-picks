var express = require('express');
var models = require('../models');
var middleware = require('../middleware');
var router = express.Router();

/* GET leagues page. */
router.get('/', middleware.requireLogin, function(req, res, next) {
    
    models.League.find({
        '_id': { $in: res.locals.user.leagues}
    }, function(err, docs){
        console.log(docs.length);
        if(docs.length > 0){
            res.render('leagues', { title: 'Leagues', leagues: docs, csrfToken: req.csrfToken() });
        } else {
            res.render('leagues', { title: 'Leagues', csrfToken: req.csrfToken() });
        }
         
    });
});

router.post('/createleague', function (req, res) {

    //create league and add user as admin and empty points
    var league = new models.League({
        lName: req.body.lname,
        eCode: req.body.ecode,
        admin: res.locals.user._id,
        players: {
            Name: res.locals.user.fName + " " + res.locals.user.lName,
            lastWeekRight: 0,
            lastWeekWrong: 0,
            overallRight: 0,
            overallWrong: 0,
            points: 0,
        }
    });

    //save league
    league.save(function (err) {
        if (err) {
            var error = 'Something bad happened! Please try again.';

            res.render('leagues', {
                error: error
            });
        } else {
            //add league to users details
            models.User.findByIdAndUpdate(res.locals.user._id, {$push: {leagues: league._id}}, function (err, user) {
              res.redirect('/leagues');
            });
        }
    });
});

router.post('/joinleague', function (req, res) {
    var leagueId = req.body.lid;
    var entryCode = req.body.ecode;
    
     models.League.findOne({_id: leagueId}, function(err, league){
            if(!league){ //check if league exists
                res.send("League doesnt exist.");
            } else if(league.eCode != entryCode){ //check if password is correct
                res.send("Wrong password.");
            } else if(league.status != 0){ //check if league has already started
                res.send("Sorry, this league has already started.");
            } else { //check if user is already in league
                
                var inLeague = false;
                
                var a = res.locals.user.leagues;
                for (var i = 0; i < a.length; i++) {
                    if (a[i] == leagueId) {
                        inLeague = true;
                    }
                }
                
                if(inLeague)
                {
                    res.send('you are already in this league');
                } else { //if userisnt already in league add userto league
                    
                    var newPlayer = { //create new player to add to league based on user
                        id: res.locals.user._id,
                        Name: res.locals.user.fName + " " + res.locals.user.lName,
                        lastWeekRight: 0,
                        lastWeekWrong: 0,
                        overallRight: 0,
                        overallWrong: 0,
                        points: 0,
                    }
                    
                    models.User.findByIdAndUpdate(res.locals.user._id, {$push: {leagues: leagueId}}, function (err, user) { //add league to user
                        models.League.findByIdAndUpdate(leagueId, {$push: {players: newPlayer}}, function (err, league) { //add user to league
                          res.redirect('/leagues');
                        });
                    });
                    
                }
            }
        });
    
});

/* GET league table page. */
router.get('/:leagueid', middleware.requireLogin, function(req, res, next) {
    models.League.findOne({_id:req.params.leagueid}, function (err, league) {
        res.render('table', { title: 'League Table', league:league });
    });
});

/* view league details. */
router.get('/view/:leagueid', middleware.requireLogin, function (req, res, next) {
    models.League.findOne({ _id: req.params.leagueid }, function(err, league) {
    if (!league) {
      res.send("League doesnt exist.");
    } else {
      res.send(league);
    }
  });
});

module.exports = router;
