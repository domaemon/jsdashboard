/*
 * jsdashboard
 *
 * Prototyping the javascript based dashboard.
 *
 */

var gamejs = require('gamejs');

/*** Background Image ***/
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


/*** Left Signal ***/
var Signal_Left = function(rect) {
    Signal_Left.superConstructor.apply(this, arguments);
    this.image = gamejs.image.load("media/signal_left.png");
    this.rect = new gamejs.Rect(rect);

    return this;
};
// inherit (actually: set prototype)
gamejs.utils.objects.extend(Signal_Left, gamejs.sprite.Sprite);
Signal_Left.prototype.update = function(msDuration) {
    // moveIp = move in place
    this.rect.moveIp(0, 0);
};

/*** Right Signal ***/
var Signal_Right = function(rect) {
    Signal_Right.superConstructor.apply(this, arguments);
    this.image = gamejs.image.load("media/signal_right.png");
    this.rect = new gamejs.Rect(rect);

    return this;
};
// inherit (actually: set prototype)
gamejs.utils.objects.extend(Signal_Right, gamejs.sprite.Sprite);
Signal_Right.prototype.update = function(msDuration) {
    // moveIp = move in place
    this.rect.moveIp(0, 0);
};

/*** Switch Left Button ***/
var Switch_Left = function(rect) {
    Switch_Left.superConstructor.apply(this, arguments);
    this.image = gamejs.image.load("media/switch_button.png");
    this.rect = new gamejs.Rect(rect);

    return this;
};
// inherit (actually: set prototype)
gamejs.utils.objects.extend(Switch_Left, gamejs.sprite.Sprite);
Switch_Left.prototype.update = function(msDuration) {
    // moveIp = move in place
    this.rect.moveIp(0, 0);
};

/*** Switch Right Button ***/
var Switch_Right = function(rect) {
    Switch_Right.superConstructor.apply(this, arguments);
    this.image = gamejs.image.load("media/switch_button.png");
    this.rect = new gamejs.Rect(rect);

    return this;
};
// inherit (actually: set prototype)
gamejs.utils.objects.extend(Switch_Right, gamejs.sprite.Sprite);
Switch_Right.prototype.update = function(msDuration) {
    // moveIp = move in place
    this.rect.moveIp(0, 0);
};

/*** Switch Hazard Button ***/
var Switch_Hazard = function(rect) {
    // call superconstructor
    Switch_Hazard.superConstructor.apply(this, arguments);
    this.image = gamejs.image.load("media/switch_button.png");
    this.rect = new gamejs.Rect(rect);

    return this;
};

// inherit (actually: set prototype)
gamejs.utils.objects.extend(Switch_Hazard, gamejs.sprite.Sprite);
Switch_Hazard.prototype.update = function(msDuration) {
    // moveIp = move in place
    this.rect.moveIp(0, 0);
};

/*** main function ***/

function main() {

    var instructionFont = new gamejs.font.Font('20px monospace');
    var sound_click = new gamejs.mixer.Sound('media/switch_click.ogg');
    var sound_signal = new gamejs.mixer.Sound('media/signal_sound.ogg');

    var loop_counter = 0;

    var state_signal_left = false
    var state_signal_right = false
    var state_signal_hazard = false

    function handleEvent(event) {
	switch(event.type) {
        case gamejs.event.MOUSE_UP:
	    if ((event.pos[0] > switch_left.rect.left) &&
		(event.pos[0] < switch_left.rect.right) &&
		(event.pos[1] > switch_left.rect.top) &&
		(event.pos[1] < switch_left.rect.bottom)) {

		sound_click.play();

		if (state_signal_left == false) {
		    state_signal_left = true;
		    state_signal_right = false;
		    state_signal_hazard = false;
		} else if (state_signal_left == true) {
		    state_signal_left = false;
		    state_signal_right = false;
		    state_signal_hazard = false;
		};
	    };

	    if ((event.pos[0] > switch_right.rect.left) &&
		(event.pos[0] < switch_right.rect.right) &&
		(event.pos[1] > switch_right.rect.top) &&
		(event.pos[1] < switch_right.rect.bottom)) {
		sound_click.play();

		if (state_signal_right == false) {
		    state_signal_left = false;
		    state_signal_right = true;
		    state_signal_hazard = false;
		} else if (state_signal_right == true) {
		    state_signal_left = false;
		    state_signal_right = false;
		    state_signal_hazard = false;
		};

	    };

	    if ((event.pos[0] > switch_hazard.rect.left) &&
		(event.pos[0] < switch_hazard.rect.right) &&
		(event.pos[1] > switch_hazard.rect.top) &&
		(event.pos[1] < switch_hazard.rect.bottom)) {
		sound_click.play();

		if (state_signal_hazard == false) {
		    state_signal_left = false;
		    state_signal_right = false;
		    state_signal_hazard = true;
		} else if (state_signal_hazard == true) {
		    state_signal_left = false;
		    state_signal_right = false;
		    state_signal_hazard = false;
		};
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

    var switch_left = new Switch_Left([480, 240, 48, 48]);
    var switch_right = new Switch_Right([480, 290, 48, 48]);
    var switch_hazard = new Switch_Hazard([480, 340, 48, 48]);

    var signal_left = new Signal_Left([360, 160, 48, 48]);
    var signal_right = new Signal_Right([440, 160, 48, 48]);

    // game loop
    var mainSurface = gamejs.display.getSurface();

    // msDuration = time since last tick() call
    var main_tick = function(msDuration) {

	loop_counter++;
	
	gamejs.event.get().forEach(function(event) {
            handleEvent(event);
	});
	
        mainSurface.fill("#FFFFFF");

	// update the positions
        background.update(msDuration);
        switch_left.update(msDuration);
        switch_right.update(msDuration);
        switch_hazard.update(msDuration);
        signal_left.update(msDuration);
        signal_right.update(msDuration);

	// draw the positions
        background.draw(mainSurface);
        switch_left.draw(mainSurface);
        switch_right.draw(mainSurface);
        switch_hazard.draw(mainSurface);

	if (state_signal_hazard) {
            signal_left.draw(mainSurface);
            signal_right.draw(mainSurface);
	} else if (state_signal_left) {
            signal_left.draw(mainSurface);
	} else if (state_signal_right) {
            signal_right.draw(mainSurface);
	}

/*
	if (loop_counter < 20) {
            signal_left.draw(mainSurface);
            signal_right.draw(mainSurface);
	} else if (loop_counter == 40) {
	    loop_counter = 0;
	};
*/

	mainSurface.blit(instructionFont.render(
	    "i love myself", '#0fffff'), [20, 20]);
    };
    gamejs.time.fpsCallback(main_tick, this, 20);
}

/**
 * M A I N
 */
gamejs.preload(['media/background.jpg']);

gamejs.preload(['media/signal_right.png']);
gamejs.preload(['media/signal_left.png']);
gamejs.preload(['media/signal_sound.ogg']);

gamejs.preload(['media/switch_button.png']);
gamejs.preload(['media/switch_click.ogg']);
gamejs.ready(main);
