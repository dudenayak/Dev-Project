var colours = ["green", "red", "blue", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var start = false;
var keyColour = 0;


setInterval(function ()
{
  if (keyColour === 0)
  {
    $(".key").animate({"top" : "6px"});
    keyColour = 1;
  }
  else
  {
    $(".key").animate({"top" : "0"});
    keyColour = 0;
  }
}, 700)

$(".key").click(function()
{
  if (start === false)
  {
    nextSequence();
    start = true;
  }
});

$(document).keypress(function(event)
{
  if ((event.key === 'a' || event.key === 'A') && start === false)
  {
    nextSequence();
    start = true;
  }
});

$(".btn").click(function()
{
  var userButton = $(this).attr("id");
  userPressButton(userButton);
  checkAnswer(userClickedPattern.length);
});

function nextSequence()
{ 
  userClickedPattern = [];

  level++;
  $("h1").html("Level " + level);

  var random = Math.floor(Math.random()*4);
  var randomColourButton = colours[random];

  var audio = new Audio("sounds/" + randomColourButton + ".mp3");
  audio.play();

  $("#" + randomColourButton).fadeIn(100).fadeOut(100).fadeIn(100);

  gamePattern.push(randomColourButton);
}

function userPressButton(userButton)
{
  var audio = new Audio("sounds/" + userButton + ".mp3");
  audio.play();

  $("#" + userButton).addClass("pressed");

  setTimeout(function()
  {
    $("#" + userButton).removeClass("pressed");
  }, 200)

  userClickedPattern.push(userButton);
}

function checkAnswer(currentLevel)
{
  if (userClickedPattern[currentLevel - 1] === gamePattern[currentLevel - 1])
  {
    console.log("success");
  
    if (userClickedPattern.length === gamePattern.length)
    {
      setTimeout(function () 
      {
        nextSequence();
      }, 1000);
    }
  } 
  else 
  {
    $("h1").html("Game Over! Press <span class='key'>A</span> to restart");

    var audio = new Audio("sounds/wrong.mp3");
    audio.play();

    $("body").addClass("game-over");

    setTimeout(function()
    {
      $("body").removeClass("game-over");
    }, 200);

    restart();

    $(".key").click(function()
    {
      if (start === false)
      {
        nextSequence();
        start = true;
      }
    });
  }
}

function restart()
{
  gamePattern = [];
  level = 0;
  start = false;
}



