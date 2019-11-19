// alert("YO dog i heard yo and yo dog like yoyos so i put yo dog in a yoyo so yo dog can yoyo while yo yoyos yo dog yo");

var userClickedPattern = [];
var gamePattern= [];
var buttonColours = ["red", "yellow", "green", "blue"];
var audioColourFile;
var audioColour;
var level =0;
var wrongSound = new Audio("sounds/wrong.mp3");
var body = $("body");
var alreadyWaiting = false;
var currentButton;


waitingForStartingKeyPress(true);


//issue with this is we can build up many event listners
//so if lots of gameOverResets lots of listners lots added to nextSequence
//could reset sequence in startGame
//or use a toggle so not mulitple listners

function waitingForStartingKeyPress(waitForKey){

if((waitForKey==true) && (alreadyWaiting ==false)){
alreadyWaiting =true;
  // console.log("adding event listner");
  $(document).on("keydown",
  function(){startGame();}
      );
}else if ((waitForKey == false)&&(alreadyWaiting==true)){
          $(document).off("keydown");
          alreadyWaiting=false;
          // console.log("removing event listner");
        }
}


$(".btn").on("click", function(){
//feel like this should be refactored out would i use an event so can keep the this
//or just pass the id

clickedButtonHandler($(this).attr("id"));

// var userChosenColour = $(this).attr("id");
// animatePress(userChosenColour);
// userClickedPattern.push(userChosenColour);
// playAudio(userChosenColour);
// console.log(userClickedPattern);
});

function clickedButtonHandler(colourId){
  userChosenColour=colourId;
  animatePress(userChosenColour);
  userClickedPattern.push(userChosenColour);
  playAudio(userChosenColour);
  // console.log("user clicked pattern = " + userClickedPattern);

  if(userClickedPattern.length>gamePattern.length){endGameReset();}
    else{
          for(var i = 0; i<userClickedPattern.length; i++){
              if(gamePattern[i]!=userClickedPattern[i]){endGameReset();}
                else{
 setTimeout(delayNextSequence(i),200);}
  }
}


}
function delayNextSequence(i) {

                   if(i==gamePattern.length-1){setTimeout(nextSequence(),1000);}}

function endGameReset(){

//reset
clearTimeout(delayNextSequence);
clearTimeout(nextSequence);
clearTimeout(removePressed);
userClickedPattern=[];
gamePattern=[];


level=0;
waitingForStartingKeyPress(true);
$("#level-title").text("GameOver Press A Key to Start");
//fx
wrongSound.play();

body.addClass("game-over");
setTimeout(function(){body.removeClass("game-over");},200);

}

function startGame(){
  $("h1").text("Level " + level);
  nextSequence();
  waitingForStartingKeyPress(false);

}


function playAudio(audioColour){
  audioColourFile = new Audio("sounds/" + audioColour + ".mp3");
  audioColourFile.play();
}



function nextSequence(){
userClickedPattern = [];

var random = Math.floor(Math.random()*4);
var randomChosenColour = buttonColours[random];
gamePattern.push(randomChosenColour);
// console.log("game Pattern = " +  gamePattern);


$("#" + randomChosenColour).fadeIn(50).fadeOut(50).fadeIn(50).fadeOut(50).fadeIn(50);
playAudio(randomChosenColour);
level++;
// console.log(level);
$("h1").text("Level " + level);
}
function removePressed(){currentButton.removeClass("pressed");}

function animatePress(currentColour){
currentButton = $("#"+currentColour);
currentButton.addClass("pressed");
setTimeout(removePressed(),200);


}

//working on this at moment
