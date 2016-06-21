var models = require('./models');

/**
 * A simple authentication middleware for Express.
 *
 * This middleware will load users from session data, and handle all user
 * proxying for convenience.
 */
module.exports.simpleAuth = function(req,res,next){
    if(req.session && req.session.user){
        models.User.findOne({email: req.session.user.email}, function(err, user){
            if(user){
                var cleanUser = {
                    _id:  user._id,
                    fName:  user.fName,
                    lName:   user.lName,
                    email:      user.email,
                    leagues:      user.leagues,
                  };

                req.session.user = cleanUser;
                req.user = cleanUser;
                res.locals.user = cleanUser;
            }
            next();
        });
    } else {
        next();
    }
};

/**
 * Ensure a user is logged in before allowing them to continue their request.
 *
 * If a user isn't logged in, they'll be redirected back to the login page.
 */
module.exports.requireLogin = function(req, res, next) {
  if (!req.user) {
    res.redirect('/');
  } else {
    next();
  }
};
