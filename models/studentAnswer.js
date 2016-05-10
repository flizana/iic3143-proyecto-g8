// models/studentAnswers.js

var mongoose = require('mongoose');

var studentAnswerSchema = mongoose.Schema({
	student: {type: mongoose.Schema.Types.ObjectId, ref: 'Student'},
	answers: [{type: mongoose.Schema.Types.ObjectId, ref: 'Answer'}],
	activity: {type: mongoose.Schema.Types.ObjectId, ref: 'Activity'}
});

module.exports = mongoose.model('StudentAnswer', studentAnswerSchema);