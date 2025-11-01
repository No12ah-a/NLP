# Flappy Bird Game

A classic Flappy Bird game implementation using HTML5 Canvas, CSS, and vanilla JavaScript.

## 🎮 Game Features

- **Smooth physics**: Realistic gravity and jump mechanics
- **Dynamic obstacles**: Randomly generated pipes with varying heights
- **Score tracking**: Keep track of your current score and best score (stored in localStorage)
- **Responsive design**: Beautiful gradient UI that works on different screen sizes
- **Game states**: Start screen, gameplay, and game over states
- **Visual elements**: Colorful bird with eye and beak, green pipes with caps, sky and ground

## 🕹️ How to Play

1. **Open the game**: Open `flappy-bird.html` in any modern web browser
2. **Start playing**: Press `SPACE` key or click anywhere on the canvas to start
3. **Stay alive**: Press `SPACE` or click to make the bird jump and avoid the pipes
4. **Score points**: Successfully pass through pipes to increase your score
5. **Game over**: Hit a pipe or the ground and the game ends
6. **Restart**: Click the "Restart Game" button to play again

## 📁 File Structure

```
flappy-bird.html    - Main HTML file with game structure
flappy-bird.css     - Stylesheet for game appearance
flappy-bird.js      - Game logic and mechanics
```

## 🚀 Running the Game

### Option 1: Direct Browser Access
Simply open `flappy-bird.html` in your web browser by double-clicking it.

### Option 2: Local Server (Recommended)
For better performance and to avoid CORS issues:

```bash
# Using Python 3
python3 -m http.server 8000

# Then navigate to:
# http://localhost:8000/flappy-bird.html
```

## 🎯 Game Mechanics

- **Bird**: Golden bird with gravity physics
- **Pipes**: Green pipes that move from right to left
- **Collision**: Game ends when bird hits a pipe or falls to the ground
- **Scoring**: +1 point for each pipe successfully passed
- **Best Score**: Automatically saved in browser's localStorage

## 🎨 Visual Design

- **Color Scheme**: Purple gradient background, sky blue canvas, green pipes
- **Modern UI**: Rounded corners, shadows, and smooth animations
- **Responsive**: Adapts to different screen sizes with media queries

## 🔧 Technical Details

- **Canvas Size**: 400x600 pixels
- **Frame Rate**: 60 FPS (using requestAnimationFrame)
- **Pipe Gap**: 150 pixels
- **Pipe Frequency**: New pipe every 90 frames (~1.5 seconds)
- **Gravity**: 0.5 pixels/frame²
- **Jump Strength**: -9 pixels/frame

## 📸 Screenshots

### Start Screen
![Start Screen](https://github.com/user-attachments/assets/f1724625-c2ad-4bc7-9b54-18bcf0dfb436)

### Game Over
![Game Over](https://github.com/user-attachments/assets/bc7182da-710c-45c4-a6ee-7255e5981813)

## 🌟 Features Implemented

- ✅ Bird physics (gravity, jump)
- ✅ Pipe generation and movement
- ✅ Collision detection
- ✅ Score tracking with localStorage
- ✅ Game state management
- ✅ Restart functionality
- ✅ Keyboard and mouse controls
- ✅ Visual feedback and UI polish

## 🎓 Code Structure

The game is organized into clear sections:
- **Game variables**: State management and configuration
- **Bird object**: Properties and methods for bird behavior
- **Pipe system**: Generation, movement, and rendering
- **Collision detection**: Accurate hit detection
- **Game loop**: Main rendering and update cycle
- **Event handlers**: User input processing

## 🔮 Future Enhancements

Possible improvements:
- Add sound effects
- Include power-ups
- Add difficulty levels
- Mobile touch controls optimization
- Leaderboard system
- Animation effects on collision

## 📝 License

This is a learning project and demonstration of game development with vanilla JavaScript.

---

Enjoy playing Flappy Bird! 🐦
