/**
 * A bare bones Sprite and sprite Group example.
 *
 * We move a lot of Ship sprites across the screen with varying speed. The sprites
 * rotate themselves randomly. The sprites bounce back from the bottom of the
 * screen.
 */

var gamejs = require('gamejs');

/**
 * The ship Sprite has a randomly rotated image und moves with random speed (upwards).
 */
var Background = function(rect) {
    // call superconstructor
    Background.superConstructor.apply(this, arguments);
    this.image = gamejs.image.load("media/cork.jpg");
    this.rect = new gamejs.Rect(rect);
    this.speed = -1;

    return this;
};
// inherit (actually: set prototype)
gamejs.utils.objects.extend(Background, gamejs.sprite.Sprite);
Background.prototype.update = function(msDuration) {
    // moveIp = move in place
    this.rect.moveIp(this.speed, 0);

    if (this.rect.left == -600) {
	this.speed = 1;
    };

    if (this.rect.left == 0) {
	this.speed = -1;
    };
};

function main() {

    var instructionFont = new gamejs.font.Font('20px monospace');
    var trainSound = new gamejs.mixer.Sound('media/probe_shields.ogg');

    function handleEvent(event) {
	switch(event.type) {
        case gamejs.event.MOUSE_UP:
	    trainSound.play();
            break;
	};
    };


   // screen setup
   gamejs.display.setMode([200, 200]);
   gamejs.display.setCaption("Example Sprites");
   // create some background sprites and put them in a group
    var background = new Background([0, 0]);

   // game loop
   var mainSurface = gamejs.display.getSurface();
   // msDuration = time since last tick() call
    var tick = function(msDuration) {

	gamejs.event.get().forEach(function(event) {
            handleEvent(event);
	});
	
         mainSurface.fill("#FFFFFF");
         // update and draw the backgrounds
         background.update(msDuration);
        background.draw(mainSurface);
	mainSurface.blit(instructionFont.render(
	    "i love myself", '#0fffff'), [20, 20]);
   };
   gamejs.time.fpsCallback(tick, this, 20);
}

/**
 * M A I N
 */
gamejs.preload(['media/cork.jpg']);
gamejs.preload(['media/arrow-up.png']);
gamejs.preload(['media/probe_shields.ogg']);
gamejs.ready(main);
