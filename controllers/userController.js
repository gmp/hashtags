var User = require('../models/userModel.js');

exports.findById = function(req, res){
	var id = req.params.id;
  console.log('Retrieving user: ' + id);
  User.findById(id, function(err, obj){
    	res.send(obj);
  });
};

exports.findAll = function(req, res){
  User.find({}, function(err, obj){
    res.send(obj);
  });
};

exports.findByUsername = function(req, res){
  var username = req.params.username;
  console.log('Retrieving user: '+ username);
  var query = {'username': username};
  User.findOne(query, function(err, obj){
    res.send(obj);
  });
};