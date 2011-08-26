/*
 * jsdashboard
 *
 * Prototyping the javascript based dashboard.
 *
 */

var gamejs = require('gamejs');

const STATE_SIGNAL_OFF = 0;
const STATE_SIGNAL_LEFT = 1;
const STATE_SIGNAL_RIGHT = 2;
const STATE_SIGNAL_HAZARD = 3;

const STATE_WIPER_OFF = 0;
const STATE_WIPER_SLOW = 1;
const STATE_WIPER_NORMAL = 2;
const STATE_WIPER_FAST = 3;

const OFFSETX_SWITCH_SIGNAL = 70
const OFFSETX_SWITCH_WIPER = 680
const OFFSETX_SIGNAL_LEFT = 320
const OFFSETX_SIGNAL_RIGHT = 430
const OFFSETY_SIGNAL = 320

var state_signal = STATE_SIGNAL_OFF;
var state_wiper = STATE_WIPER_OFF;


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


/*********************************/

/*** Switch Slow Button ***/
var Switch_Slow = function(rect) {
    Switch_Slow.superConstructor.apply(this, arguments);
    this.image = gamejs.image.load("media/switch_button.png");
    this.rect = new gamejs.Rect(rect);

    return this;
};
// inherit (actually: set prototype)
gamejs.utils.objects.extend(Switch_Slow, gamejs.sprite.Sprite);
Switch_Slow.prototype.update = function(msDuration) {
    // moveIp = move in place
    this.rect.moveIp(0, 0);
};

/*** Switch Normal Button ***/
var Switch_Normal = function(rect) {
    Switch_Normal.superConstructor.apply(this, arguments);
    this.image = gamejs.image.load("media/switch_button.png");
    this.rect = new gamejs.Rect(rect);

    return this;
};
// inherit (actually: set prototype)
gamejs.utils.objects.extend(Switch_Normal, gamejs.sprite.Sprite);
Switch_Normal.prototype.update = function(msDuration) {
    // moveIp = move in place
    this.rect.moveIp(0, 0);
};

/*** Switch Fast Button ***/
var Switch_Fast = function(rect) {
    Switch_Fast.superConstructor.apply(this, arguments);
    this.image = gamejs.image.load("media/switch_button.png");
    this.rect = new gamejs.Rect(rect);

    return this;
};
// inherit (actually: set prototype)
gamejs.utils.objects.extend(Switch_Fast, gamejs.sprite.Sprite);
Switch_Fast.prototype.update = function(msDuration) {
    // moveIp = move in place
    this.rect.moveIp(0, 0);
};


/*** Wiper ***/
var Wiper = function(rect) {
    // call superconstructor
    Wiper.superConstructor.apply(this, arguments);
    this.origImage = gamejs.image.load("media/wiper.png");
    this.rect = new gamejs.Rect(rect);

    return this;
};

// inherit (actually: set prototype)
gamejs.utils.objects.extend(Wiper, gamejs.sprite.Sprite);
Wiper.prototype.update = function(msDuration, angle, factor) {
    // moveIp = move in place
    this.image = gamejs.transform.rotate(this.origImage, angle * 2 * (factor + 1));
};

// check if the signal switch was pressed.
function check_signal_switch (state_signal, pos, rect_left, rect_right, rect_hazard) {

    if ((pos[0] < rect_left.right) && (pos[0] > rect_left.left) &&
	(pos[1] > rect_left.top) && (pos[1] < rect_left.bottom)) {

	if (state_signal == STATE_SIGNAL_LEFT) {
	    return STATE_SIGNAL_OFF;
	} else {
	    return STATE_SIGNAL_LEFT;
	}
    };

    if ((pos[0] < rect_right.right) && (pos[0] > rect_right.left) &&
	(pos[1] > rect_right.top) && (pos[1] < rect_right.bottom)) {

	if (state_signal == STATE_SIGNAL_RIGHT) {
	    return STATE_SIGNAL_OFF;
	} else {
	    return STATE_SIGNAL_RIGHT;
	}
    };

    if ((pos[0] < rect_hazard.right) && (pos[0] > rect_hazard.left) &&
	(pos[1] > rect_hazard.top) && (pos[1] < rect_hazard.bottom)) {

	if (state_signal == STATE_SIGNAL_HAZARD) {
	    return STATE_SIGNAL_OFF;
	} else {
	    return STATE_SIGNAL_HAZARD;
	}
    };

    return state_signal;
};

