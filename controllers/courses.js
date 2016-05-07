// controllers/courses.js

var Course = require('../models/course');

exports.addNewCourse = function (req, res){
	// get current user
	var user = req.user;

	// check if name is not empty
	if (req.body.courseName == ""){
		// if empty, return
		res.redirect(req.headers.referer);
	} else {
		// create new course
		var newCourse = new Course();
		newCourse.name = req.body.courseName;
		newCourse.teacher = user._id;
		newCourse.students = [];
		newCourse.activities = [];

		// save course
		newCourse.save(function (err){
			if (err)
				throw err;

			// assign course to teacher
			user.courses.push(newCourse);

			// save user
			user.save(function (err){
				if (err)
					throw err;

				// all good
				res.redirect(req.headers.referer);
			});
		});
	}
}