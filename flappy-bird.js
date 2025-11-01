// Get canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const bestElement = document.getElementById('best');
const instructionsElement = document.getElementById('instructions');
const restartBtn = document.getElementById('restartBtn');

// Game variables
let gameState = 'start'; // start, playing, gameover
let score = 0;
let bestScore = localStorage.getItem('flappyBirdBest') || 0;
bestElement.textContent = bestScore;

// Bird properties
const bird = {
    x: 80,
    y: canvas.height / 2,
    radius: 15,
    velocity: 0,
    gravity: 0.5,
    jumpStrength: -9,
    color: '#FFD700',
    
    draw() {
        // Draw bird body
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw bird eye
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(this.x + 5, this.y - 3, 4, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(this.x + 6, this.y - 3, 2, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw beak
        ctx.fillStyle = '#FF6347';
        ctx.beginPath();
        ctx.moveTo(this.x + this.radius, this.y);
        ctx.lineTo(this.x + this.radius + 8, this.y - 3);
        ctx.lineTo(this.x + this.radius + 8, this.y + 3);
        ctx.closePath();
        ctx.fill();
    },
    
    update() {
        this.velocity += this.gravity;
        this.y += this.velocity;
        
        // Prevent bird from going above canvas
        if (this.y - this.radius < 0) {
            this.y = this.radius;
            this.velocity = 0;
        }
        
        // Check if bird hit ground
        if (this.y + this.radius > canvas.height) {
            this.y = canvas.height - this.radius;
            this.velocity = 0;
            if (gameState === 'playing') {
                gameOver();
            }
        }
    },
    
    jump() {
        this.velocity = this.jumpStrength;
    },
    
    reset() {
        this.y = canvas.height / 2;
        this.velocity = 0;
    }
};

// Pipe properties
const pipes = [];
const pipeWidth = 60;
const pipeGap = 150;
let frameCount = 0;
const pipeFrequency = 90; // frames between pipes

function createPipe() {
    const minHeight = 50;
    const maxHeight = canvas.height - pipeGap - 100;
    const topHeight = Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight;
    
    pipes.push({
        x: canvas.width,
        topHeight: topHeight,
        bottomY: topHeight + pipeGap,
        width: pipeWidth,
        passed: false
    });
}

function drawPipes() {
    pipes.forEach(pipe => {
        // Top pipe
        ctx.fillStyle = '#228B22';
        ctx.fillRect(pipe.x, 0, pipe.width, pipe.topHeight);
        ctx.strokeStyle = '#1a6b1a';
        ctx.lineWidth = 3;
        ctx.strokeRect(pipe.x, 0, pipe.width, pipe.topHeight);
        
        // Pipe cap (top)
        ctx.fillStyle = '#32CD32';
        ctx.fillRect(pipe.x - 5, pipe.topHeight - 20, pipe.width + 10, 20);
        ctx.strokeRect(pipe.x - 5, pipe.topHeight - 20, pipe.width + 10, 20);
        
        // Bottom pipe
        ctx.fillStyle = '#228B22';
        ctx.fillRect(pipe.x, pipe.bottomY, pipe.width, canvas.height - pipe.bottomY);
        ctx.strokeRect(pipe.x, pipe.bottomY, pipe.width, canvas.height - pipe.bottomY);
        
        // Pipe cap (bottom)
        ctx.fillStyle = '#32CD32';
        ctx.fillRect(pipe.x - 5, pipe.bottomY, pipe.width + 10, 20);
        ctx.strokeRect(pipe.x - 5, pipe.bottomY, pipe.width + 10, 20);
    });
}

function updatePipes() {
    // Move pipes
    pipes.forEach((pipe, index) => {
        pipe.x -= 3;
        
        // Check if bird passed pipe
        if (!pipe.passed && pipe.x + pipe.width < bird.x - bird.radius) {
            pipe.passed = true;
            score++;
            scoreElement.textContent = score;
        }
        
        // Remove pipes that are off screen
        if (pipe.x + pipe.width < 0) {
            pipes.splice(index, 1);
        }
    });
    
    // Create new pipes
    frameCount++;
    if (frameCount % pipeFrequency === 0) {
        createPipe();
    }
}

function checkCollision() {
    for (let pipe of pipes) {
        // Check if bird is in pipe's x range
        if (bird.x + bird.radius > pipe.x && bird.x - bird.radius < pipe.x + pipe.width) {
            // Check if bird hit top or bottom pipe
            if (bird.y - bird.radius < pipe.topHeight || bird.y + bird.radius > pipe.bottomY) {
                return true;
            }
        }
    }
    return false;
}

function drawBackground() {
    // Sky
    const skyGradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 0.7);
    skyGradient.addColorStop(0, '#87CEEB');
    skyGradient.addColorStop(1, '#B0E2FF');
    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height * 0.7);
    
    // Ground
    ctx.fillStyle = '#90EE90';
    ctx.fillRect(0, canvas.height * 0.7, canvas.width, canvas.height * 0.3);
    
    // Ground detail
    ctx.fillStyle = '#7CCD7C';
    for (let i = 0; i < canvas.width; i += 20) {
        ctx.fillRect(i, canvas.height * 0.7, 10, canvas.height * 0.3);
    }
}

