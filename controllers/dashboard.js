// controllers/dashboard.js

var random = require('../config/random');
var images = require('../config/images');

var Course = require('../models/course');

exports.getStudentDashboard = function (req, res){
	// get current user
	var user = req.user;



	// populate courses
	Course.find({

		'_id': { $in: user.courses }
	}, function (err, courses){
		if (err)
			throw err;

		res.render('student/pages/dashboard-stu', {
			user: user,
			courses: courses
		});
	}).sort({name: 1}).exec(function(err, docs){

	});
};

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
};

exports.editStudentProfilePicture = function (req, res){
	// get current user
	var user = req.user;

	// generate new filename
	var newFilename = random.randomAlphanumericString(64);

	// get mimetype
	var fileMimetype = req.file.mimetype;
	var extension = images.extensionForMimeType(fileMimetype);

	// set all file paths
	var tmpPath = req.file.path;
	var resizedPath = tmpPath + '_150x150';

	// resize image
	images.resizeImage(tmpPath, resizedPath, 150, 150, function (err){
		if (err)
			throw err;

		// delete temporary file
		images.deleteFile(tmpPath, function (err){
			if (err)
				throw err;

			// change file location
			var filePath = '/images/student-profile-pictures/' + newFilename + extension;
			var fullFilePath = 'public' + filePath;

			console.log(filePath);
			console.log(fullFilePath);
			images.changeFileLocation(resizedPath, fullFilePath, function (err){
				if (err)
					throw err;

				// update user info
				user.profilePicturePath = filePath;

				// save user
				user.save(function (err){
					if (err)
						throw err;

					res.redirect('/student/dashboard');
				});
			});
		});
	});
};

exports.getTeacherDashboard = function (req, res){
	// get current user
	var user = req.user;
	if (user !== undefined)
		user = user.toJSON();

	// populate courses
	Course.find({
		'_id': { $in: user.courses }
	}, function (err, courses){
		if (err)
			throw err;

		res.render('teacher/pages/dashboard-tea', {
			user: user,
			courses: courses
		});
	}).sort({name: 1}).exec(function(err, docs){

	});
};

exports.editTeacherProfile = function (req, res){
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

		res.redirect('/teacher/dashboard');
	});
};

exports.editTeacherProfilePicture = function (req, res){
	// get current user
	var user = req.user;

	// generate new filename
	var newFilename = random.randomAlphanumericString(64);

	// get mimetype
	var fileMimetype = req.file.mimetype;
	var extension = images.extensionForMimeType(fileMimetype);

	// set all file paths
	var tmpPath = req.file.path;
	var resizedPath = tmpPath + '_150x150';

	// resize image
	images.resizeImage(tmpPath, resizedPath, 150, 150, function (err){
		if (err)
			throw err;

		// delete temporary file
		images.deleteFile(tmpPath, function (err){
			if (err)
				throw err;

			// change file location
			var filePath = '/images/teacher-profile-pictures/' + newFilename + extension;
			var fullFilePath = 'public' + filePath;

			images.changeFileLocation(resizedPath, fullFilePath, function (err){
				if (err)
					throw err;

				// update user info
				user.profilePicturePath = filePath;

				// save user
				user.save(function (err){
					if (err)
						throw err;

					res.redirect('/teacher/dashboard');
				});
			});
		});
	});
};
