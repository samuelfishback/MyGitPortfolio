// desktop
if (window.innerWidth > 900) {
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;
canvas.width = (window.innerWidth / 2) - 4;
canvas.height = 0.995 * window.innerHeight - 4;
canvas.style.margin = '0 25vw'
const controls = document.getElementById('controls');
controls.style.display = 'none';

const gravity = 0.5;
function isPlusOrMinus() {
    let x = Math.random();
    if (x >= 0.5) {
        return 1;
    } else return -1;
}

function spawnPlatform() {
    let platform2 = platforms.length - 3;
    if (player.position.y < platforms[platform2].position.y + platforms[platform2].height &&
        player.position.y > platforms[platform2].position.y) {
        for(i=0; i<4; i++) {
            platforms.push(new Platform({x: 50 + Math.random() * (canvas.width - 50), y: platforms[platforms.length - 1].position.y - 75}));
        }
    }
}
// FIXME: image will not draw even with onload
/* function drawPlatform() {
    const platformImage = new Image();
    platformImage.src = './img/platform.png';
    platformImage.onload = function() {
        ctx.drawImage(platformImage, this.x, this.y, this.width, this.height);
    }
} */

class Player {
    constructor() {
        this.position = {
            x: 100,
            y: canvas.height - 100
        };
        this.width = 15;
        this.height = 15 * 1.618 /* golden ratio */;
        this.velocity = {
            x: 0,
            y: 1
        };
        this.isFacing = {
            left: false,
            neutral: true,
            right: false
        };
        this.hasJumped = false;
        this.isScrolling = false;
    }

    draw() {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
    update() {
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        if(this.position.y + this.height + this.velocity.y < canvas.height) {
            this.velocity.y += gravity;
        } else {
            this.velocity.y = 0;
            this.hasJumped = false;
        }
    }
}

class Platform {
    constructor({x, y}) {
        this.position = {
            x: x + isPlusOrMinus() * Math.floor(Math.random() * 100),
            y: y + isPlusOrMinus() * Math.floor(Math.random() * 20),
        }

        this.width = 100 + isPlusOrMinus() * Math.floor(Math.random() * 50);
        this.height = 100 / (1.618 * 5);
    }
    
    draw() {
        // drawPlatform();
        ctx.fillStyle = 'blue';
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}

const player = new Player();
const platforms = [new Platform({x: 50 + Math.random() * 300, y: 600}), new Platform({x: 50 + Math.random() * 300, y: 525}), 
    new Platform({x: 50 + Math.random() * 300, y: 450}), new Platform({x: 50 + Math.random() * 300, y: 375}),
    new Platform({x: 50 + Math.random() * 300, y: 300}), new Platform({x: 50 + Math.random() * 300, y: 225}),
    new Platform({x: 50 + Math.random() * 300, y: 150}), new Platform({x: 50 + Math.random() * 300, y: 75})];

const keys = {
    right: {
        isPressed: false
    },
    left: {
        isPressed: false
    },
    up: {
        isPressed: false
    },
    down: {
        isPressed: false
    },
    shift: {
        isPressed: false
    }
}

// win condition
let scrollOffset = 0;
let scrollOffsetInitial = 0;
let scrollOffsetFinal = 0;

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.update();
    platforms.forEach(platform => {
        platform.draw();
    });

    // player movement & borders
    // player & background scroll
    // FIXED: change this to a vertical scroll rather than a horizontal one & change velocity back to 10
    if (keys.right.isPressed && player.position.x + player.width < canvas.width) {
        player.velocity.x = 5;
    } else if (keys.left.isPressed && player.position.x > 0) {
        player.velocity.x = -5;
    } else {
        player.velocity.x = 0;
    }
    
    if (scrollOffset > 2000) {
        console.log('YOU WIN!!!');
    }
    
    // platform collision detection
    platforms.forEach(platform => {
        // top collisions
        if (player.position.y + player.height <= platform.position.y &&
            player.position.y + player.height + player.velocity.y >= platform.position.y &&
            player.position.x + player.width >= platform.position.x &&
            player.position.x <= platform.position.x + platform.width) {
                player.velocity.y = 0;
                player.hasJumped = false;
                // player lands well above platform and slowly lowers to 1px above.
                // add decorative flora or stone to cover landings
                // may be order of drawing
        // side collisions
        } else if (player.position.x + player.width >= platform.position.x &&
            player.position.x <= platform.position.x + platform.width &&
            player.position.y <= platform.position.y + platform.height &&
            player.position.y + player.height >= platform.position.y) {
                player.velocity.x = 0;
        // bottom collision
        } else if (player.position.y + player.velocity.y <= platform.position.y + platform.height &&
            player.position.y + player.height >= platform.position.y &&
            player.position.x + player.width >= platform.position.x &&
            player.position.x <= platform.position.x + platform.width) {
                player.position.y = platform.position.y + platform.height;
                player.velocity.y = gravity;
        }

    // scroll mechanics
        if (player.velocity.y < 0 && player.position.y <= 250) {
            platform.position.y -= player.velocity.y;
            player.position.y = 250;
            player.isScrolling = true;
        }
        if (player.isScrolling && player.velocity.y > 0 && player.position.y >= 500) {
            platform.position.y -= player.velocity.y;
            player.position.y = 500;
        }
    });

    spawnPlatform();
}

animate();

window.addEventListener('keydown', ({keyCode}) => {
    console.log(keyCode);
    switch (true) {
        case keyCode==65 || keyCode==37:
            console.log('left');
            keys.right.isPressed = false;
            keys.left.isPressed = true;
            break;
        case keyCode==68 || keyCode==39:
            console.log('right');
            keys.left.isPressed = false;
            keys.right.isPressed = true;
            break;
        case keyCode==87 || keyCode==38:
            console.log('up');
            keys.up.isPressed = true;
            if (!player.hasJumped) {
                player.velocity.y = -10;
                player.hasJumped = true;
            }
            break;
        case keyCode==83 || keyCode==40:
            console.log('down');
            keys.down.isPressed = true;
            break;
        case keyCode==16:
            console.log('shift');
            keys.shift.isPressed = true;
            break;
        case keyCode==32:
            console.log(`x: ${player.position.x} \n y: ${player.position.y}`);
            break;
        case keyCode==13:
            console.log('scrollOffset: ' + scrollOffset);
            console.log('platforms: ' + platforms.length);
            break;
    }
});
window.addEventListener('keyup', ({keyCode}) => {
    switch (true) {
        case keyCode==65 || keyCode==37:
            keys.left.isPressed = false;
            break;
        case keyCode==68 || keyCode==39:
            keys.right.isPressed = false;
            break;
        case keyCode==87 || keyCode==38 || keyCode==32:
            keys.up.isPressed = false;
            if (player.velocity.y <= 0) {
                let counter = 0;
                const i = setInterval(function(){
                    player.velocity.y = 0;
                    counter++;
                    if(counter === 2) {
                        clearInterval(i);
                    }
                }, 17);
            }
            break;
        case keyCode==83 || keyCode==40:
            keys.down.isPressed = false;
            break;
        case keyCode==16:
            keys.shift.isPressed = false;
            break;
        }
});
}
// ----------------------------------------------------------------------------------------------------------------------
// ----------------------------------------- MOBILE ---------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------

if (window.innerWidth > 320 && window.innerWidth < 900) {
if (window.innerWidth > window.innerHeight) {
    alert("Please Rotate device");
} else {

    function isPlusOrMinus() {
        let x = Math.random();
        if (x >= 0.5) {
            return 1;
        } else return -1;
    }

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.imageSmoothingEnabled = false;
canvas.width = window.innerWidth - 4;
canvas.height = window.innerHeight / 1.515 /*1.618 golden ratio*/;
canvas.style.margin = '0';

// ----------------------------------global variables and elements

var jumpEnd;
var controlsHeight = controls.style.height = (window.innerHeight - canvas.height - 8) + 'px';
const leftButton = document.getElementById('left');
const rightButton = document.getElementById('right');
const jumpButton = document.getElementById('jump');
const dashButton = document.getElementById('dash');

// ----------------------------------------------functions

function highlightButton(button) {
    button.addEventListener('touchstart', e => {
        console.log(e.target.title);
        button.style.backgroundColor = 'yellow';
    });
    button.addEventListener('touchend', () => {
        button.style.backgroundColor = 'lightgrey';
    });
}

highlightButton(leftButton);
highlightButton(rightButton);
highlightButton(jumpButton);
highlightButton(dashButton);

function spawnPlatform() {
    let platform2 = platforms.length - 3;
    if (player.position.y < platforms[platform2].position.y + platforms[platform2].height &&
        player.position.y > platforms[platform2].position.y) {
        for(i=0; i<4; i++) {
            platforms.push(new Platform({x: 50 + Math.random() * 200, y: platforms[platforms.length - 1].position.y - 100}));
        }
    }
}

function scrollMechanics() {
    platforms.forEach(platform => {
    // scroll mechanics
        if (player.velocity.y < 0 && player.position.y <= 150) {
            platform.position.y -= player.velocity.y;
            player.position.y = 150;
            player.isScrolling = true;
        }
        if (player.isScrolling && player.velocity.y > 0 && player.position.y >= 500) {
            platform.position.y -= player.velocity.y;
            player.position.y = 500;
        }
    });
}

// ----------------------------------------------classes

// -------------------------------------------------platforms
class Platform {
    constructor({x, y}) {
        this.position = {
            x: x + isPlusOrMinus() * Math.floor(Math.random() * 90),
            y: y + isPlusOrMinus() * Math.floor(Math.random() * 15),
        }
        
        this.width = 100 + isPlusOrMinus() * Math.floor(Math.random() * 50);
        this.height = 200 / (1.618 * 5);
    }
    
    draw() {
        // drawPlatform();
        ctx.fillStyle = 'blue';
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}

// --------------------------------------------------player
class Player {
    constructor() {
        this.position = {
            x: 100,
            y: 350
        };
        this.width = 30;
        this.height = 30 * 1.618 /* golden ratio */;
        this.velocity = {
            x: 0,
            y: 0
        };
        this.direction = {
            left: false,
            right: false,
            up: false,
            down: false,
            dashLeft: false,
            dashRight: false,
            doubleJump: false,
            safetyNet: false
        };
        this.isFacing = {
            left: false,
            neutral: true,
            right: false
        };
        this.isScrolling = false;
    }

    move() {
        if (this.direction.left && this.position.x > 0) {
            this.velocity.x = -5;
        } else if (this.direction.right && this.position.x + this.width < canvas.width) {
            this.velocity.x = 5;
        } else this.velocity.x = 0;
    }
    
    jump() {
        if (this.direction.up && this.position.y > 150) {
            console.log(this.position.y + "\n" + jumpEnd);
            this.velocity.y = -10;
            if (this.position.y > jumpEnd) {
                this.velocity.y = -10;
            } else this.direction.up = false;
        } else this.velocity.y += 1;
        
    // -------------------------------------------scroll mechanics TODO:
    }

    draw() {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
    update() {
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
}

// -------------------------------------objects

const player = new Player();
const platforms = [new Platform({x: 180, y: 350}), new Platform({x: 180, y: 250}), new Platform({x: 180, y: 150})];

// ------------------------------------------collision detection
function isGrounded() {
    let isPlatformed;
    if (player.position.y + player.height + player.velocity.y > canvas.height) {
        player.velocity.y = 0;
    }
    if (player.position.y + player.height > canvas.height - 2 &&
        player.position.y + player.height < canvas.height + 2) {
        return true;
    }
    platforms.forEach(platform => {
        if (player.position.y + player.height <= platform.position.y &&
            player.position.y + player.height + player.velocity.y >= platform.position.y &&
            player.position.x + player.width >= platform.position.x &&
            player.position.x <= platform.position.x + platform.width) {
                player.velocity.y = 0;
        } 
        if (player.position.y + player.height > platform.position.y - 2 &&
            player.position.y + player.height < platform.position.y + 2 &&
            player.position.x + player.width >= platform.position.x &&
            player.position.x <= platform.position.x + platform.width) {
                isPlatformed = true;
        }
    }); return isPlatformed;
}

function collision() {
    platforms.forEach(platform => {
        // side collisions
        // left
        if (player.position.x + player.width + player.velocity.x >= platform.position.x &&
            player.position.x + player.velocity.x <= platform.position.x + platform.width &&
            player.position.y <= platform.position.y + platform.height &&
            player.position.y + player.height >= platform.position.y) {
                player.velocity.x = 0;
        // bottom collision
        } else if (player.position.y + player.velocity.y <= platform.position.y + platform.height &&
            player.position.y + player.height >= platform.position.y &&
            player.position.x + player.width >= platform.position.x &&
            player.position.x <= platform.position.x + platform.width) {
                player.position.y = platform.position.y + platform.height;
                player.velocity.y = 0;
                player.direction.up = false;
        }
    });
}
// --------------------------------------------animate

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.update();
    player.move();
    player.jump();
    platforms.forEach(platform => {
        platform.draw();
    });
    isGrounded();
    //console.log(isGrounded());
    // scroll();
    collision();
    spawnPlatform();
    scrollMechanics();
}
animate();

// ---------------------------------------event listeners

canvas.addEventListener('click', e => {
    e.stopPropagation();
    e.preventDefault();
    window.navigator.vibrate(0);
});
canvas.addEventListener('touchmove', e => {
    e.preventDefault();
    [...e.changedTouches].forEach(touch => {
		const dot = document.getElementById(touch.identifier);
		dot.style.top = `${touch.pageY}px`;
		dot.style.left = `${touch.pageX}px`;
	});
});
controls.addEventListener('touchmove', e => {
    e.preventDefault();
    [...e.changedTouches].forEach(touch => {
		const dot = document.getElementById(touch.identifier);
		dot.style.top = `${touch.pageY}px`;
		dot.style.left = `${touch.pageX}px`;
	});
});
canvas.addEventListener('touchstart', e => {
    e.preventDefault();
    [...e.changedTouches].forEach(touch => {
		const dot = document.createElement("div");
		dot.classList.add("dot");
		dot.style.top = `${touch.pageY}px`;
		dot.style.left = `${touch.pageX}px`;
		dot.id = touch.identifier;
		document.body.append(dot);
	});
});
controls.addEventListener('touchstart', e => {
    e.preventDefault();
    [...e.changedTouches].forEach(touch => {
		const dot = document.createElement("div");
		dot.classList.add("dot");
		dot.style.top = `${touch.pageY}px`;
		dot.style.left = `${touch.pageX}px`;
		dot.id = touch.identifier;
		document.body.append(dot);
	});
});
canvas.addEventListener('touchend', e => {
    e.preventDefault();
    [...e.changedTouches].forEach(touch => {
		const dot = document.getElementById(touch.identifier);
		dot.remove();
	});
});
controls.addEventListener('touchend', e => {
    e.preventDefault();
    [...e.changedTouches].forEach(touch => {
		const dot = document.getElementById(touch.identifier);
		dot.remove();
	});
});

leftButton.addEventListener('touchstart', () => {
    player.direction.left = true;
});
leftButton.addEventListener('touchend', () => {
    player.direction.left = false;
});
rightButton.addEventListener('touchstart', () => {
    player.direction.right = true;
});
rightButton.addEventListener('touchend', () => {
    player.direction.right = false;
});
jumpButton.addEventListener('touchstart', () => {
    player.direction.up = true;
    jumpEnd = player.position.y - 100;
    player.jump();
});
jumpButton.addEventListener('touchend', () => {
    player.direction.up = false;
});

}}