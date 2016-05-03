// routes/routes.js

// controllers
var indexController = require('../controllers/index');
var loginController = require('../controllers/login');
var dashboardController = require('../controllers/dashboard');

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
    // DASHBOARD  ==========================
    // =====================================
    app.get('/student/dashboard', isLoggedIn, function (req, res){
        dashboardController.getStudentDashboard(req, res);
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the login page
    res.redirect('/');
}