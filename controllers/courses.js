// controllers/courses.js

var Course = require('../models/course');
var Activity = require('../models/activity');
var Student = require('../models/student');
var Answer = require('../models/answer');

exports.addNewCourse = function(req, res) {
    // get current user
    var user = req.user;

    // check if name is not empty
    if (req.body.courseName == "") {
        // if empty, return
        res.redirect(req.headers.referer);
    } else {
        // create new course
        var newCourse = new Course();
        newCourse.name = req.body.courseName;
        newCourse.teacher = user._id;
        newCourse.students = [];
        newCourse.activities = [];

        // save course
        newCourse.save(function(err) {
            if (err)
                throw err;

            // assign course to teacher
            user.courses.push(newCourse);

            // save user
            user.save(function(err) {
                if (err)
                    throw err;

                // all good
                res.redirect(req.headers.referer);
            });
        });
    }
};



exports.getTeacherCourse = function(req, res) {
    var user = req.user;
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

            Student.find({
                '_id': {
                    $in: course.students
                }
            }, function(err, students) {
                if (err)
                    throw err;

                Activity.find({
                    '_id': {
                        $in: course.activities
                    }
                }, function(err, activities) {
                    if (err)
                        throw err;

                    res.render('teacher/pages/courses-tea', {
                        user: user,
                        courses: courses,
                        course: course,
                        activities: activities,
                        students: students
                    });

                });


            }).sort({
                firstName: 1
            }).exec(function(err, docs) {

            });


        });


    }).sort({
        name: 1
    });

};

//Método recibe un string y retorna todos los cursos que tengan ese nombre
exports.searchCourse = function(req, res) {
    var user = req.user;
    var searchFor = req.params.searchFor;
		console.log("---dadfsdfgsdfkjvnsdfjvnsdfkvnsdkfjvnsdkfjvnsdkfjvnsdkfjnvsdkfjnvsdkfnvskdfjnvskdfjnvsdkfjnvskdjfnvskdfnvksdjfnvksdjfnvskdjfnv");
		console.log(user);
    Course.find({
        'name': {
            $regex: ".*" + searchFor + "*."
        }
    }).populate('teacher').
    exec(function(err, courses) {
        if (err)
            throw err;


        console.log(courses);
        res.render("student/pages/search-stu", {
            searchFor: searchFor,
            user: user,
            courses: courses
        });
    });
};



exports.getStudentCourse = function(req, res) {
    var user = req.user;
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

            Activity.find({
                '_id': {
                    $in: course.activities
                }
            }, function(err, activities) {
                if (err)
                    throw err;

                res.render('student/pages/courses-stu', {
                    user: user,
                    courses: courses,
                    course: course,
                    activities: activities
                });

            });

        });


    }).sort({
        name: 1
    });
}
