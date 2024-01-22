let canvas = document.createElement('canvas');
let context = canvas.getContext('2d');
canvas.id = 'snake-game';
document.body.appendChild(canvas);
canvas.width = 400;
canvas.height = 400;

let box = 25;
let snake = [];
snake[0] = { x: 10 * box, y: 10 * box };
let direction = "right";
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
};

let game = null;
let gameStarted = false;
let gameOver = false;
let score = 0;

function createBG() {
    context.fillStyle = "#6effee";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function createSnake() {
    for (let i = 0; i < snake.length; i++) {
        context.fillStyle = "#32a852";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function drawFood() {
    context.fillStyle = "#e31960";
    context.fillRect(food.x, food.y, box, box);
}

function drawScore() {
    context.fillStyle = "#002b26";
    context.font = "20px Arial";
    context.fillText("Score: " + score, box, box);
}

function update(event) {
    if (!gameStarted || gameOver) {
        if (event.keyCode == 13) {
            if (game) clearInterval(game);
            snake = [{ x: 10 * box, y: 10 * box }];
            direction = "right";
            score = 0;
            game = setInterval(startGame, 100);
            gameStarted = true;
            gameOver = false;
        }
    }

    if (gameStarted && !gameOver) {
        if (event.keyCode == 37 && direction != "right") direction = "left";
        if (event.keyCode == 38 && direction != "down") direction = "up";
        if (event.keyCode == 39 && direction != "left") direction = "right";
        if (event.keyCode == 40 && direction != "up") direction = "down";
    }
}

function startGame() {
    if (snake[0].x > 15 * box || snake[0].x < 0 || snake[0].y > 15 * box || snake[0].y < 0) {
        clearInterval(game);
        alert('Game Over!');
        gameStarted = false;
        gameOver = true;
    }

    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(game);
            alert('Game Over!');
            gameStarted = false;
            gameOver = true;
        }
    }

    createBG();
    createSnake();
    drawFood();
    drawScore();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction == "right") snakeX += box;
    if (direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if (direction == "down") snakeY += box;

    if (snakeX == food.x && snakeY == food.y) {
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
        score++;
    } else {
        snake.pop();
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    };

    snake.unshift(newHead);
}

document.addEventListener('keydown', update);
