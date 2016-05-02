// routes/routes.js

// controllers
var indexController = require('../controllers/index');

module.exports = function (app, passport){

	// =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function (req, res){
    	indexController.getIndex(req, res);
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the login page
    res.redirect('/login');
}