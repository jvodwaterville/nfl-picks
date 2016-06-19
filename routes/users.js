var express = require('express');
var bcrypt = require('bcryptjs');
var models = require('../models');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

/**
 * Create a new user account.
 *
 * Once a user is logged in, they will be sent to the dashboard page.
 */
router.post('/register', function (req, res) {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.pwd, salt);

    var user = new models.User({
        fName: req.body.fname,
        lName: req.body.lname,
        email: req.body.email,
        password: hash,
    });

    user.save(function (err) {
        if (err) {
            var error = 'Something bad happened! Please try again.';

            if (err.code === 11000) {
                error = 'That email is already taken, please try another.';
            }

            res.render('index', {
                error: error
            });
        } else {
            res.redirect('/selections');
        }
    });
});

module.exports = router;
