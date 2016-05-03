// models/teacher.js

var mongoose = require('mongoose');

var teacherSchema = mongoose.Schema({
	firstName: String,
	lastName: String,
	school: String,
	profilePicturePath: String,
	isStudent: Boolean,
	courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
});

module.exports = mongoose.model('Teacher', teacherSchema);