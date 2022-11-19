var time = document.querySelector("#time");
var timeLeft = 15 * questions.length;
var text = document.querySelector(".final");
var currentQuestionIndex = 0;
var questionsText = document.querySelector("#questions");
var questionsSection = document.querySelector(".questions");
var currentQuestion = questions[currentQuestionIndex];

time.textContent = timeLeft + " seconds left";

// timer function to keep track of the time
function timer() {
  var timerInterval = setInterval(function () {
    timeLeft--;
    time.textContent = timeLeft + " seconds left";
    if (timeLeft === 1) {
      time.textContent = timeLeft + " second left";
    } else if (timeLeft < 0) {
      time.textContent = "Out of time";
      clearInterval(timer);
    }
  }, 1000);
}

// hides the start screen and calls quizQuestion function after the button click to start the quiz
function startQuiz() {
  timer();
  questionsSection.removeAttribute("id", "hide");
  document.querySelector(".main").setAttribute("id", "hide");
  console.log(questions[currentQuestionIndex].title);
  quizQuestion();
}

// pulls and displays the current question
function quizQuestion() {
  if (timeLeft > 0) {
    questionsText.textContent = currentQuestion.title;
    for (var i = 0; i < currentQuestion.choices.length; i++) {
      var choiceButton = document.createElement("button");
      choiceButton.setAttribute("value", currentQuestion.choices[i]);
      choiceButton.setAttribute("class", "choiceButtons");
      choiceButton.textContent = i + 1 + "." + currentQuestion.choices[i];
      questionsText.appendChild(choiceButton);
    }
  }
}

// listens for user selection for their answer
function userSelection(event) {
  var userChoice = event.target;
  if (event.target.className === "choiceButtons") {
    console.log(userChoice);
    if (timeLeft > 0 && currentQuestionIndex < questions.length - 1) {
      if (userChoice.value !== currentQuestion.answer) {
        document.querySelector("#rightWrong").textContent =
          "Wrong. You will be penalized 15 seconds.";
        currentQuestionIndex++;
        currentQuestion = questions[currentQuestionIndex];
        console.log(currentQuestionIndex);
        timeLeft -= 15;
        if (timeLeft < 0) {
          timeLeft = 0;
          endQuiz();
        }
        quizQuestion();
      } else {
        document.querySelector("#rightWrong").textContent = "Correct!";
        currentQuestionIndex++;
        currentQuestion = questions[currentQuestionIndex];
        quizQuestion();
      }
    } else {
      endQuiz();
    }
  }
}

function endQuiz() {
  clearInterval(timer);
  if (timeLeft > 0) {
    win();
  } else {
    lose();
  }
}

function win() {
  questionsSection.setAttribute("id", "hide");
  text.removeAttribute("id", "hide");
  text.textContent =
    "Congratulations!! You won! Your score is: " +
    timeLeft +
    ". Please input your name:";
  var inputScore = document.createElement("input");
  inputScore.setAttribute("class", "input");
  text.appendChild(inputScore);
  var name = inputScore.value;
  localStorage.setItem("name", name);
  localStorage.setItem("score", timeLeft);
}

function lose() {
  questionsSection.setAttribute("id", "hide");
  text.removeAttribute("id", "hide");
  text.textContent =
    "Sorry, unfortunately you ran out of time. Please try again.";
}
document.querySelector("#start").addEventListener("click", startQuiz);
questionsSection.addEventListener("click", userSelection);
