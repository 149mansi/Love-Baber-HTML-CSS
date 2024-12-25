const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game settings
const gridSize = 20;
const boardSize = 400;
const initialSnakeLength = 3;

// Snake and food state
let snake = [{ x: 160, y: 200 }, { x: 140, y: 200 }, { x: 120, y: 200 }];
let food = { x: 200, y: 200 };
let dx = gridSize; // initial movement direction
let dy = 0;
let isGameOver = false;

// Draw the snake
function drawSnake() {
    ctx.fillStyle = 'green';
    snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
    });
}

// Draw the food
function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, gridSize, gridSize);
}

// Update game state
function updateGame() {
    if (isGameOver) {
        alert('Game Over!');
        document.location.reload();
        return;
    }

    // Move snake by updating head position
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    // Check if snake eats food
    if (head.x === food.x && head.y === food.y) {
        generateFood();
    } else {
        snake.pop(); // remove last segment if no food is eaten
    }

    // Collision with wall
    if (head.x < 0 || head.x >= boardSize || head.y < 0 || head.y >= boardSize) {
        isGameOver = true;
    }

    // Collision with itself
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            isGameOver = true;
        }
    }
}

// Generate new food at random position
function generateFood() {
    food = {
        x: Math.floor(Math.random() * (boardSize / gridSize)) * gridSize,
        y: Math.floor(Math.random() * (boardSize / gridSize)) * gridSize
    };
}

// Draw everything
function draw() {
    ctx.clearRect(0, 0, boardSize, boardSize);
    drawSnake();
    drawFood();
}

// Control snake movement
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp' && dy === 0) {
        dx = 0;
        dy = -gridSize;
    } else if (event.key === 'ArrowDown' && dy === 0) {
        dx = 0;
        dy = gridSize;
    } else if (event.key === 'ArrowLeft' && dx === 0) {
        dx = -gridSize;
        dy = 0;
    } else if (event.key === 'ArrowRight' && dx === 0) {
        dx = gridSize;
        dy = 0;
    }
});

// Main game loop
function gameLoop() {
    updateGame();
    draw();
    setTimeout(gameLoop, 100); // Refresh every 100 ms
}

gameLoop();
