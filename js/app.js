// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    this.x = x;
    this.y = y;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    this.boxWidth = 98;
    this.boxHeight = 67;

    this.speed = Math.floor((Math.random()*1000));
    //TODO: change speed for easy, medium, hard

    this.hitbox = {x:this.x, y:this.y, width:this.boxWidth, height:this.boxHeight};
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += (this.speed*dt); 
    this.makeHitBox();
    this.render();
};

Enemy.prototype.makeHitBox = function(){
    this.hitbox.x = this.x;
    this.hitbox.y = this.y+77;
};

Enemy.prototype.drawHitBox = function (x, y, width, height, color) {
    //this function puts the hitbox on the screen
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.lineWidth = 1;
    ctx.strokeStyle = color;
    ctx.stroke();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    this.drawHitBox(this.hitbox.x, this.y+77, this.boxWidth, this.boxHeight, "transparent");
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    this.sprite = 'images/char-boy.png';
    var playerOriginXCoord = 200;
    this.x = playerOriginXCoord;
    var playerOriginYCoord = 400;
    this.y = playerOriginYCoord;
    this.boxWidth = 65;
    this.boxHeight = 79;
    var spriteImageXOffset = 18;
    this.boxXvalue = this.x + spriteImageXOffset;
    var spriteImageYOffset = 61;
    this.boxYvalue = this.y + spriteImageYOffset;
    var movementIncrement = 100;

        //ctx.clearRect(0,0,505,606);

    this.update = function() {
        this.updateHitbox();
        this.checkCollisions();
    };
    this.updateHitbox = function(){
        this.boxXvalue = this.x + spriteImageXOffset;
        this.boxYvalue = this.y + spriteImageYOffset;
    };
    this.checkCollisions = function() {
        for(var i=0; i<allEnemies.length; i++) {
            var currentEnemy = allEnemies[i];

            if (currentEnemy.x < player.x + player.boxWidth &&
                currentEnemy.x + currentEnemy.boxWidth > player.x &&
                currentEnemy.y < player.y + player.boxHeight &&
                currentEnemy.boxHeight + currentEnemy.y > player.y) {
                player.reset();
            }
        }
    };
    this.render = function() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        this.drawHitBox(this.boxXvalue, this.boxYvalue, this.boxWidth, this.boxHeight, "transparent");
    };
    this.drawHitBox = function (x, y, width, height, color) {
        ctx.beginPath();
        ctx.rect(x, y, width, height);
        ctx.lineWidth = 2;
        ctx.strokeStyle = color;
        ctx.stroke();
    };
    this.reset = function() {
        this.x = playerOriginXCoord;
        this.y = playerOriginYCoord;
    };
    this.updateLocation = function(xCoord, yCoord) { 
        if(xCoord < -10 || xCoord > 430)
            return;
        if(yCoord > 420) {
            return;
        } else if (yCoord < -10) {
            player.reset();
            return;
        }

        this.x = xCoord;
        this.y = yCoord;
    };
    this.handleInput = function(keyDirection) {
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
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
//TODO: change # of enemies for easy, medium, hard

var allEnemies = [new Enemy(0, 0, 100), new Enemy(0, 100, 50), new Enemy(0, 200, 150)];
function pushThreeEnemies() {
    allEnemies.push(new Enemy(0, 0, 100));
    allEnemies.push(new Enemy(0, 100, 50));
    allEnemies.push(new Enemy(0, 200, 150));
}
window.setInterval(pushThreeEnemies, 3000);

function removeOffScreenEnemies() {
    for(var i=0; i<allEnemies.length; i++) {
        var currentEnemy = allEnemies[i];
        if(currentEnemy.x > 430)
            allEnemies.splice(i, 1);
    }
}
window.setInterval(removeOffScreenEnemies, 10000);

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
