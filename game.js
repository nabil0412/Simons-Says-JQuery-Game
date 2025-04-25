gamePattern = []
userPattern = []

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  }

function animatePress(currentColor) {
    $("." + currentColor).addClass("pressed");
    setTimeout(function() {
      $("." + currentColor).removeClass("pressed");
    }, 75);
  }


function nextSequence(){

    userPattern = []

    $("h1").text("Level " + level)
    level++;
    
    var num = Math.random()*4;
    num = Math.floor(num)

    var colors = ["green","red","yellow","blue"];
    var chosenColour = colors[num];
    gamePattern.push(chosenColour)

    animatePress(chosenColour)
    playSound(chosenColour)
}

function displayLoss(){

    playSound("wrong")

    $("body").addClass("game-over")
    $("h1").text("Game Over, Press Any Key to Restart")
    setTimeout(function() {
        $("body").removeClass("game-over")
    }, 100);

    userPattern = []
    gamePattern = []
    started = false;
    level = 1;

}

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userPattern[currentLevel]) {
      if (userPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }

    }else{
      console.log("wrong");
      displayLoss();
    }

}




var started = false;
level = 1;
$(document).on("keydown",function(){
    if(started == false){
        firstPress = true;
        nextSequence();
    }
})

$(".btn").click(function() {

    var chosenColour = $(this).attr("id");
    userPattern.push(chosenColour);
  
    playSound(chosenColour);
    animatePress(chosenColour);
  
    checkAnswer(userPattern.length-1);
  });


