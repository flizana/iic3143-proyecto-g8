// controllers/index.js

var Student = require('../models/student');

exports.getIndex = function (req, res){
	res.render('index');
}