buttonColours = ["red", "blue", "green", "yellow"];

gamePattern = [];
userClickedPattern = [];

var started = false;
var level = 0;

function playSound(name){
    sound = new Audio("./sounds/" + name + ".mp3");
    sound.play();
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    let number = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[number];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeIn(100);
    playSound(randomChosenColour);
}

function animatePress(buttonColour){
    $("#"+buttonColour).addClass("pressed");

    setTimeout(function(){
        $("#"+buttonColour).removeClass("pressed");
    }, 100);
}

function gameOver(){
    level = 0;
    started = false;
    gamePattern = [];
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel])
    {
        if(gamePattern.length === userClickedPattern.length)
        {
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }
    else
    {
        playSound("wrong.mp3");
        $("body").addClass("game-over");

        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        gameOver();

    }

}

$(document).keydown(function(){
    if(!started)
    {
        nextSequence();
        started = true;
    }
});

$(".btn").click(function(){
    if(started){
        var userChosenColour = $(this).attr("id");
        
        userClickedPattern.push(userChosenColour);

        playSound(userChosenColour);
        animatePress(userChosenColour);

        checkAnswer(userClickedPattern.length-1);
    }
});