// public/js/angular/controllers/activity.js

//add controller activityCtrl to the module of controllers
angular.module('app.controllers', [])

.controller('activityCtrl', function($scope) {
    $scope.questions = [];

    var MULTIPLE_CHOICE = 'multipleChoice';
    var YES_NO = "yesNo";

    $scope.addQuestion = function(myType){
      //The question to be added
      var question;
      //Create the question depending on what type of question is
      switch (myType) {
        case MULTIPLE_CHOICE:
          question = createMultipleChoiceQuestion();
          break;
        case YES_NO:
        question = createYesNoQuestion();
          break;
      }
      //If the question is not null add it to questions
      if(question){
        $scope.questions.push(question);
      }

    };

    createMultipleChoiceQuestion = function() {
      question = {
        questionName: 'Pregunta de alternativas',
        type: MULTIPLE_CHOICE,
        choices: ['opción A', 'opción B', 'opción C', 'opción D']
      };
      return question;
    };

    createYesNoQuestion = function() {
      question = {
        questionName: 'Pregunta de si o no',
        type: YES_NO,
        choices: ['Si', 'No']
      };
      return question;
    };

});
