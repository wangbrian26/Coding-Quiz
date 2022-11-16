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
}

document.querySelector("#start").addEventListener("click", startQuiz)