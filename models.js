var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

/**
 * User model.
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
  admin : { type : Boolean , "default" : false },
}, { collection: 'user' }));


/**
 * League model.
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

/**
 * NFL Team model.
 *
 * This is how we create, edit, delete, and retrieve leagues via MongoDB.
 */
module.exports.Team = mongoose.model('Team', new Schema({
  id:           ObjectId,
  city:    String,
  name:     String,
  division:     String,
  results: Array,
}, { collection: 'team' }));

/**
 * Gameweek model.
 *
 * This is how we create, edit, delete, and retrieve leagues via MongoDB.
 */
module.exports.Gameweek = mongoose.model('Gameweek', new Schema({
  id:           ObjectId,
  gameweek:    { type : Number , unique : true },
  startdate:     Date,
  enddate:     Date,
  status:     { type : Number , "default" : 0 },
  fixtures: Array,
}, { collection: 'gameweek' }));
