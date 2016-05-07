// config/passport.js

// load dependencies
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

var Student = require('../models/student');
var Teacher = require('../models/teacher');

// expose this function to our app using module.exports
module.exports = function (passport){
	// =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function (user, done){
        var serializeId = "";
        if (user.isStudent){ // user is student
            serializeId = 's' + user.id;
        } else { // user is teacher
            serializeId = 't' + user.id;
        }
        done(null, serializeId);
    });

    // used to deserialize the user
    passport.deserializeUser(function (id, done){
        var userType = id.charAt(0);
        var finalId = id.slice(1);
        if (userType == 's'){
            Student.findById(finalId, function (err, user){
                done(err, user);
            });
        } else {
            Teacher.findById(finalId, function (err, user){
                done(err, user);
            });
        }
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    // Student Register
    passport.use('student-register', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    function (req, email, password, done){
        process.nextTick(function (){
            Student.findOne({ 'email': email }, function (err, user){
                if (err)
                    return done(err);

                if (user){
                    return done(null, false, req.flash('studentRegisterMessage', 'Email ya está en uso. Por favor intente con otro email.'));
                } else {
                    if (password != req.body.confirmPassword){
                        return done(null, false, req.flash('studentRegisterMessage', 'Contraseñas no coinciden. Por favor intente nuevamente.'));
                    } else {
                        if (req.body.firstName != "" && req.body.lastName != "" && req.body.school != "" && email != "" && password != ""){
                            // create new student
                            var newStudent = new Student();
                            newStudent.firstName = req.body.firstName;
                            newStudent.lastName = req.body.lastName;
                            newStudent.email = email;
                            newStudent.emailVerified = false;
                            newStudent.school = req.body.school;
                            newStudent.profilePicturePath = '/images/avatar_placeholder.png';
                            newStudent.courses = [];
                            newStudent.isStudent = true;
                            newStudent.password = newStudent.generateHash(password);

                            // save student
                            newStudent.save(function (err){
                                if (err)
                                    return done(err);

                                return done(null, newStudent);
                            });
                        } else {
                            return done(null, false, req.flash('studentRegisterMessage', 'Por favor rellene todos los campos.'));
                        }
                    }
                }
            });
        });
    }));

    // Teacher Register
    passport.use('teacher-register', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    function (req, email, password, done){
        process.nextTick(function (){
            Teacher.findOne({ 'email': email }, function (err, user){
                if (err)
                    return done(err);

                if (user){
                    return done(null, false, req.flash('teacherRegisterMessage', 'Email ya está en uso. Por favor intente con otro email.'));
                } else {
                    if (password != req.body.confirmPassword){
                        return done(null, false, req.flash('teacherRegisterMessage', 'Contraseñas no coinciden. Por favor intente nuevamente.'));
                    } else {
                        if (req.body.firstName != "" && req.body.lastName != "" && req.body.school != "" && email != "" && password != ""){
                            // create new teacher
                            var newTeacher = new Teacher();
                            newTeacher.firstName = req.body.firstName;
                            newTeacher.lastName = req.body.lastName;
                            newTeacher.email = email;
                            newTeacher.emailVerified = false;
                            newTeacher.school = req.body.school;
                            newTeacher.profilePicturePath = '/images/avatar_placeholder.png';
                            newTeacher.courses = [];
                            newTeacher.isStudent = false;
                            newTeacher.password = newTeacher.generateHash(password);

                            // save teacher
                            newTeacher.save(function (err){
                                if (err)
                                    return done(err);

                                return done(null, newTeacher);
                            });
                        } else {
                            return done(null, false, req.flash('teacherRegisterMessage', 'Por favor rellene todos los campos.'));
                        }
                    }
                }
            });
        });
    }));

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    // Student Login
    passport.use('student-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    function (req, email, password, done){
        Student.findOne({ 'email': email }, function (err, user){
            if (err)
                return done(err);

            if (!user)
                return done(null, false, req.flash('studentRegisterMessage', 'Credenciales inválidas'));

            if (!user.validPassword(password))
                return done(null, false, req.flash('studentRegisterMessage', 'Credenciales inválidas'));

            return done(null, user);
        });
    }));

    // Teacher Login
    passport.use('teacher-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    function (req, email, password, done){
        Teacher.findOne({ 'email': email }, function (err, user){
            if (err)
                return done(err);

            if (!user)
                return done(null, false, req.flash('teacherRegisterMessage', 'Credenciales inválidas'));

            if (!user.validPassword(password))
                return done(null, false, req.flash('teacherRegisterMessage', 'Credenciales inválidas'));

            return done(null, user);
        });
    }));
};





