function drawStartScreen() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = 'white';
    ctx.font = 'bold 30px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Flappy Bird', canvas.width / 2, canvas.height / 2 - 50);
    
    ctx.font = '20px Arial';
    ctx.fillText('Press SPACE or Click', canvas.width / 2, canvas.height / 2);
    ctx.fillText('to Start', canvas.width / 2, canvas.height / 2 + 30);
}

function drawGameOver() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#FF6347';
    ctx.font = 'bold 40px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Game Over!', canvas.width / 2, canvas.height / 2 - 60);
    
    ctx.fillStyle = 'white';
    ctx.font = '24px Arial';
    ctx.fillText(`Score: ${score}`, canvas.width / 2, canvas.height / 2 - 10);
    ctx.fillText(`Best: ${bestScore}`, canvas.width / 2, canvas.height / 2 + 25);
    
    ctx.font = '18px Arial';
    ctx.fillText('Click Restart to play again', canvas.width / 2, canvas.height / 2 + 70);
}

function gameLoop() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw background
    drawBackground();
    
    if (gameState === 'playing') {
        // Update game objects
        bird.update();
        updatePipes();
        
        // Draw game objects
        drawPipes();
        bird.draw();
        
        // Check collision
        if (checkCollision()) {
            gameOver();
        }
    } else if (gameState === 'start') {
        // Draw bird in starting position
        bird.draw();
        drawStartScreen();
    } else if (gameState === 'gameover') {
        // Draw final frame
        drawPipes();
        bird.draw();
        drawGameOver();
    }
    
    requestAnimationFrame(gameLoop);
}

function startGame() {
    if (gameState === 'start') {
        gameState = 'playing';
        instructionsElement.style.display = 'none';
        bird.jump();
    }
}

function gameOver() {
    gameState = 'gameover';
    restartBtn.style.display = 'block';
    instructionsElement.style.display = 'none';
    
    // Update best score
    if (score > bestScore) {
        bestScore = score;
        localStorage.setItem('flappyBirdBest', bestScore);
        bestElement.textContent = bestScore;
    }
}

function restartGame() {
    gameState = 'start';
    score = 0;
    frameCount = 0;
    pipes.length = 0;
    bird.reset();
    scoreElement.textContent = score;
    restartBtn.style.display = 'none';
    instructionsElement.style.display = 'block';
}

// Event listeners
canvas.addEventListener('click', () => {
    if (gameState === 'start') {
        startGame();
    } else if (gameState === 'playing') {
        bird.jump();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault();
        if (gameState === 'start') {
            startGame();
        } else if (gameState === 'playing') {
            bird.jump();
        }
    }
});

restartBtn.addEventListener('click', restartGame);

// Start game loop
gameLoop();
