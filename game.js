
var name = prompt("HELLO! Please write your name below");
alert("Welcome "+name);

var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level=0;

$(document).keypress( function() {
  if(!started){
    $("#level-title").text("Level " + level);
  nextSequence();
  started = true;
  }
});


$(".btn").click( function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animationPress(userChosenColour);
checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    console.log("success");
    if(userClickedPattern.length === gamePattern.length)
    {
      setTimeout(function() {
        nextSequence();
      }, 1100);
    }
  }
  else{
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over! Press A key to restart");

    setTimeout(function() {
    $("body").removeClass("game-over");}, 250);
    startOver();
  }
}

function nextSequence(){

 userClickedPattern = [];
level++;
$("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random()*4);
var randomChosenColour = buttonColours[randomNumber];
gamePattern.push(randomChosenColour);
$("#" + randomChosenColour).fadeOut(100).fadeIn(100);
playSound(randomChosenColour);

}


function playSound(colour) {
  var audio = new Audio("sounds/" + colour + ".mp3");
  audio.play();
}

function startOver(){
  level=0;
  gamePattern=[];
  started = false;
}

function animationPress(chosenColour){
  $("#"+ chosenColour).addClass("pressed");
  setTimeout(function() {
  $("#"+ chosenColour).removeClass("pressed");}, 100);
}
