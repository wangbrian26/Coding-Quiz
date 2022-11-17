var time = document.querySelector("#time");
var timeLeft = 15 * questions.length;
var text = document.querySelector("p");
var currentQuestionIndex = 0;
var questionsSection = document.querySelector("#questions");

time.textContent = timeLeft + " seconds left";

function timer() {
  var timerInterval = setInterval(function () {
    timeLeft--;
    time.textContent = timeLeft + " seconds left";
    if (timeLeft === 1) {
      time.textContent = timeLeft + " second left";
    } else if (timeLeft === 0) {
      time.textContent = "Out of time";
      clearInterval(timer);
    }
  }, 1000);
}

function startQuiz() {
  timer();
  document.querySelector(".questions").removeAttribute("id", "hide");
  document.querySelector(".main").setAttribute("id", "hide");
  console.log(questions[currentQuestionIndex].title);
  var currentQuestion = questions[currentQuestionIndex];
  questionsSection.textContent = currentQuestion.title;
  for (var i = 0; i < currentQuestion.choices.length; i++) {
    var choiceButton = document.createElement("button");
    choiceButton.setAttribute("value", currentQuestion.choices[i]);
    choiceButton.setAttribute("class", "choiceButtons");
    choiceButton.textContent = i + 1 + "." + currentQuestion.choices[i];
    document.querySelector(".questions").appendChild(choiceButton);
  }
  userSelection();
}

function userSelection(event) {
  var userChoice = event.target;
  if (timeLeft === 0) {
    return;
  } else {
    if (userChoice.value == questions[currentQuestionIndex].answer) {
      document.querySelector("#rightWrong").textContent = "Correct!";
      currentQuestionIndex++;
    } else {
      document.querySelector("#rightWrong").textContent =
        "Wrong. You will be penalized 15 seconds.";
      currentQuestionIndex++;
      timeLeft -= 15;
    }
  }
}

function win() {
  text.textContent =
    "Congratulations!! You won! Your score is: " + timeLeft + ".";
}

function lose() {
  text.textContent =
    "Sorry, unfortunately you ran out of time. Please try again.";
}
document.querySelector("#start").addEventListener("click", startQuiz);
