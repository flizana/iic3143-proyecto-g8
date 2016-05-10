// controllers/activities.js


var Activity = require('../models/activity');
var Course = require('../models/course');
var Question = require('../models/question');
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
            Course.findById(req.body.course._id, function (err, course) {
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

            Activity.findById(req.params.activity_id, function (err, activity){
                if (err)
                    throw err;

                Question.find({
                    '_id': {
                        $in: activity.questions
                    }
                }, function (err, questions){
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

exports.postStudentAnswer = function (req, res){
    // get current user
    var user = req.user;
    if (user !== undefined)
        user = user.toJSON();

    // get number of answers
    var numAnswers = Object.keys(req.body).length / 2;

    // create answers
    var answers = [];
    for (var i = 0; i < numAnswers; i++){
        var questionId = req.body[i + "question"];
        var answer = req.body[i + "answer"];

        var newAnswer = new Answer();
        newAnswer.createdAt = Date.now();
        newAnswer.student = user._id;
        newAnswer.question = questionId;
        newAnswer.answer = answer;

        answers.push(newAnswer._id);

        // save answer
        newAnswer.save(function (err){
            if (err)
                throw err;
        });
    }

    // get activity
    Activity.findById(req.params.activity_id, function (err, activity){
        if (err)
            throw err;

        // push answers to activity
        for (var i = 0; i < answers.length; i++){
            activity.answers.push(answers[i]);
        }

        // save activity
        activity.save(function (err){
            if (err)
                throw err;

            res.redirect('/student/courses/' + req.params.course_id);
        });
    });
}