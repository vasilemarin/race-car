const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

let car = new Image();
let road = new Image();
let coin = new Image();
let bomb = new Image();
let boom = new Image();

car.src = "images/car.png";
road.src = "images/road.png";
coin.src = "images/coin.png";
bomb.src = "images/bomb.png";
boom.src = "images/boom.png";

let score = 0;
let carX = 100;
let carY = 412;
let roadX = 0;
let roadY = 0;
let carStatus = true;
let rightPressed = false;
let leftPressed = false;
let forthPressed = false;
let backPressed = false;

let positions = [30, 125, 220];

let coins = [];
coins[0] = {
    x: positions[Math.floor(Math.random() * 3)],
    y: 0,
    status: true
};

let bombs = [];
bombs[0] = {
    x: positions[Math.floor(Math.random() * 3)],
    y: 0,
    status: true
};

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    } else if (e.key == "Up" || e.key == "ArrowUp") {
        forthPressed = true;
    } else if (e.key == "Down" || e.key == "ArrowDown") {
        backPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }  else if (e.key == "Up" || e.key == "ArrowUp") {
        forthPressed = false;
    } else if (e.key == "Down" || e.key == "ArrowDown") {
        backPressed = false;
    }
}

function coinCollision() {
    for (let i = 0; i < coins.length; i++) {
        if (coins[i].status) {
            if (carX + 45 >= coins[i].x && carX <= coins[i].x + 30 && coins[i].y == carY) {
                coins[i].status = false;
                score++;
            }
        }
    }
}

function bombCollision() {
    for (let i = 0; i < bombs.length; i++) {
        if (bombs[i].status) {
            if (carX + 45 >= bombs[i].x && carX <= bombs[i].x + 15 && (bombs[i].y >= carY && bombs[i].y < carY + 100)) {
                bombs[i].status = false;
                c.drawImage(boom, carX, carY, 100, 100);
                alert("BOOMM");
                document.location.reload(); 
            }
        }
    }
}

function drawCoin() {
    for (let i = 0; i < coins.length; i++) {
        if (coins[i].status) {
            c.drawImage(coin, coins[i].x, coins[i].y, 30, 30);
            coins[i].y+=2;

            if (coins[i].y == 60) {
                coins.push({
                    x: positions[Math.floor(Math.random() * 3)],
                    y: 0,
                    status: true
                });
            }
        }
    }
}

function drawBomb() {
    for (let i = 0; i < bombs.length; i++) {
        if (bombs[i].status) {
            c.drawImage(bomb, bombs[i].x, bombs[i].y, 40, 40);
            bombs[i].y+=4;

            if (bombs[i].y == 80) {
                bombs.push({
                    x: positions[Math.floor(Math.random() * 3)],
                    y: 0,
                    status: true
                });
            }
        }
    }
}

function drawScore() {
    c.font = "16px Arial";
    c.fillStyle = "black";
    c.fillText("Score: "+score, 8, 20);
}

function drawBackground() {
    roadY+=2;
    c.drawImage(road, roadX, roadY, 288, 512);
    c.drawImage(road, roadX, roadY - canvas.height, 288, 512);

    if (roadY >= canvas.height)
        roadY = 0;
}

function drawCar() {
    c.drawImage(car, carX, carY, 90, 100);
}

function draw() {

    drawBackground();
    drawCar();
    coinCollision();
    bombCollision();
    drawBomb();
    drawCoin();
    drawScore();

    if (rightPressed && carX < canvas.width - 90)
        carX += 5;
    
    else if (leftPressed && carX > 0)
        carX -= 5;

    else if (forthPressed && carY > 0)
        carY -= 5;
    
    else if (backPressed && carY < canvas.height - 100)
        carY += 5;

    if (score >= 30) {
        alert("YOU WIN");
        document.location.reload(); 
    }


    requestAnimationFrame(draw);
}

draw();
