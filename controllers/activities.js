// controllers/activities.js


var Activity = require('../models/activity');
var Course = require('../models/course');

exports.new = function(req, res) {
    var user = req.user;
    if (user !== undefined)
        user = user.toJSON();

    // populate courses
    Course.find({
        '_id': {
            $in: user.courses
        }
    }, function(err, courses) {
        if (err)
            throw err;

        Course.findById(req.params.id, function(err, course) {
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

exports.create = function(req, res) {
    console.log("create");
    console.log(req.body);
    console.log(req.body.title);
    console.log(req.body.questions);
    console.log(req.body.course);

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
    newActivity.save(function(err) {
        if (err) {
            return res.status(406).send({
                message: err
            });
        }
        //create questions
        for (i = 0; i < req.body.questions.length; i++) {
            var newQuestion = new Activity();
            newQuestion.questionName = req.body.questions[i].questionName;
            newQuestion.type = req.body.questions[i].type;
            newQuestion.choices = req.body.questions[i].choices;
            newQuestion.activity = newActivity._id;

            //save the question
            newQuestion.save(function(err) {
                if (err) {
                    return res.status(406).send({
                        message: err
                    });
                }

                //add question to activity
                newActivity.questions.push(newQuestion);

                //save activity
                newActivity.save(function(err) {
                    if (err) {
                        return res.status(406).send({
                            message: err
                        });
                    }
                });
            });
        }

        // go fetch the course so the activity can be assign to the course
        Course.findById(req.body.course._id, function(err, course) {
            if (err) {
                return res.status(406).send({
                    message: err
                });
            }
            course.activities.push(newActivity);

            // save user
            course.save(function(err) {
                if (err) {
                    return res.status(406).send({
                        message: err
                    });
                }
                console.log("all good");
                // send the 200 status. All Good.
                return res.status(200).send({
                    success: "OK",
                    redirect: ("/teacher/courses/" + course._id)
                });
            });
        });

    });
};
