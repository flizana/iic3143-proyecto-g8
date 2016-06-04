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

    var newRequest = new CourseRequest();
    newRequest.student = user._id;
    newRequest.course = course._id;
    newRequest.accepted = false;



    // save course
    newRequest.save(function(err, request) {
        if (err)
            throw err;

        return res.status(200).send({
            success: "OK",
            request: request
        });
    });

};


exports.findRequest = function(req, res) {
    var user_id = req.user._id;
    var course_id = req.params.id;
    CourseRequest.find({
        student: user_id,
        course: course_id
    }, function(err, request) {
        if (err)
            throw err;
       console.log(request);

       return res.status(200).send({
           success: "OK",
           request: request
       });
    });

};
