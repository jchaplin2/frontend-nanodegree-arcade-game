// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    this.x = x;
    this.y = y;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    this.speed = Math.floor((Math.random()*1200));
    //TODO: change speed for easy, medium, hard
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += (this.speed*dt); 
    this.render();    
    if(this.x === player.x && this.y === player.y) {
        ctx.clearRect(0,0,505,606);
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
    var movementIncrement = 100;

    this.update = function() {

    };
    this.updateLocation = function(xCoord, yCoord) { 
        if(xCoord < -10 || xCoord > 430)
            return;
        if(yCoord < -10 || yCoord > 420)
            return;

        this.x = xCoord;
        this.y = yCoord;
    };
    this.handleInput = function(keyDirection) {
        console.log("handle input");
        if(keyDirection === "left") {
            var xCoord = (this.x - movementIncrement);
            this.updateLocation(xCoord, this.y);
        } else if(keyDirection === "up") {
            var yCoord = this.y - movementIncrement;
            this.updateLocation(this.x, yCoord);
        } else if(keyDirection === "right") {
            var xCoord = (this.x + movementIncrement);
            this.updateLocation(xCoord, this.y);
        } else if(keyDirection === "down") {
            var yCoord = this.y + movementIncrement;
            this.updateLocation(this.x, yCoord);
        }

        this.render();
    };
    this.render = function() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        //ctx.clearRect(0,0,505,606);
    };
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies

var allEnemies = [new Enemy(0, 0, 100), new Enemy(0, 100, 50), new Enemy(0, 200, 150)];
function pushThreeEnemies(){
    allEnemies.push(new Enemy(0, 0, 100));
    allEnemies.push(new Enemy(0, 100, 50));
    allEnemies.push(new Enemy(0, 200, 150));
}

window.setInterval(pushThreeEnemies, 3000);

// Place the player object in a variable called player
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
function keyHandler(eventObject) {
    var eventObject = window.event;
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    var keyDirection = allowedKeys[eventObject.keyCode];
    if(!keyDirection)
        return;

    player.handleInput(keyDirection);
}

window.document.addEventListener('keyup', keyHandler);
