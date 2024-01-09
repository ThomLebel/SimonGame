var currentLevel = 0;
var buttonList = [];
var pressedButtonIndex = 0;

$(".btn").click(check_button);

$(document).keypress(function () {
    if (currentLevel == 0) {
        setTimeout(game, 200);
    }
});


function game() {
    currentLevel++;
    $("h1").text("Level " + currentLevel);

    var buttons = document.getElementsByClassName("btn");
    var new_button = buttons[ (Math.floor(Math.random() * buttons.length)) ];
    buttonList.push(new_button.id);

    playSound(new_button.id);

    $(new_button).fadeOut(100).fadeIn(100);
}


function check_button(event) {
    if (currentLevel == 0) {
        return;
    }

    $(event.target).addClass("pressed").delay(100).queue(function () {
        $(event.target).removeClass("pressed").dequeue();
    });

    playSound(event.target.id);

    if (event.target.id == buttonList[ pressedButtonIndex ]) {
        pressedButtonIndex++;

        if (pressedButtonIndex == buttonList.length) {
            setTimeout(nextLevel, 400);
        }
    } else {
        gameOver();
    }
}


function nextLevel() {
    pressedButtonIndex = 0;
    game();
}


function gameOver() {
    playSound("wrong");
    $('body').addClass("game-over").delay(100).queue(function () {
        $('body').removeClass("game-over").dequeue();
    });
    $("h1").text("Game Over, Press Any Key to Restart");
    currentLevel = 0;
}

function playSound(sound) {
    var audio = new Audio("./sounds/" + sound + ".mp3");
    audio.play();
}