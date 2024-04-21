// ! Below I declare my variables ! //

const gameBoard = document.querySelector("#gameBoard"); 

const ctx = gameBoard.getContext("2d");  // getContext method. Explanation down below //

const scoreText = document.querySelector("#scoreText");

const resetBtn = document.querySelector("#resetBtn");

const gameWidth = gameBoard.width;

const gameHeight = gameBoard.height;

const boardBackground = "gray";

const snakeColour = "red";

const snakeBorder = "blue";

const foodColour = "orange";

const unitSize = 8;

let running = false;

let xVelocity = unitSize; 

let yVelocity = 0;

let foodX;
let foodY;

let score = 0;


// SNAKE BODY BELOW:
// // Each object is a body part of a snake, which has its own x and y coordinates //
// snake is an array of objects. It creates 5 body parts. START OF snake array. //

// This caused an error in the beginning - wrong order caused snake to not move and instant game over. Program did not recognize his body parts, I guess //

// let snake = [ 
//     {x:0, y:0},         
//     {x:unitSize, y:0}, 
//     {x:unitSize *2, y:0},
//     {x:unitSize *3, y:0},
//     {x:unitSize *4, y:0},

// Problem solved below:

let snake = [
    {x:unitSize * 4, y:0},
    {x:unitSize * 3, y:0},
    {x:unitSize * 2, y:0},
    {x:unitSize, y:0},
    {x:0, y:0}



]; // END of snake array. //


// ! Below I code event listeners ! //

window.addEventListener("keydown", changeDirection);

resetBtn.addEventListener("click", resetGame);




// ! Below I invoce function starting a game ! //

gameStart ();
// createFood();
// drawFood();


// ! Below I code functions needed ! //

function gameStart() {
    running = true;
    scoreText.textContent = score;
    createFood();
    drawFood();
    nextTick();
};


function nextTick() {
    if (running) {
        setTimeout(() => {
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();

        }, 75 )
    }
    else {
        displayGameOver();

    }
};

function clearBoard() {
    ctx.fillStyle = boardBackground;
    ctx.fillRect(0, 0, gameWidth, gameHeight);
};

function createFood() {
    function randomFood(min, max) {
        const randNum = Math.round((Math.random() * (max-min) + min) / unitSize) * unitSize;
        return randNum;

    }
    foodX = randomFood(0, gameWidth - unitSize);
    foodY = randomFood(0, gameHeight - unitSize);

    console.log(foodX)

};

function drawFood() {
    ctx.fillStyle = foodColour;
    ctx.fillRect(foodX, foodY, unitSize, unitSize);
};

function moveSnake() {
    const head = {x: snake[0].x + xVelocity,
                    y: snake[0].y + yVelocity};

            snake.unshift(head); //unshift method. Explanation below - last lines of the code //

            // if food was eaten //
            if (snake[0].x == foodX && snake[0].y == foodY ) {
                    score += 1;
                    scoreText.textContent = score;
                    createFood();
            }
            else {
                snake.pop()
            }
};

function drawSnake() {
    ctx.fillStyle = snakeColour;
    ctx.strokeStyle = snakeBorder;
    snake.forEach(snakePart => {
        ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
        ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);

        
        
    })
};

function changeDirection(event) {
    const keyPressed = event.keyCode;
    console.log(keyPressed);
    const LEFT = 37;
    const RIGHT = 39;
    const UP = 38;
    const DOWN = 40;

    const goingUp = (yVelocity == -unitSize);
    const goingDown = (yVelocity == unitSize);
    const goingLeft = (xVelocity == -unitSize);
    const goingRight = (xVelocity == unitSize);

    switch (true) {
        case(keyPressed == LEFT && !goingRight):
        xVelocity = -unitSize;
        yVelocity = 0;
        break;
        case(keyPressed == RIGHT && !goingLeft):
        xVelocity = unitSize;
        yVelocity = 0;
        break;
        case(keyPressed == UP && !goingDown):
        yVelocity = -unitSize;
        xVelocity = 0;
        break;
        case(keyPressed == DOWN && !goingUp):
        yVelocity = unitSize;
        xVelocity = 0;
        break;

    }
};

function checkGameOver() {
    switch(true) {
        case(snake[0].x < 0):
            running = false;
            break;
        case(snake[0].x >= gameWidth):
            running = false;
            break;  
        case(snake[0].y < 0):
            running = false;
            break;
        case(snake[0].y >= gameHeight ):
            running = false;
            break; 
    };
    for(let i = 1; i < snake.length; i += 1){
        if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
            running = false;
        };
    };
};

function displayGameOver() {
    ctx.font = "20px MV Boli";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER!", gameWidth / 2, gameHeight / 2);
    running = false;

};

function resetGame() {
    score = 0;
    xVelocity = unitSize;
    yVelocity = 0;
     snake = [
        {x:unitSize * 4, y:0},
        {x:unitSize * 3, y:0},
        {x:unitSize * 2, y:0},
        {x:unitSize, y:0},
        {x:0, y:0}
    
    
    ];
    gameStart();
};

// EXPLANATIONS: //

// // GetContext - A string containing the context identifier defining the drawing context associated to the canvas. Possible values are:

// "2d", leading to the creation of a CanvasRenderingContext2D object representing a two-dimensional rendering context.
// "webgl" (or "experimental-webgl") which will create a WebGLRenderingContext object representing a three-dimensional rendering context. This context is only available on browsers that implement WebGL version 1 (OpenGL ES 2.0).
// "webgl2" which will create a WebGL2RenderingContext object representing a three-dimensional rendering context. This context is only available on browsers that implement WebGL version 2 (OpenGL ES 3.0). Experimental
// "webgpu", which will create a GPUCanvasContext object representing a three-dimensional rendering context for WebGPU render pipelines. This context is only available on browsers that implement The WebGPU API.
// "bitmaprenderer" which will create an ImageBitmapRenderingContext which only provides functionality to replace the content of the canvas with a given ImageBitmap.




// // The unshift() method inserts the given values to the beginning of an array-like object.

// Array.prototype.push() has similar behavior to unshift(), but applied to the end of an array.

// Please note that, if multiple elements are passed as parameters, they're inserted in chunk at the beginning of the object, in the exact same order they were passed as parameters. Hence, calling unshift() with n arguments once, or calling it n times with 1 argument (with a loop, for example), don't yield the same results.

// See example:

// JS
// Copy to Clipboard
// let arr = [4, 5, 6];

// arr.unshift(1, 2, 3);
// console.log(arr);
// // [1, 2, 3, 4, 5, 6]

// arr = [4, 5, 6]; // resetting the array

// arr.unshift(1);
// arr.unshift(2);
// arr.unshift(3);

// console.log(arr);
// // [3, 2, 1, 4, 5, 6]
// The unshift() method is generic. It only expects the this value to have a length property and integer-keyed properties. Although strings are also array-like, this method is not 
// suitable to be applied on them, as strings are immutable. //

// Sources: 
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext


// !!! THIS CODE IS NOT MINE !!! //  It belongs to:  https://www.youtube.com/watch?v=Je0B3nHhKmM&ab_channel=BroCode  //  In the future I will alter it in my way // 