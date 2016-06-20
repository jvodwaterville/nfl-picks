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
                req.user = user;
                delete req.user.password;
                req.session.user = user;
                res.locals.user = user;
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
