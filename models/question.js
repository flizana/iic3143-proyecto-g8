// models/activity.js

var mongoose = require('mongoose');

var questionSchema = mongoose.Schema({
	questionName: String,
	type: String,
	choices: Array,
	activity: { type: mongoose.Schema.Types.ObjectId, ref: 'Activity' },
	template: { type: mongoose.Schema.Types.ObjectId, ref: 'Template' }
});

module.exports = mongoose.model('Question', questionSchema);