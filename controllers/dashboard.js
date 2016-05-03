// controllers/dashboard.js

exports.getStudentDashboard = function (req, res){
	// get current user
	var user = req.user;

	res.render('student/pages/dashboard-stu', {
		user: user
	});
}