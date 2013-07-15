var User = require('../models/userModel.js');
var _ = require('underscore');

exports.findById = function(req, res) {
	var id = req.params.id;
  console.log('Retrieving user by ID: ' + id);
  User.findById(id, function (err, obj) {
    if(err) console.log(err);
    res.send(obj);
  });
};

exports.findAll = function(req, res) {
  User.find({}, function (err, obj) {
    res.send(obj);
  });
};

exports.findByUsername = function(req, res) {
  var username = req.params.username;
  console.log('Retrieving user: '+ username);
  var query = {'username': username};
  User.findOne(query, function (err, obj) {
    if(err){
      res.writeHead(404);
      res.end();
    } else {
      res.send(obj);
    }
  });
};

exports.findByRegex = function(req, res) {
  //For autocompletion while searching for players to invite to a game
  var username = req.params.partial;
  var regex = '^'+username+'.*';
  User.find({username: {$regex: regex, $options: 'i'}})
      .sort({username: 1})
      .limit(10)
      .exec(function (err, obj) {
        if(err) console.log(err);
        res.send(obj);
  });
};
