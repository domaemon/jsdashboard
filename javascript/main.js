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
    this.image = gamejs.image.load("media/background.jpg");
    this.rect = new gamejs.Rect(rect);

    return this;
};

// inherit (actually: set prototype)
gamejs.utils.objects.extend(Background, gamejs.sprite.Sprite);
Background.prototype.update = function(msDuration) {
    // moveIp = move in place
    this.rect.moveIp(0, 0);
};

var Hazard = function(rect) {
    // call superconstructor
    Hazard.superConstructor.apply(this, arguments);
    this.image = gamejs.image.load("media/hazard.png");
    this.rect = new gamejs.Rect(rect);

    return this;
};

// inherit (actually: set prototype)
gamejs.utils.objects.extend(Hazard, gamejs.sprite.Sprite);
Hazard.prototype.update = function(msDuration) {
    // moveIp = move in place
    this.rect.moveIp(0, 0);
};

var Blink = function(rect) {
    // call superconstructor
    Blink.superConstructor.apply(this, arguments);
    this.image = gamejs.image.load("media/blink.png");
    this.rect = new gamejs.Rect(rect);

    return this;
};

// inherit (actually: set prototype)
gamejs.utils.objects.extend(Blink, gamejs.sprite.Sprite);
Blink.prototype.update = function(msDuration) {
    // moveIp = move in place
    this.rect.moveIp(0, 0);
};

function main() {

    var instructionFont = new gamejs.font.Font('20px monospace');
    var trainSound = new gamejs.mixer.Sound('media/probe_shields.ogg');
    var loop_counter = 0;

    function handleEvent(event) {
	switch(event.type) {
        case gamejs.event.MOUSE_UP:
	    console.log(event.pos[0]);
	    console.log(event.pos[1]);
	    console.log(hazard.rect.left);
	    console.log(hazard.rect.right);
	    console.log(hazard.rect.top);
	    console.log(hazard.rect.bottom);


	    if ((event.pos[0] > hazard.rect.left) &&
		(event.pos[0] < hazard.rect.right) &&
		(event.pos[1] > hazard.rect.top) &&
		(event.pos[1] < hazard.rect.bottom)) {
		trainSound.play();
	    };
	    
            break;
	};
    };

    // screen setup
    gamejs.display.setMode([800, 480]);
    gamejs.display.setCaption("jsdashboard");
    
    // create some background sprites and put them in a group
    // doesn't have to be sprite..
    var background = new Background([0, 0]);
    var hazard = new Hazard([400, 240, 48, 48]);
    var blink = new Blink([400, 160, 48, 48]);

    // game loop
    var mainSurface = gamejs.display.getSurface();

    // msDuration = time since last tick() call
    var main_tick = function(msDuration) {

	loop_counter++;
	
	gamejs.event.get().forEach(function(event) {
            handleEvent(event);
	});
	
        mainSurface.fill("#FFFFFF");
        // update and draw the backgrounds
        background.update(msDuration);
	hazard.update(msDuration);
        blink.update(msDuration);

        background.draw(mainSurface);
        hazard.draw(mainSurface);

	if (loop_counter < 20) {
            blink.draw(mainSurface);
	} else if (loop_counter == 40) {
	    loop_counter = 0;
	};



	mainSurface.blit(instructionFont.render(
	    "i love myself", '#0fffff'), [20, 20]);
    };
    gamejs.time.fpsCallback(main_tick, this, 20);
}

/**
 * M A I N
 */
gamejs.preload(['media/background.jpg']);
gamejs.preload(['media/hazard.png']);
gamejs.preload(['media/blink.png']);
gamejs.preload(['media/probe_shields.ogg']);
gamejs.ready(main);
