// models/courseRequest.js

var mongoose = require('mongoose');

var courseRequestSchema = mongoose.Schema({
	student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
	course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
	accepted: Boolean,
	createdAt: Date,
	updatedAt: Date
});

module.exports = mongoose.model('CourseRequest', courseRequestSchema);