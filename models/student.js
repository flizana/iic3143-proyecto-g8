// models/student.js

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var studentSchema = mongoose.Schema({
	firstName: String,
	lastName: String,
	email: String,
	password: String,
	emailVerified: Boolean,
	school: String,
	profilePicturePath: String,
	isStudent: Boolean,
	courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
});

// methods ======================
// generating a hash
studentSchema.methods.generateHash = function (password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
studentSchema.methods.validPassword = function (password){
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('Student', studentSchema);