// check if the wiper switch was pressed.
function check_wiper_switch (state_wiper, pos, rect_slow, rect_normal, rect_fast) {


    if ((pos[0] < rect_slow.right) && (pos[0] > rect_slow.left) &&
	(pos[1] > rect_slow.top) && (pos[1] < rect_slow.bottom)) {

	if (state_wiper == STATE_WIPER_SLOW) {
	    return STATE_WIPER_OFF;
	} else {
	    return STATE_WIPER_SLOW;
	}
    };

    if ((pos[0] < rect_normal.right) && (pos[0] > rect_normal.left) &&
	(pos[1] > rect_normal.top) && (pos[1] < rect_normal.bottom)) {

	if (state_wiper == STATE_WIPER_NORMAL) {
	    return STATE_WIPER_OFF;
	} else {
	    return STATE_WIPER_NORMAL;
	}
    };

    if ((pos[0] < rect_fast.right) && (pos[0] > rect_fast.left) &&
	(pos[1] > rect_fast.top) && (pos[1] < rect_fast.bottom)) {

	if (state_wiper == STATE_WIPER_FAST) {
	    return STATE_WIPER_OFF;
	} else {
	    return STATE_WIPER_FAST;
	}
    };
    return state_wiper;
};

/*** main function ***/

function main() {

    var instructionFont = new gamejs.font.Font('20px');
    var sound_click = new gamejs.mixer.Sound('media/switch_click.ogg');
    var sound_signal = new gamejs.mixer.Sound('media/signal_sound.ogg');

    var loop_counter = 0;

    function handleEvent(event) {
	switch(event.type) {
        case gamejs.event.MOUSE_UP:

	    // checking which signal button was pressed
	    state_signal = check_signal_switch 
	    (state_signal, event.pos, switch_left.rect, switch_right.rect, switch_hazard.rect);

	    // checking which wiper button was pressed
	    state_wiper = check_wiper_switch
	    (state_wiper, event.pos, switch_slow.rect, switch_normal.rect, switch_fast.rect);
	    
            break;
	};
    };

    // screen setup
    gamejs.display.setMode([800, 480]);
    gamejs.display.setCaption("jsdashboard");
    
    // create some background sprites and put them in a group
    // doesn't have to be sprite..
    var background = new Background([0, 0]);

    var switch_left = new Switch_Left([OFFSETX_SWITCH_SIGNAL, 240, 48, 48]);
    var switch_right = new Switch_Right([OFFSETX_SWITCH_SIGNAL, 290, 48, 48]);
    var switch_hazard = new Switch_Hazard([OFFSETX_SWITCH_SIGNAL, 340, 48, 48]);

    var switch_slow = new Switch_Slow([OFFSETX_SWITCH_WIPER, 240, 48, 48]);
    var switch_normal = new Switch_Normal([OFFSETX_SWITCH_WIPER, 290, 48, 48]);
    var switch_fast = new Switch_Fast([OFFSETX_SWITCH_WIPER, 340, 48, 48]);

    var wiper = new Wiper([400, 80]);

    var signal_left = new Signal_Left([OFFSETX_SIGNAL_LEFT, OFFSETY_SIGNAL, 48, 48]);
    var signal_right = new Signal_Right([OFFSETX_SIGNAL_RIGHT, OFFSETY_SIGNAL, 48, 48]);

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

        switch_slow.update(msDuration);
        switch_normal.update(msDuration);
        switch_fast.update(msDuration);

        signal_left.update(msDuration);
        signal_right.update(msDuration);

	wiper.update(msDuration, loop_counter, state_wiper);

	// draw the positions
        background.draw(mainSurface);

        switch_left.draw(mainSurface);
        switch_right.draw(mainSurface);
        switch_hazard.draw(mainSurface);

        switch_slow.draw(mainSurface);
        switch_normal.draw(mainSurface);
        switch_fast.draw(mainSurface);

	// drawing the wiper
	if (state_wiper != STATE_WIPER_OFF) {
	    wiper.draw(mainSurface);
	};

	if (loop_counter < 15) {
	    // 0 < loop_counter < 15, the signal is shown.
	    if (state_signal == STATE_SIGNAL_OFF) {
	    } else if (state_signal == STATE_SIGNAL_HAZARD) {
		signal_left.draw(mainSurface);
		signal_right.draw(mainSurface);
	    } else if (state_signal == STATE_SIGNAL_LEFT) {
		signal_left.draw(mainSurface);
	    } else if (state_signal == STATE_SIGNAL_RIGHT) {
		signal_right.draw(mainSurface);
	    };

	} else if (loop_counter == 30) {
	    loop_counter = 0;

	    if (state_signal != STATE_SIGNAL_OFF) {
		sound_click.play();
	    };
	};

	mainSurface.blit(instructionFont.render(
	    "i am not going there.", '#0fffff'), [50, 50]);
    };
    gamejs.time.fpsCallback(main_tick, this, 30);
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

gamejs.preload(['media/wiper.png']);

gamejs.ready(main);
