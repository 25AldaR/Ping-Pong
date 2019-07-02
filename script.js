var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var startBtn = document.getElementById("startBtn");

startBtn.onclick = function () { 
    startBtn.style.display = "none"
    // create a new instance of the function Paddle
    paddle1 = new Paddle (10)
    paddle2 = new Paddle (970)  
    ball = new Ball()
    window.requestAnimationFrame(draw)
}



// Create the ball with its properties then part resp for the spped and direction
function Ball() {
    this.color = "green";
    this.x = canvas.width /2;
    this.y = canvas.height / 2;
    this.ballRadius = 10;

    this.dy = 5.5;
    this.dx = 5.5;
}

// Circles have three parts : begin path, arc, and ...

Ball.prototype.drawBall = function() {
ctx.fillStyle = this.color
ctx.beginPath();
ctx.arc (this.x, this.y, this.ballRadius, 0, Math.PI * 2, true)
ctx.fill()  
}


Ball.prototype.checkBorder = function() {
    if (this.y + ball.dy > canvas.height- this.ballRadius

        // OR
        ||
        
        // can only test once the paddles are moving
        this.y  + this.dy < ball.ballRadius)
        {
        // we want to change the direction on the y axes
        this.dy = - this.dy ;
    }
}

//
Paddle.prototype.hitPaddleTwo = function() {
    if (ball.x < paddle2.x + paddle2.width 
    &&
    ball.x + ball.dx > paddle2.x
    &&
    ball.y < paddle2.y + paddle2.height
    &&
    ball.y + ball.dy > paddle2.y)
    {
        ball.dx = -ball.dx
    }
}

Paddle.prototype.hitPaddleOne = function() {
    if (ball.x < paddle1.x + paddle1.width 
    &&
    ball.x + ball.dx > paddle1.x
    &&
    ball.y < paddle1.y + paddle1.height
    &&
    ball.y + ball.dy > paddle1.y)
    {
        ball.dx = -ball.dx
    }
}
// between the paddles the x coordinate is the only one that is going to change
// when the game starts both paddles are at the same level on the x coordinate
// the function Paddle contains info that u can manipulate
function Paddle(x) {
    this.color = "blue";
    this.x = x;
    this.y = canvas.height / 2;
    this.width = 20;
    this.height = 120;
}
// console log you get a function
// when we are drawing the paddle we are taking the data from Paddle


Paddle.prototype.drawPaddle = function (){
ctx.fillStyle = this.color;
ctx.fillRect(this.x, this.y, this.width,this.height)

}

Ball.prototype.checkLeftAndRight= function() {
if (ball.x > canvas.width + 2 * ball.ballRadius
    
    || ball.x < - 2 * ball.ballRadius)
{return true}
}


//draw the paddles
function draw () {
    console.log("drawing")
// clear the canvas on each frame
    ctx.clearRect(0,0,canvas.width, canvas.height)
    paddle1.drawPaddle()
    paddle2.drawPaddle()
    ball.drawBall()
//every time we call we add the position of the new movement to the ball
    ball.x += ball.dx
    ball.y += ball.dy

    ball.checkBorder ()

    
    paddle2.hitPaddleTwo ()
    paddle1.hitPaddleOne ()
    
    if  (ball.checkLeftAndRight () === true) {
    restart.style.display = "inline"}
   
    window.requestAnimationFrame(draw)
}

//create another function that is gona be for the arrow keys
// nice website keycode.info to get some code

function keyDownHandler () {

    if (event.key === "z") {
    paddle1.y -= 50}

        else if (event.key === "s"){
        paddle1.y += 50}
        else if (event.key === "ArrowUp"){
        paddle2.y -= 50}
        else if (event.key === "ArrowDown"){
        paddle2.y += 50}
    }

document.onkeydown = keyDownHandler
