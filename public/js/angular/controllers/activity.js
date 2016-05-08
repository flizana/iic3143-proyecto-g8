// public/js/angular/controllers/activity.js

//add controller activityCtrl to the module of controllers
angular.module('app.controllers', [])

.controller('activityCtrl', function($scope) {
    $scope.questions = [];

    $scope.MULTIPLE_CHOICE = 'multipleChoice';
    $scope.YES_NO = "yesNo";

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
        }
        //If the question is not null add it to questions
        if (question) {
            $scope.questions.push(question);
        }
    };

    //add a new choice to 'choice'
    $scope.addChoice = function(question) {
      // push the new choice
      question.choices.push('opción ' + (question.choices.length + 1) );
    };

    //Remove the choice 'choice' from question
    $scope.deleteChoice = function(question, choice){
      //get the index to where to remove
      var  i = question.choices.indexOf(choice);
      console.log(i);
      //remove from i only 1
      question.choices.splice(i, 1);
    };

    createMultipleChoiceQuestion = function() {
        question = {
            questionName: 'Pregunta de alternativas',
            type: $scope.MULTIPLE_CHOICE,
            choices: ['opción A', 'opción B', 'opción C', 'opción D']
        };
        return question;
    };

    createYesNoQuestion = function() {
        question = {
            questionName: 'Pregunta de si o no',
            type: $scope.YES_NO,
            choices: ['Si', 'No']
        };
        return question;
    };

})

//Filter for displaying the alternatives, it basically transform numbers to letter in this way: 0 = A, 1 = B and so on
.filter('character', function() {
    return function(input) {
        return String.fromCharCode(64 + parseInt(input, 10));
    };
});
