// controllers/requests.js


var Activity = require('../models/activity');
var Course = require('../models/course');
var Question = require('../models/question');
var Student = require('../models/student');
var Answer = require('../models/answer');
var StudentAnswer = require('../models/studentAnswer');
var CourseRequest = require('../models/courseRequest');



exports.createRequest = function(req, res) {

    var user = req.user;
    var course = req.body.course;

    var newRequest = new CourseRequest();
    newRequest.student = user._id;
    newRequest.course = course._id;
    newRequest.accepted = false;
    newRequest.answered = false;



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


//Finds request of a student to be part of a course
exports.findRequest = function(req, res) {
    var user_id = req.user._id;
    var course_id = req.params.id;
    CourseRequest.find({
        student: user_id,
        course: course_id,
        answered: false
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

exports.requestsOfTeacher = function(req, res) {
    user = req.user;

    Course.find({
        '_id': {
            $in: user.courses
        }
    }, function(err, courses) {

        if (err)
            throw err;


        CourseRequest.find({

            'course': {
                $in: user.courses
            },
            answered: false
        }).populate('course student').exec(function(err, requests) {
            if (err)
                throw err;

            res.render('teacher/pages/requests-tea', {
                user: user,
                courses: courses,
                requests: requests
            });
        });
    }).sort({
        name: 1
    });
};

//get all the requests made by an student
exports.requestsOfStudent = function(req, res) {
    var user = req.user;
    Course.find({
        '_id': {
            $in: user.courses
        }
    }, function(err, courses) {

        if (err)
            throw err;

        CourseRequest.find({
            student: user
        }).populate('course').exec(function(err, requests) {
            if (err)
                throw err;



            res.render('student/pages/requests-stu', {
                user: user,
                courses: courses,
                requests: requests
            });
        });
    }).sort({
        name: 1
    });

};


exports.acceptRequest = function(req, res) {

    //Update request
    CourseRequest.findById(req.body.request._id, function(err, request) {
        if (err)
            throw err;


        request.answered = true;
        request.accepted = true;
        request.save(function(err) {
            if (err)
                throw err;
            Course.findById(request.course, function(err, course) {
                if (err)
                    throw err;
                course.students.push(request.student);
                course.save(function(err) {
                    if (err)
                        throw err;

                    Student.findById(request.student, function(err, student) {
                        if (err)
                            throw err;
                        student.courses.push(request.course);
                        student.save(function(err) {
                            if (err)
                                throw err;

                            return res.status(200).send({
                                success: "OK"
                            });

                        });
                    });

                });
            });
        });
    });
};

exports.rejectRequest = function(req, res) {
    console.log("MENEHEEHEHEH");
    CourseRequest.findById(req.body.request._id, function(err, request) {
        if (err)
            throw err;


        request.answered = true;
        request.accepted = false;
        request.save(function(err) {
            if (err)
                throw err;

            return res.status(200).send({
                success: "OK"
            });

        });
    });

};
