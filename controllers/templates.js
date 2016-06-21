// controllers/templates.js

var Question = require('../models/question');
var Template = require('../models/template');
var Course = require('../models/course');

exports.getAllTemplates = function(req, res){
	var user = req.user;

    Course.find({
        '_id': {
            $in: user.courses
        }
    }, function(err, courses) {
        if(err)
            throw err;

    	Template.find({
            '_id': {
                $in: user.templates
            }
        }, function(err, templates) {
        	if (err)
        		throw err;

        	res.render('teacher/pages/templates-tea', {
                user: user,
                templates: templates,
                courses: courses
            });
        }).sort({name: 1});

    }).sort({name: 1});

};

exports.getTemplate = function(req, res){
    var user = req.user;

    Course.find({
        '_id': {
            $in: user.courses
        }
    }, function(err, courses) {
        if (err)
            throw err;
        Template.find({
            '_id': {
                $in: user.templates
            }
        }, function(err, templates) {
            if (err)
                throw err;

            Template.findById(req.params.template_id, function(err, template){
                if (err)
                    throw err;

                Question.find({
                    '_id': {
                        $in: template.questions
                    }
                }, function(err, questions){

                    res.render('teacher/pages/template-tea', {
                        user:user, 
                        template: template,
                        questions: questions,
                        courses: courses,
                        templates: templates
                    });
                });
            });
        }).sort({name: 1});
    }).sort({name: 1});

};

exports.getNewTemplate = function(req, res) {
    var user = req.user;

    Course.find({
        '_id': {
            $in: user.courses
        }
    }, function(err, courses) {
        if (err)
            throw err;

        Template.find({
            '_id': {
                $in: user.templates
            }
        }, function(err, templates) {
            if (err)
                throw err;

            res.render('teacher/pages/new-template', {
                user:user,
                courses: courses,
                templates: templates
            });
        }).sort({name: 1});    
    }).sort({name: 1});
};

exports.editTemplate = function(req, res) {
    var user = req.user;

    //Create the template
    Template.findById(req.params.template_id, function(err, template){
        if(err)
            throw err;

        console.log(template);
        template.name = req.body.title;
        template.teacher = user._id;
        template.questions = [];
        // save template
        template.save(function (err, template) {
            if (err)
                throw err;

            //create questions
            questions = [];
            for (i = 0; i < req.body.questions.length; i++) {
                var newQuestion = new Question();
                newQuestion.questionName = req.body.questions[i].questionName;
                newQuestion.type = req.body.questions[i].type;
                newQuestion.choices = req.body.questions[i].choices;
                newQuestion.template = template._id;

                //add question
                questions.push(newQuestion._id);
                //save the question
                newQuestion.save(function(err, question) {
                    if (err)
                        throw err;
                });
            }

            //attach the questions to the template
            template.questions = questions;
            //save template
            template.save(function(err) {
                if (err)
                    throw err;

                // assign template to teacher
                user.templates.push(template);

                // save user
                user.save(function(err) {
                    if (err)
                        throw err;

                    // all good
                    return res.status(200).send({
                        success: "OK"
                    });
                });
            }); 

        });
    });
};

exports.createTemplate = function(req, res) {
    var user = req.user;

    //Create the template
    var newTemplate = new Template();
    newTemplate.name = req.body.title;
    newTemplate.teacher = user._id;
    newTemplate.questions = [];

    // save template
    newTemplate.save(function (err, template) {
        if (err)
            throw err;

        //create questions
        questions = [];
        for (i = 0; i < req.body.questions.length; i++) {
            var newQuestion = new Question();
            newQuestion.questionName = req.body.questions[i].questionName;
            newQuestion.type = req.body.questions[i].type;
            newQuestion.choices = req.body.questions[i].choices;
            newQuestion.template = template._id;

            //add question
            questions.push(newQuestion._id);
            //save the question
            newQuestion.save(function(err, question) {
                if (err)
                    throw err;
            });
        }

        //attach the questions to the template
        template.questions = questions;
        //save template
        template.save(function(err) {
            if (err)
                throw err;

            // assign template to teacher
            user.templates.push(template);

            // save user
            user.save(function(err) {
                if (err)
                    throw err;

                // all good
                return res.status(200).send({
                    success: "OK"
                });
            });

            

        });
    });
};