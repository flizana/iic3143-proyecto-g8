// models/activity.js

var mongoose = require('mongoose');

var activitySchema = mongoose.Schema({
	name: String,
	description: String,
	course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
	questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
	answers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Answer' }],
	studentsWhoAnswered: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
	startDate: Date,
	endDate: Date,
	createdAt: Date
});

module.exports = mongoose.model('Activity', activitySchema);