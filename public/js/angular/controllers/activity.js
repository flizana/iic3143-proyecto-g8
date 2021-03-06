// public/js/angular/controllers/activity.js

//add controller activityCtrl to the module of controllers
angular.module('app.controllers')

.controller('activityCtrl', function($scope, $http, $window) {

     var course = null;
    $scope.questions = [];
    $scope.title = "";
    $scope.id;

    $scope.error = null;
    $scope.success = null;

    $scope.MULTIPLE_CHOICE = 'multipleChoice';
    $scope.YES_NO = "yesNo";
    $scope.NUMERIC = "numeric";
    $scope.SHORT_ANSWER = "shortAnswer";
    $scope.LONG_ANSWER = "longAnswer";

    //sets up the questions
    $scope.setQuestions = function(q){
        var question;
        obj = JSON.parse(q);
        for(var i = 0; i < obj.length; ++i){
           question = createExistingQuestion(obj[i].questionName, obj[i].type, obj[i].choices);
           if(question){
            $scope.questions.push(question);
           }
        }
    };

    $scope.addTemplate = function(t){
        template = JSON.parse(t);
        //get questions from template
        $http({
            method: 'GET',
            url: '/teacher/templates/'+template._id+'/questions',
            data: {
            }
        }).then(function successCallback(response) {
            obj = response.data;
            // obj = JSON.parse(response.data);
            // console.log(obj);
            for(var i = 0; i < obj.length; ++i){
               question = createExistingQuestion(obj[i].questionName, obj[i].type, obj[i].choices);
               if(question){
                $scope.questions.push(question);
               }
            }


            // this callback will be called asynchronously
            // when the response is available
        }, function errorCallback(response) {
            $scope.error = "Error: Hubo un problema conectándose con el servidor. Intente denuevo";
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    };

    $scope.setID = function(t){
        template = JSON.parse(t);
        $scope.id = template._id;
    }

    //Recieves a strings that represents a JSON.
    $scope.setCourse = function(c) {
      course = JSON.parse(c);
    };

    //Add question to array. Recieves what type of question is
    $scope.addQuestion = function(myType) {

        //The question to be added
        var question;
        //Create the question depending on what type of question is
        switch (myType) {
            case $scope.MULTIPLE_CHOICE:
                question = createMultipleChoiceQuestion();
                break;
            case $scope.YES_NO:
                question = createYesNoQuestion();
                break;
            case $scope.NUMERIC:
                question = createNumericQuestion();
                break;
            case $scope.SHORT_ANSWER:
                question = createShortAnswerQuestion();
                break;
            case $scope.LONG_ANSWER:
                question = createLongAnswerQuestion();
                break;
        }
        //If the question is not null add it to questions
        if (question) {
            $scope.questions.push(question);
        }
    };

    $scope.deleteQuestion =  function (question) {
      var i = $scope.questions.indexOf(question);
      //remove from i only 1
      $scope.questions.splice(i, 1);
    };

    //add a new choice to 'choice'
    $scope.addChoice = function(question) {
        // push the new choice
        question.choices.push({
            value: ""
        });
        //questions[0].choices[0] = "ME";
    };

    //Remove the choice 'choice' from question
    $scope.deleteChoice = function(question, choice) {
        //get the index to where to remove
        var i = question.choices.indexOf(choice);
        //remove from i only 1
        question.choices.splice(i, 1);
    };


    //Checks if the needed parameters are in the activity. After that it sends an http request to create the activity
    $scope.createActivity = function() {

        //if it has no title, send an error
        if (!$scope.title) {
            $scope.error = "Error: Debe agregar un título";
            return;
        }

        //if it has no questions, send an error
        if ($scope.questions.length === 0) {
            $scope.error = "Error: No tiene preguntas agregadas. Debe tener al menos una pregunta.";
            return;
        }

        //check that all questions are well defined
        for (i = 0; i < $scope.questions.length; i++) {
            question = $scope.questions[i];
            //Check that the title is define for all questions
            if (!question.questionName) {
                $scope.error = "Error: La pregunta " + (i + 1) + " no tiene título. Todas las preguntas deben tener un título.";
                return;
            }

            //Check that all the choices are valid (not empty)
            if (question.type == $scope.MULTIPLE_CHOICE || question.type == $scope.YES_NO) {
                for (j = 0; j < question.choices.length; j++) {
                    if (!question.choices[j].value) {
                        $scope.error = "Error: La pregunta " + (i + 1) + " tiene alternativas vacías.";
                        return;
                    }
                }
            }

        }

        //No error detected, so set the error to null
        $scope.error = null;


        //make questions be a array of strings

        // questions = [];
        // for(i = 0; i < $scope.questions.length; i++)
        //   questions[i] = $scope.questions[i].value;
        //Send http request
        $http({
            method: 'POST',
            url: '/teacher/courses/activity/create',
            data: {
              title: $scope.title,
              description: 'no description',
              questions: $scope.questions,
              course: course
            }
        }).then(function successCallback(response) {
          $window.location.href = response.data.redirect;


            // this callback will be called asynchronously
            // when the response is available
        }, function errorCallback(response) {
            $scope.error = "Error: Hubo un problema conectándose con el servidor. Intente denuevo";
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    };

    //Checks if the needed parameters are in the activity. After that it sends an http request to create the template
    $scope.createTemplate = function() {

        //if it has no title, send an error
        if (!$scope.title) {
            $scope.error = "Error: Debe agregar un título";
            return;
        }

        //if it has no questions, send an error
        if ($scope.questions.length === 0) {
            $scope.error = "Error: No tiene preguntas agregadas. Debe tener al menos una pregunta.";
            return;
        }

        //check that all questions are well defined
        for (i = 0; i < $scope.questions.length; i++) {
            question = $scope.questions[i];
            //Check that the title is define for all questions
            if (!question.questionName) {
                $scope.error = "Error: La pregunta " + (i + 1) + " no tiene título. Todas las preguntas deben tener un título.";
                return;
            }

            //Check that all the choices are valid (not empty)
            if (question.type == $scope.MULTIPLE_CHOICE || question.type == $scope.YES_NO) {
                for (j = 0; j < question.choices.length; j++) {
                    if (!question.choices[j].value) {
                        $scope.error = "Error: La pregunta " + (i + 1) + " tiene alternativas vacías.";
                        return;
                    }
                }
            }

        }

        //No error detected, so set the error to null
        $scope.error = null;


        //make questions be a array of strings

        // questions = [];
        // for(i = 0; i < $scope.questions.length; i++)
        //   questions[i] = $scope.questions[i].value;
        //Send http request
        $http({
            method: 'POST',
            url: '/teacher/templates/create',
            data: {
              title: $scope.title,
              questions: $scope.questions
            }
        }).then(function successCallback(response) {
          // $window.location.href = response.data.redirect;
          $scope.success = "Se ha guardado la planilla";


            // this callback will be called asynchronously
            // when the response is available
        }, function errorCallback(response) {
            $scope.error = "Error: Hubo un problema conectándose con el servidor. Intente denuevo";
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    };

    $scope.editTemplate = function() {

        //if it has no title, send an error
        if (!$scope.title) {
            $scope.error = "Error: Debe agregar un título";
            return;
        }

        //if it has no questions, send an error
        if ($scope.questions.length === 0) {
            $scope.error = "Error: No tiene preguntas agregadas. Debe tener al menos una pregunta.";
            return;
        }

        //check that all questions are well defined
        for (i = 0; i < $scope.questions.length; i++) {
            question = $scope.questions[i];
            //Check that the title is define for all questions
            if (!question.questionName) {
                $scope.error = "Error: La pregunta " + (i + 1) + " no tiene título. Todas las preguntas deben tener un título.";
                return;
            }

            //Check that all the choices are valid (not empty)
            if (question.type == $scope.MULTIPLE_CHOICE || question.type == $scope.YES_NO) {
                for (j = 0; j < question.choices.length; j++) {
                    if (!question.choices[j].value) {
                        $scope.error = "Error: La pregunta " + (i + 1) + " tiene alternativas vacías.";
                        return;
                    }
                }
            }

        }

        //No error detected, so set the error to null
        $scope.error = null;


        //make questions be a array of strings

        // questions = [];
        // for(i = 0; i < $scope.questions.length; i++)
        //   questions[i] = $scope.questions[i].value;
        //Send http request
        $http({
            method: 'PUT',
            url: '/teacher/templates/'+$scope.id,
            data: {
              title: $scope.title,
              questions: $scope.questions
            }
        }).then(function successCallback(response) {
          // $window.location.href = response.data.redirect;
            $scope.success = "Se ha guardado la planilla";


            // this callback will be called asynchronously
            // when the response is available
        }, function errorCallback(response) {
            $scope.error = "Error: Hubo un problema conectándose con el servidor. Intente denuevo";
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    };

    $scope.deleteTemplate = function(){

        $http({
            method: 'DELETE',
            url: '/teacher/templates/'+$scope.id,
            data: {
            }
        }).then(function successCallback(response) {
          // $window.location.href = response.data.redirect;
            $window.location.href = response.data.redirect;


            // this callback will be called asynchronously
            // when the response is available
        }, function errorCallback(response) {
            $scope.error = "Error: Hubo un problema conectándose con el servidor. Intente denuevo";
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });

    };

    //########################################
    // NOT SCOPE FUNCTIONS ###################
    //########################################


    createMultipleChoiceQuestion = function() {
        question = {
            questionName: "",
            type: $scope.MULTIPLE_CHOICE,
            choices: [{
                value: ""
            }, {
                value: ""
            }, {
                value: ""
            }, {
                value: ""
            }]
        };
        return question;
    };

    createYesNoQuestion = function() {
        question = {
            questionName: '',
            type: $scope.YES_NO,
            choices: [{
                value: "Si"
            }, {
                value: "No"
            }]
        };
        return question;
    };

    createShortAnswerQuestion = function() {
        question = {
            questionName: '',
            type: $scope.SHORT_ANSWER,
            choices: []
        };
        return question;
    };

    createLongAnswerQuestion = function() {
        question = {
            questionName: '',
            type: $scope.LONG_ANSWER,
            choices: []
        };
        return question;
    };

    createNumericQuestion = function() {
        question = {
            questionName: '',
            type: $scope.NUMERIC,
            choices: []
        };
        return question;
    };

    createExistingQuestion = function(name, type, choices){
        question = {
            questionName: name,
            type: type,
            choices: choices
        };
        return question;
    };
})

//Filter for displaying the alternatives, it basically transform numbers to letter in this way: 0 = A, 1 = B and so on
//Code taken from http://stackoverflow.com/questions/22786483/angularjs-show-index-as-char answer from: Engineer
.filter('character', function() {
    return function(input) {
        return String.fromCharCode(64 + parseInt(input, 10));
    };
});
