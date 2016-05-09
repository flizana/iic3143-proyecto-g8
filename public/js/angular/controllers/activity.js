// public/js/angular/controllers/activity.js

//add controller activityCtrl to the module of controllers
angular.module('app.controllers', [])

.controller('activityCtrl', function($scope) {

    $scope.questions = [];
    $scope.titulo = "";

    $scope.MULTIPLE_CHOICE = 'multipleChoice';
    $scope.YES_NO = "yesNo";
    $scope.NUMERIC = "numeric";
    $scope.SHORT_ANSWER = "shortAnswer";
    $scope.LONG_ANSWER = "longAnswer";

    $scope.addQuestion = function(myType) {
        console.log(myType);
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

    $scope.getIndex = function(question, choice) {
        var index = 1 + question.choices.indexOf(choice);
        return index;
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
        console.log(i);
        //remove from i only 1
        question.choices.splice(i, 1);
    };



    //########################################
    // NOT SCOPE FUNCTIONS ###################
    //########################################

    createMultipleChoiceQuestion = function() {
        question = {
            questionName: "Pregunta de alternativas",
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
            questionName: 'Pregunta de si o no',
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
            questionName: 'Pregunta de respuesta corta',
            type: $scope.SHORT_ANSWER,
            choices: []
        };
        return question;
    };

    createLongAnswerQuestion = function() {
        question = {
            questionName: 'Comentarios',
            type: $scope.LONG_ANSWER,
            choices: []
        };
        return question;
    };

    createNumericQuestion = function() {
        question = {
            questionName: 'Pregunta numérica',
            type: $scope.NUMERIC,
            choices: []
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
