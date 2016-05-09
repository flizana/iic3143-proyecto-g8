// controllers/activities.js


var Activity = require('../models/activity');
var Course = require('../models/course');

exports.new = function (req, res) {
  var user = req.user;
	if (user !== undefined)
		user = user.toJSON();

	// populate courses
	Course.find({
		'_id': { $in: user.courses }
	}, function (err, courses){
		if (err)
			throw err;

		Course.findById(req.params.id, function(err, course){
			if(err)
				throw err;

			res.render('teacher/pages/new-activity', {
				user: user,
				courses: courses,
				course: course
			});
		});
	});
};
