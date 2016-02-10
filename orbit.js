// Now some basic canvas stuff. Here we'll make a variable for the canvas and then initialize its 2d context for drawing
var canvas = document.getElementById("canvas"),
		ctx = canvas.getContext("2d");

// Now setting the width and height of the canvas
	var W = 600,
		H = 600;

// Applying these to the canvas element
canvas.height = H; canvas.width = W;

// First of all we'll create a ball object which will contain all the methods and variables specific to the ball.
// Lets define some variables first

var ball = {},
		gravity = 0.2,
		bounceFactor = 0.7;


function ballCreate(xpos, ypos, xvelo, yvelo, size){

// The ball object
// It will contain the following details
// 1) Its x and y position
// 2) Radius and color
// 3) Velocity vectors
// 4) the method to draw or paint it on the canvas

	this.x = W * xpos;
	this.y = H * ypos;
	this.radius = size*2;
	this.mass = size/50;
	if(size < .2)
	{	this.color = "red";}
	else if(size < .4)
	{	this.color = "white";}
	else if(size < .6)
	{	this.color = "yellow";}
	else if(size < .8)
	{	this.color = "orange";}
	else
	{	this.color = "blue";}

	
	// Velocity components
	this.vx = -.1 + (xvelo * .2);
	this.vy = -.1 + (yvelo * .2);
	
	this.draw = draw;
	this.movement = movement;
	this.interact = interact;
	
	function draw() {
		// Here, we'll first begin drawing the path and then use the arc() function to draw the circle. The arc function accepts 6 parameters, x position, y position, radius, start angle, end angle and a boolean for anti-clockwise direction.
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.closePath();
	}
		

	function movement(){

	//actual movement component
	this.y += this.vy;
	this.x += this.vx;
 
	}
	
	function interact(ball2) {
		
		
		var dx = (this.x + this.radius) - (ball2.x + ball2.radius);
		var dy = (this.y + this.radius) - (ball2.y + ball2.radius);
		var distance = Math.sqrt(dx * dx + dy * dy);

		// Gravity effect
		var gravity = Math.sqrt((this.mass + ball2.mass)/(distance * distance));
		//var xgrav = gravity * (dx / (dx + dy));
		//var ygrav = gravity * (dy / (dx + dy));
		var xgrav = (this.mass + ball2.mass)/distance;
		var ygrav = (this.mass + ball2.mass)/distance;

		if (this.x > ball2.x)
		{
			this.vx -= xgrav;
		}

		if (this.x < ball2.x)
		{
			this.vx += xgrav;
		}

		if (this.y > ball2.y)
		{
			this.vy -= ygrav;
		}

		if (this.y < ball2.y)
		{
			this.vy += ygrav;
		}


		// Here we check if 2 balls are colliding
		
		if ((distance < this.radius + ball2.radius)) {

			this.y -= ball2.vy;
			this.x -= ball2.vx;
			ball2.y -= this.vy;
			ball2.x -= this.vx;

			var temp1 = this.vy;
			var temp2 = this.vx;
			this.yv = -ball2.vy;
			this.xv = -ball2.vx;
			ball2.vy = -temp1;
			ball2.vx = -temp2;
			
		}
	}
		
};


//create the balls
var balls = [];

for( var i = 0; i < 110; i++)
{
	balls.push(new ballCreate(Math.random(), Math.random(), Math.random(), Math.random(), Math.random()/5));
}

for( var i = 0; i < 110; i++)
{
	balls.push(new ballCreate(Math.random(), Math.random(), Math.random(), Math.random(), Math.random()/3));
}

for( var i = 0; i < 30; i++)
{
	balls.push(new ballCreate(Math.random(), Math.random(), Math.random(), Math.random(), Math.random()));
}

// When we do animations in canvas, we have to repaint the whole canvas in each frame. Either clear the whole area or paint it with some color. This helps in keeping the area clean without any repetition mess.
// So, lets create a function that will do it for us.
function clearCanvas() {
	ctx.clearRect(0, 0, W, H);
}

// A function that will update the position of the ball is also needed. Lets create one
function update() {
	clearCanvas();
	for( var i = 0; i < balls.length; i++)
	{
		for( var j = 0; j < balls.length; j++)
		{	
			if(i !== j)
			{
				balls[i].interact(balls[j]);
			}
		}
		balls[i].movement();
		balls[i].draw();
	// Now, lets make the ball move by adding the velocity vectors to its position

	}
}

// Now, the animation time!
// in setInterval, 1000/x depicts x fps! So, in this case, we are aiming for 60fps for smoother animations.
setInterval(update, 1000/60);

