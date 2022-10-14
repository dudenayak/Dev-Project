document.getElementById("btn").onclick = function()
{
  var randomNo1 = Math.ceil(Math.random()*6);
  var randomNo2 = Math.ceil(Math.random()*6);

  document.getElementById("die1").src = "E:/WebPage/NEW%20COURSE/Dicey%20Dice/images/dice" + randomNo1 + ".png";
  document.getElementById("die2").src = "E:/WebPage/NEW%20COURSE/Dicey%20Dice/images/dice" + randomNo2 + ".png";

  if (randomNo1 == randomNo2)
  {
    document.querySelector("h1").innerHTML = "Draw";
    document.querySelector(".player1").style.color = "yellow";
    document.querySelector(".player2").style.color = "yellow";
  }
  else if (randomNo1 > randomNo2)
  {
    document.querySelector("h1").innerHTML = "Player 1 wins";
    document.querySelector(".player1").style.color = "green";
    document.querySelector(".player2").style.color = "red";
  }
  else
  {
    document.querySelector("h1").innerHTML = "Player 2 wins";
    document.querySelector(".player2").style.color = "green";
    document.querySelector(".player1").style.color = "red";
  }
}