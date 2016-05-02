// models/student.js

var mongoose = require('mongoose');

var studentSchema = mongoose.Schema({
	firstName: String,
	lastName: String,
	school: String,
	profilePicturePath: String,
	courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
});

module.exports = mongoose.model('Student', studentSchema);