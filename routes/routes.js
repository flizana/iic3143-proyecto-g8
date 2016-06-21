// routes/routes.js

// controllers
var indexController = require('../controllers/index');
var loginController = require('../controllers/login');
var dashboardController = require('../controllers/dashboard');
var courseController = require('../controllers/courses');
var activityController = require('../controllers/activities');
var requestController = require('../controllers/requests');
var templateController = require('../controllers/templates');

module.exports = function(app, passport) {


    // =====================================
    // Issue with CORS =====================
    // =====================================
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
        indexController.getIndex(req, res);
    });

    // =====================================
    // STUDENT  ============================
    // =====================================
    app.get('/student', function(req, res) {
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
    app.get('/student/dashboard', isLoggedInAsStudent, function(req, res) {
        dashboardController.getStudentDashboard(req, res);
    });

    app.post('/student/dashboard/edit-profile', isLoggedInAsStudent, function(req, res) {
        dashboardController.editStudentProfile(req, res);
    });

    app.post('/student/dashboard/edit-profile-picture', isLoggedInAsStudent, function(req, res) {
        dashboardController.editStudentProfilePicture(req, res);
    });

    // =====================================
    // STU. COURSES  =======================
    // =====================================
    app.get('/student/courses/:id', isLoggedInAsStudent, function(req, res) {
        courseController.getStudentCourse(req, res);
    });


    app.get('/student/search/course/:searchFor', isLoggedInAsStudent, function(req, res) {

        courseController.searchCourse(req, res);
    });

    // =====================================
    // STU. REQUESTS  ======================
    // =====================================
    app.post('/student/courses/:id/request/create', isLoggedInAsStudent, function(req, res) {
      requestController.createRequest(req,res);
    });

    app.get('/student/courses/:id/request/find', isLoggedInAsStudent, function(req, res) {
      requestController.findRequest(req,res);
    });

    app.get('/student/requests', isLoggedInAsStudent, function(req,res) {
      console.log("-------------------------------------------- llego a routes");
      requestController.requestsOfStudent(req,res);
    });

    // =====================================
    // STU. ACTIVITY =======================
    // =====================================
    app.get('/student/courses/:course_id/activity/:activity_id', isLoggedInAsStudent, function(req, res) {
        activityController.getStudentActivity(req, res);
    });

    app.post('/student/courses/:course_id/activity/:activity_id/answer', isLoggedInAsStudent, function(req, res) {
        activityController.postStudentAnswer(req, res);
    });

    // =====================================
    // TEACHER  ============================
    // =====================================
    app.get('/teacher', function(req, res) {
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
    app.get('/teacher/dashboard', isLoggedInAsTeacher, function(req, res) {
        dashboardController.getTeacherDashboard(req, res);
    });

    app.post('/teacher/dashboard/edit-profile', isLoggedInAsTeacher, function(req, res) {
        dashboardController.editTeacherProfile(req, res);
    });

    app.post('/teacher/dashboard/edit-profile-picture', isLoggedInAsTeacher, function(req, res) {
        dashboardController.editTeacherProfilePicture(req, res);
    });

    // =====================================
    // TEA. COURSES  =======================
    // =====================================
    app.post('/teacher/courses/new', isLoggedInAsTeacher, function(req, res) {
        courseController.addNewCourse(req, res);
    });

    app.get('/teacher/requests', isLoggedInAsTeacher, function (req, res) {
      requestController.requestsOfTeacher(req, res);
    });


    app.get('/teacher/courses/:id', isLoggedInAsTeacher, function(req, res) {
        courseController.getTeacherCourse(req, res);
    });

    // =====================================
    // TEA. ACTIVITY  ======================
    // =====================================

    app.get('/teacher/courses/:id/activity/new', isLoggedInAsTeacher, function(req, res) {

        activityController.getNewActivity(req, res);
    });

    app.post('/teacher/courses/activity/create', isLoggedInAsTeacher, function(req, res) {
        activityController.createActivity(req, res);
    });

    app.get('/teacher/courses/:course_id/activity/:activity_id', isLoggedInAsTeacher, function(req, res) {
        activityController.getTeacherActivity(req, res);
    });

    // =====================================
    // TEA. REQUESTS  ======================
    // =====================================

    app.put('/requests/accept/:id', isLoggedInAsTeacher, function(req, res) {
      requestController.acceptRequest(req,res);
    });

    app.put('/requests/reject/:id', isLoggedInAsTeacher, function(req, res) {
      requestController.rejectRequest(req,res);
    });

    // =====================================
    // TEA. TEMPLATES  =====================
    // =====================================

    app.get('/teacher/templates', isLoggedInAsTeacher, function(req, res) {
        templateController.getAllTemplates(req, res);
    });

    app.get('/teacher/templates/new', isLoggedInAsTeacher, function(req, res) {
        templateController.getNewTemplate(req, res);
    });

    app.get('/teacher/templates/:template_id', isLoggedInAsTeacher, function(req, res) {
        templateController.getTemplate(req, res);
    });

    app.get('/teacher/templates/:template_id/questions', isLoggedInAsTeacher, function(req, res) {
        templateController.getTemplateQuestions(req, res);
    });

    app.put('/teacher/templates/:template_id', isLoggedInAsTeacher, function(req, res) {
        templateController.editTemplate(req, res);
    });

    app.post('/teacher/templates/create', isLoggedInAsTeacher, function(req, res) {
        templateController.createTemplate(req, res);
    });

    // =====================================
    // LOGOUT  =============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};

// route middleware to make sure a user is logged in
function isLoggedInAsStudent(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()) {
        if (req.user.isStudent) {
            return next();
        }
    }

    // if they aren't redirect them to the login page
    res.redirect('/');
}

function isLoggedInAsTeacher(req, res, next) {
    if (req.isAuthenticated()) {
        if (!req.user.isStudent) {
            return next();
        }
    }

    res.redirect('/');
}
