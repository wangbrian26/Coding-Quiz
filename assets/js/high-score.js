var name = localStorage.getItem("name")
var score = localStorage.getItem("score")
var scores = {
  name: score;
}
var leaderBoardSection = document.querySelector(".leaderBoard")

function leaderBoard () {
  for(var i=0; i<scores.length; i++)
    leaderBoardSection.textContent = scores.name[i] + " with a score of " + scores.score[i]
}
