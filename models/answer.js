// models/answer.js

var mongoose = require('mongoose');

var answerSchema = mongoose.Schema({
	question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
	student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
	answer: String,
	createdAt: Date
});

module.exports = mongoose.model('Answer', answerSchema);