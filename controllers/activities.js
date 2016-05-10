// controllers/activities.js


var Activity = require('../models/activity');
var Course = require('../models/course');
var Question = require('../models/question');
var Student = require('../models/student');
var Answer = require('../models/answer');


exports.getNewActivity = function(req, res) {
    var user = req.user;
    if (user !== undefined)
        user = user.toJSON();

    // populate courses
    Course.find({
        '_id': {
            $in: user.courses
        }
    }, function (err, courses) {
        if (err)
            throw err;

        Course.findById(req.params.id, function (err, course) {
            if (err)
                throw err;

            res.render('teacher/pages/new-activity', {
                user: user,
                courses: courses,
                course: course
            });
        });
    });
};

exports.createActivity = function(req, res) {

    //Create the activity
    var newActivity = new Activity();
    newActivity.name = req.body.title;
    newActivity.description = req.body.description;
    newActivity.course = req.body.course._id;
    newActivity.questions = [];
    newActivity.answers = [];
    // newActivity.startDate = req.body.startDate;
    // newActivity.endDate = req.body.endDate;
    // newActivity.createdAt =

    // save activity
    newActivity.save(function (err, activity) {
        if (err)
            throw err;

        //create questions
        questions = [];
        for (i = 0; i < req.body.questions.length; i++) {
            var newQuestion = new Question();
            newQuestion.questionName = req.body.questions[i].questionName;
            newQuestion.type = req.body.questions[i].type;
            newQuestion.choices = req.body.questions[i].choices;
            newQuestion.activity = activity._id;

            //add question
            questions.push(newQuestion._id);
            //save the question
            newQuestion.save(function(err, question) {
                if (err)
                    throw err;
            });
        }

        //attach the questions to the activity
        activity.questions = questions;
        //console.log(questions.length);
        //save activity
        activity.save(function(err) {
            if (err)
                throw err;

            // go fetch the course so the activity can be assign to the course
            Course.findById(req.body.course._id, function(err, course) {
                if (err)
                    throw err;


                course.activities.push(newActivity);

                // save user
                course.save(function(err) {
                    if (err)
                        throw err;

                    console.log("all good");
                    // send the 200 status. All Good.
                    return res.status(200).send({
                        success: "OK",
                        redirect: ("/teacher/courses/" + course._id)
                    });
                });
            });
        });
    });
};

exports.getStudentActivity = function(req,res){
    var user = req.user;
    if (user !== undefined)
        user = user.toJSON();

    // populate courses
    Course.find({
        '_id': {
            $in: user.courses
        }
    }, function (err, courses) {
        if (err)
            throw err;

        Course.findById(req.params.course_id, function (err, course) {
            if (err)
                throw err;

            Activity.findById(req.params.activity_id, function(err, activity){
                if (err)
                    throw err;

                Question.find({
                    '_id': {
                        $in: activity.questions
                    }
                }, function(err, questions){
                    if (err)
                        throw err;

                    res.render('student/pages/activity-stu', {
                        user: user,
                        courses: courses,
                        course: course,
                        activity: activity,
                        questions: questions
                    });

                });

                
            });

            
        });
    });
};

exports.getTeacherActivity = function(req,res){
    var user = req.user;
    if (user !== undefined)
        user = user.toJSON();

    // populate courses
    Course.find({
        '_id': {
            $in: user.courses
        }
    }, function (err, courses) {
        if (err)
            throw err;

        Course.findById(req.params.course_id, function (err, course) {
            if (err)
                throw err;

            Activity.findById(req.params.activity_id, function(err, activity){
                if (err)
                    throw err;

                Question.find({
                    '_id': {
                        $in: activity.questions
                    }
                }, function(err, questions){
                    if (err)
                        throw err;

                    Student.find({
                        '_id':{
                            $in: course.students
                        }
                    }, function(err, students){
                        if (err)
                        throw err;

                        Answer.find({
                            '_id':{
                                $in: activity.answers
                            }
                        }, function(err, answers){
                            res.render('teacher/pages/activity-tea', {
                                user: user,
                                courses: courses,
                                course: course,
                                activity: activity,
                                questions: questions,
                                students: students,
                                answers: answers
                            });

                        });

                        
                    });

                    

                });

                
            });

            
        });
    });
};