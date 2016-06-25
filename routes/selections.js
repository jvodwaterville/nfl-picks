var express = require('express');
var models = require('../models');
var middleware = require('../middleware');
var router = express.Router();

/* GET selections page. */
router.get('/', middleware.requireLogin, function(req, res, next) {
    
    models.Gameweek.findOne({
        'gameweek': '1'
    }, function(err, obj){
        console.log(obj);
        res.render('selections', { title: 'NFL-Picks | Selections', games: obj, csrfToken: req.csrfToken() });
         //res.send(obj);
    });
    
    
});

module.exports = router;
