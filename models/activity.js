// models/activity.js

var mongoose = require('mongoose');

var activitySchema = mongoose.Schema({
	name: String,
	description: String,
	course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
	questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }]
});

module.exports = mongoose.model('Activity', activitySchema);