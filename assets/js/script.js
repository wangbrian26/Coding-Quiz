var time = document.querySelector("#time")
var timeLeft = 15 * questions.length
var text = document.querySelector("p")

time.textContent = timeLeft + " seconds left"

function timer() {
    var timerInterval = setInterval(function() {
        timeLeft--;
        time.textContent = timeLeft + " seconds left"
        if (timeLeft === 1) {
            time.textContent = timeLeft + " second left"
        } else if (timeLeft === 0) {
            time.textContent = "Out of time"
            clearInterval(timer)
        }
    }, 1000);
}


function startQuiz() {
    timer();
    document.querySelector("#start").setAttribute("class", "hide")
    for (var i = 0; i < questions.length; i++)
        text.textContent = questions[i]
    if(timeLeft != 0) {
        win()
    } else {
        lose()
    }
}

function win() {
    text.textContent = "Congratulations!! You won! Your score is: " + timeLeft + "."
}

function lose() {
    text.textContent = "Sorry, unfortunately you ran out of time. Please try again."
}
document.querySelector("#start").addEventListener("click", startQuiz)