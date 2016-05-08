// controllers/activities.js


var Activity = require('../models/activity');


exports.createActivity = function (req, res) {
  var user = req.user;

  res.render('teacher/pages/create-activity', {
    
  });
};
