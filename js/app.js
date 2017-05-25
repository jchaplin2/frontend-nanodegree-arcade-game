(function(global) {
    "use strict"
    // Enemies our player must avoid
    var Enemy = function(x, y, speed) {
        this.x = x;
        this.y = y;
        // Variables applied to each of our instances go here,
        // we've provided one for you to get started

        this.sprite = 'images/enemy-bug.png';
        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images

        this.speed = Math.floor((Math.random()*200));
        //TODO: change speed for easy, medium, hard
        //Easy : 200
        //Medium : 700
        //Hard : 1000
        //X-Treme : 1200

        this.boxWidth = 98;
        this.boxHeight = 67;
        //collision box height and width.

        this.spriteImageYOffset = 77;

        this.hitbox = {x:this.x, y:this.y, width:this.boxWidth, height:this.boxHeight};
    };

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    Enemy.prototype.update = function(dt) {
        this.x += (this.speed * dt);
        if(this.x >  500){
            this.x = 0;
        }

        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
    };

    Enemy.prototype.makeHitBox = function(){
        this.hitbox.x = this.x;
        this.hitbox.y = this.y + this.spriteImageYOffset;
    };

/*
    Enemy.prototype.drawHitBox = function (x, y, width, height, color) {
        //this function puts the hitbox on the screen
        ctx.beginPath();
        ctx.rect(x, y, width, height);
        ctx.lineWidth = 1;
        ctx.strokeStyle = color;
        ctx.stroke();
    };
*/
    // Draw the enemy on the screen, required method for game
    Enemy.prototype.render = function() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        //this.drawHitBox(this.hitbox.x, this.y + this.spriteImageYOffset, this.boxWidth, this.boxHeight, "transparent");
    };

    // Now write your own player class
    // This class requires an update(), render() and
    // a handleInput() method.

    var Player = function() {
        var MIN_ROW_POS = -10;
        var MAX_ROW_POS = 430;
        var MIN_COL_POS = -10;
        var MAX_COL_POS = 420;

        this.sprite = 'images/char-boy.png';
        var playerOriginXCoord = 200;
        this.x = playerOriginXCoord;
        var playerOriginYCoord = 400;
        this.y = playerOriginYCoord;
        this.boxWidth = 65;
        this.boxHeight = 79;

        var spriteImageXOffset = 18;
        this.boxXvalue = this.x + spriteImageXOffset;
        //collision box x value.

        var spriteImageYOffset = 61;
        this.boxYvalue = this.y + spriteImageYOffset;
        //collision box y value.

        var movementIncrement = 100;
        //amount to increment movement when key is pressed.

        //Score and styles
        this.score = 0;
        this.labelColor = '#777';
        this.scoreColor = '#000';
        this.labelFont = '12pt Tahoma, sans-serif';
        this.scoreFont = '16pt Tahoma, sans-serif';
        this.scoreLabel = 'Score: ';
        this.scoreLabelX = Math.floor(2.5 * 100); //x location to render
        this.scoreLabelY = 0; //y location to render

        this.getScore = function() {
            return this.score;
        };
        this.incrementScore = function(value) {
            ctx.font = this.scoreFont;
            ctx.fillStyle = "#FFF";
            var scoreText = this.scoreLabel + this.score;
            ctx.fillText(scoreText, 10, 50);  //score
            this.score += value;
            this.renderScores();
        };
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
                        this.reset();
                }
            }

            //if stepped on a gem:
            if (gem.isVisible && gem.y === this.y && gem.x == this.x) {
                gem.isVisible = false;  //no longer render the gem
                this.incrementScore(10);
                gem.spawn();
            }
        };
        this.render = function() {
            ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
            //this.drawHitBox(this.boxXvalue, this.boxYvalue, this.boxWidth, this.boxHeight, "transparent");
        };
        this.renderScores = function() {
            ctx.fillStyle = this.scoreColor;
            ctx.font = this.scoreFont;
            var scoreText = this.scoreLabel + this.score;
            ctx.fillText(scoreText, 10, 50);  //score
        };
/*
        this.drawHitBox = function (x, y, width, height, color) {
            ctx.beginPath();
            ctx.rect(x, y, width, height);
            ctx.lineWidth = 2;
            ctx.strokeStyle = color;
            ctx.stroke();
        };
*/
        this.reset = function() {
            this.x = playerOriginXCoord;
            this.y = playerOriginYCoord;
        };
        this.updateLocation = function(xCoord, yCoord) { 
            if(xCoord < MIN_ROW_POS || xCoord > MAX_ROW_POS)
                return;
            if(yCoord > MAX_COL_POS) {
                return;
            } else if (yCoord < MIN_ROW_POS) {
                player.incrementScore(20);
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
        };
    };

    // Now instantiate your objects.
    // Place all enemy objects in an array called allEnemies
    // TODO: change # of enemies for easy, medium, hard

    var allEnemies = [new Enemy(0, 0, 100), new Enemy(0, 100, 50), new Enemy(0, 200, 150)];

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

    var Gem = function() {
        //graphics:
        this.sprites = [
            'images/Gem Blue.png',  // 0
            'images/Gem Green.png', // 1
            'images/Gem Orange.png' // 2
        ];

        //type:
        this.type = 0;  //serves as an index for the graphic, plus determines status effect

        //position:
        this.x = 0;  //x in px
        this.y = 0;  //y in px
        this.spawn();  //sets up a gem

        //detection/collision
        this.isVisible = true;  //true when live, turns false after being picked up
    };

    //Creates a gem:  chooses its location and its type
    Gem.prototype.spawn = function() {
        this.randomPosition();
        this.randomType();
        this.isVisible = true;
    };

    //Places the gem on a random tile that's NOT where the player starts
    Gem.prototype.randomPosition = function() {
        this.x = getRandomPosition();
        this.y = getRandomPosition();
    };

    //returns a random integer between the provided range, inclusively
    function getRandomInt(min, max) {
        max++; //to make the max inclusive
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function getRandomPosition() {
        var position = Math.floor(Math.random() * 4) *100;
        return position;
    }

    //Choose a random gem type from the set of available gem sprites
    Gem.prototype.randomType = function() {
        this.type = getRandomInt(0, this.sprites.length - 1);
    };

    //draws the sprite on the map, converts from tile coords to px
    Gem.prototype.render = function() {
        if (this.isVisible) {  //draw only if player hasn't already picked up
            ctx.drawImage(Resources.get(this.sprites[this.type]), this.x, this.y);
        }
    };

    var gem = new Gem();

    /* Assign the canvas' context object to the global variable (the window
     * object when run in a browser) so that developers can use it more easily
     * from within their app.js files.
     */
    global.allEnemies = allEnemies;
    global.player = player;
    global.gem = gem;
})(this);
