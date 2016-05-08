// routes/routes.js

// controllers
var indexController = require('../controllers/index');
var loginController = require('../controllers/login');
var dashboardController = require('../controllers/dashboard');
var courseController = require('../controllers/courses');

module.exports = function (app, passport){

	// =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function (req, res){
    	indexController.getIndex(req, res);
    });

    // =====================================
    // STUDENT  ============================
    // =====================================
    app.get('/student', function (req, res){
        indexController.getStudentLogin(req, res);
    });

    app.post('/student/login', passport.authenticate('student-login', {
        successRedirect: '/student/dashboard',
        failureRedirect: '/student',
        failureFlash: true
    }));

    app.post('/student/register', passport.authenticate('student-register', {
        successRedirect: '/student/dashboard',
        failureRedirect: '/student',
        failureFlash: true
    }));

    // =====================================
    // STU. DASHBOARD  =====================
    // =====================================
    app.get('/student/dashboard', isLoggedInAsStudent, function (req, res){
        dashboardController.getStudentDashboard(req, res);
    });

    app.post('/student/dashboard/edit-profile', isLoggedInAsStudent, function (req, res){
        dashboardController.editStudentProfile(req, res);
    });

    app.post('/student/dashboard/edit-profile-picture', isLoggedInAsStudent, function (req, res){
        dashboardController.editStudentProfilePicture(req, res);
    });

    // =====================================
    // TEACHER  ============================
    // =====================================
    app.get('/teacher', function (req, res){
        indexController.getTeacherLogin(req, res);
    });

    app.post('/teacher/login', passport.authenticate('teacher-login', {
        successRedirect: '/teacher/dashboard',
        failureRedirect: '/teacher',
        failureFlash: true
    }));

    app.post('/teacher/register', passport.authenticate('teacher-register', {
        successRedirect: '/teacher/dashboard',
        failureRedirect: '/teacher',
        failureFlash: true
    }));

    // =====================================
    // TEA. DASHBOARD  =====================
    // =====================================
    app.get('/teacher/dashboard', isLoggedInAsTeacher, function (req, res){
        dashboardController.getTeacherDashboard(req, res);
    });

    app.post('/teacher/dashboard/edit-profile', isLoggedInAsTeacher, function (req, res){
        dashboardController.editTeacherProfile(req, res);
    });

    app.post('/teacher/dashboard/edit-profile-picture', isLoggedInAsTeacher, function (req, res){
        dashboardController.editTeacherProfilePicture(req, res);
    });

    // =====================================
    // TEA. COURSES  =======================
    // =====================================
    app.post('/teacher/add-new-course', isLoggedInAsTeacher, function (req, res){
        courseController.addNewCourse(req, res);
    });


    app.get('/teacher/courses/:id', isLoggedInAsTeacher, function(req,res){
        courseController.getCourse(req,res);
    });

    // =====================================
    // LOGOUT  =============================
    // =====================================
    app.get('/logout', function (req, res){
        req.logout();
        res.redirect('/');
    });
};

// route middleware to make sure a user is logged in
function isLoggedInAsStudent(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated()){
        if (req.user.isStudent){
            return next();
        }
    }

    // if they aren't redirect them to the login page
    res.redirect('/');
}

function isLoggedInAsTeacher(req, res, next){
    if (req.isAuthenticated()){
        if (!req.user.isStudent){
            return next();
        }
    }

    res.redirect('/');
}