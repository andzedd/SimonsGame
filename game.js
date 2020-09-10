var buttonColours = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var userPattern = [];
var started = false;
var level = 0;

function nextSequence(){
    var randomNumber = Math.floor(Math.random() * 4);
    var colour = buttonColours[randomNumber];

    userPattern = [];
    gamePattern.push(colour);
    level++;
    $("#level-title").text("Level " + level);

    $("."+colour).fadeOut(120).fadeIn(120);
    playSound(colour);
    console.log("game: " + gamePattern);
}

$(document).on("keypress", function(){
    if(!started){
        nextSequence();
        started = true;
    }
});

function playSound(sound){
    var audio = new Audio('sounds/' + sound + '.mp3');
    audio.play();
}

$(".btn").click(function(){
    var userColour = $(this).attr("id");
    userPattern.push(userColour);
    playSound(userColour)
    $("#"+userColour).addClass("pressed");
    setTimeout(function(){
        $("#"+userColour).removeClass("pressed");
    }, 100);
    checkAnswer(userPattern.length - 1);
});

function checkAnswer(currentLevel){
    if(userPattern[currentLevel] === gamePattern[currentLevel]){
        if(userPattern.length === gamePattern.length){
            console.log("Continua");
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
  
        setTimeout(function () {
          $("body").removeClass("game-over");
        }, 200);
  
        restartGame();
    }
}

function gameOver(){
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    restartGame();
    setTimeout(function(){
        $("body").removeClass("game-over");
    }, 200);
    playSound("wrong");
}

function restartGame(){
    gamePattern = [];
    started = false;
    level = 0;
}