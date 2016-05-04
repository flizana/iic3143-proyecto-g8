// controllers/dashboard.js

exports.getStudentDashboard = function (req, res){
	// get current user
	var user = req.user;

	res.render('student/pages/dashboard-stu', {
		user: user
	});
}

exports.editStudentProfile = function (req, res){
	// get current user
	var user = req.user;

	// update user info
	user.firstName = req.body.firstName;
	user.lastName = req.body.lastName;
	user.school = req.body.school;
	user.email = req.body.email;

	user.save(function (err){
		if (err)
			throw err;

		res.redirect('/student/dashboard');
	});
}