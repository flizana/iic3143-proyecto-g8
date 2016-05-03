// controllers/index.js

var Student = require('../models/student');

exports.getIndex = function (req, res){
	res.render('index');
}

exports.getStudentLogin = function (req, res){
	res.render('student/pages/login-register-stu');
}