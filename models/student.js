// models/student.js

var mongoose = require('mongoose');

var studentSchema = mongoose.Schema({
	firstName: String,
	lastName: String,
	email: String,
	password: String,
	emailVerified: Boolean,
	school: String,
	profilePicturePath: String,
	courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
});

module.exports = mongoose.model('Student', studentSchema);