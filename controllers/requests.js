// controllers/requests.js


var Activity = require('../models/activity');
var Course = require('../models/course');
var Question = require('../models/question');
var Student = require('../models/student');
var Answer = require('../models/answer');
var StudentAnswer = require('../models/studentAnswer');
var CourseRequest = require('../models/courseRequest.js');



exports.createRequest = function(req, res) {

    var user = req.user;
    var course = req.body.course;
    console.log(user);
    console.log(course);

    var newRequest = new CourseRequest();
    newRequest.student = user._id;
    newRequest.course = course._id;
    newRequest.accepted = false;



    // save course
    newRequest.save(function(err) {
        if (err)
            throw err;

    });

};
