// models/teacher.js

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var teacherSchema = mongoose.Schema({
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
teacherSchema.methods.generateHash = function (password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
teacherSchema.methods.validPassword = function (password){
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('Teacher', teacherSchema);