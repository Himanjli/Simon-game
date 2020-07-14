var gamePattern = []
var userClickedPattern = []
var buttonColors = ["red", "blue", "green", "yellow"]
var level = 0

$(document).on("keydown", function(event) {
    if (event.keyCode == 32) {
        event.preventDefault();
    }
    if (level == 0) {
        nextSequence();
    }
});


function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomColorChooser = buttonColors[randomNumber];
    gamePattern.push(randomColorChooser);
    animate(randomColorChooser);
    playSound(randomColorChooser);
    userClickedPattern = [];
    $("h1").text("Level " + level);
    level++;

}


$("button").on("click", function(event) {
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    animate(userChosenColor);
    playSound(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
    // console.log(userClickedPattern);
});

function playSound(ran) {
    var audio = new Audio("sounds/" + ran + ".mp3");
    audio.play();
}

function animate(name) {
    $("#" + name).fadeOut(100).fadeIn(100);
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
        // console.log("success");
        // console.log(userClickedPattern);
        // console.log(gamePattern);
        if (userClickedPattern.length == gamePattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }

    } else {
        // console.log("failure");
        playSound("wrong");
        $("body").fadeOut(200).fadeIn(200);
        $("h1").text("Game Over!! Refresh the page or Press any key to restart.");
        var str = "Your high score is " + level - 1;
        // $("h2").text("Your high score is " + level - 1);
        level = 0;
        gamePattern = []
        userClickedPattern = []
    }
}