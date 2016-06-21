var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

/**
 * Our User model.
 *
 * This is how we create, edit, delete, and retrieve user accounts via MongoDB.
 */
module.exports.User = mongoose.model('User', new Schema({
  id:           ObjectId,
  fName:    String,
  lName:     String,
  email:        { type: String, unique: true },
  password:     String,
  leagues : { type : Array , "default" : [] },
}, { collection: 'user' }));


/**
 * Our League model.
 *
 * This is how we create, edit, delete, and retrieve leagues via MongoDB.
 */
module.exports.League = mongoose.model('League', new Schema({
  id:           ObjectId,
  lName:    String,
  eCode:     String,
  status: { type : String , "default" : 0 },
  admin:     String,
  players: Array,
}, { collection: 'league' }));
