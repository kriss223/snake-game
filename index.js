const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");


let s = new Snake();
let tileCount = 30;
let scl = Math.floor(canvas.width/tileCount);
let sclx = Math.floor(canvas.width/tileCount);
let scly = Math.floor(canvas.height/tileCount);

let speed = 11;

let score = 0;

let previousXspeed = 0;
let previousYspeed = 0;

function drawGame() {

    if (previousXspeed === 1 && s.xspeed === -1) {
        s.xspeed = previousXspeed;
    }
    if (previousXspeed === -1 && s.xspeed === 1) {
        s.xspeed = previousXspeed;
    }
    if (previousYspeed === 1 && s.yspeed === -1) {
        s.yspeed = previousYspeed;
    }
    if (previousYspeed === -1 && s.yspeed === 1) {
        s.yspeed = previousYspeed;
    }
    
    previousXspeed = s.xspeed;
    previousYspeed = s.yspeed;
    
    s.update();
    
    let result = isGameOver();
    if (result) {
        return;
    }


    clearScreen();
    s.apple();
    
    s.show();
    drawScore();

    setTimeout(drawGame, 1000 / speed)
}

function isGameOver() {
    let gameOver = false;
    if (s.x < 0 || s.x >= tileCount) {
        gameOver = true
    } else if (s.y < 0 || s.y >= tileCount) {
        gameOver = true
    }

    for (let i = 0; i < s.snakeParts.length; i++) {
        let part = s.snakeParts[i];
        if (s.xspeed === 0 && s.yspeed === 0) {
            return;
        }
        if (part.x === s.x && part.y === s.y) {
            gameOver = true;
        }
    }

    if (gameOver) {
        ctx.font = "70px Verdana";
        let gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop("0", "magenta");
        gradient.addColorStop("0.5", "blue");
        gradient.addColorStop("1.0", "red");
        ctx.fillStyle = gradient;

        ctx.fillText("Game Over!", canvas.width/6.5, canvas.height/2)
        ctx.fillText("You score: " + score, canvas.width/6.5, canvas.height/1.6)

    }

    return gameOver;
}



function drawScore() {
    ctx.fillStyle = "white";
    ctx.font = "12px verdana";
    ctx.fillText("Score: " + score, canvas.width-70, 15);
}



document.addEventListener("keydown", keyDown);

function keyDown(event) {
    switch (event.key) {
        case "ArrowUp":
            s.dir(0,-1)
            break;
        case "ArrowDown":
            s.dir(0,1)
            break;
        case "ArrowRight":
            s.dir(1,0)
            break;
        case "ArrowLeft":
            s.dir(-1,0)
            break;
        default:
            break;
    }
}


function clearScreen() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

drawGame();