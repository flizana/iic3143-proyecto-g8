// models/template.js

var mongoose = require('mongoose');

var templateSchema = mongoose.Schema({
	name: String,
	teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
	questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
	createdAt: Date
});

module.exports = mongoose.model('Template', templateSchema);