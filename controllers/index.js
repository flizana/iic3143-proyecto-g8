// controllers/index.js

var Student = require('../models/student');

exports.getIndex = function (req, res){
	if (req.isAuthenticated()){
		// get current user
		var user = req.user;
		if (user.isStudent){
			res.redirect('student/dashboard');
		} else {
			res.redirect('teacher/dashboard');
		}
	}

	res.render('index');
}

exports.getStudentLogin = function (req, res){
	res.render('student/pages/login-register-stu', { message: req.flash('registerMessage') });
}