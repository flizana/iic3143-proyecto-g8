$(function() {

    console.log("MENEH");

    $questions = $('.form-group');

    $submitButtonAtBottom = $('#bottom-form-submit-btn');
    $submitButtonAtTop = $('#top-form-submit-btn');


    $submitButtonAtTop.on('click', function(event) {

        if (!checkIfAnswered(event)) {
          event.preventDefault();
        }
    });

    $submitButtonAtBottom.on('click', function(event) {

        if (!checkIfAnswered(event)) {
          event.preventDefault();
        }


    });


    function checkIfAnswered(event) {
        //find all answers
        answered = true;
        $answers = $('.form-group');
        for (var i = 0; i < $answers.length; i++) {
            question_answered = false;
            console.log("Pregunta " + i);
            $answer = $("input[name='" + i + "answer']");

            if ($answer[0] && $answer[0].type == "radio") {
                //por si es yesOrNO o multiple Choice
                for (var j = 0; j < $answer.length; j++) {
                    $check = $($answer[j]);
                    question_answered = question_answered || $check[0].checked;
                }
            } else {
                if ($answer[0] && $answer[0].value !== "") {
                    question_answered = true;
                }

                if (!$answer[0]) {
                    question_answered = true;
                }
            }

            if ($($answers[i]).find(".alert.alert-danger")[0]) {
                $($answers[i]).find(".alert.alert-danger")[0].remove();
            }

            console.log($($answers[i]).find(".alert.alert-danger"));
            if (!question_answered) {
                $($answers[i]).append("<div class='alert alert-danger'> Debe responder esta pregunta. </div>");
            }

            answered = answered && question_answered;
        }



        console.log(answered);
        return answered;

    }
});
