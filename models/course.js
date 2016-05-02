// models/course.js

var mongoose = require('mongoose');

var courseSchema = mongoose.Schema({
	name: String,
	teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
	students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
	activities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Activity' }]
});

module.exports = mongoose.model('Course', courseSchema);