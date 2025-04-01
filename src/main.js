class Point {
    constructor(args={}) {
        this.position = createVector(args.x || 0, args.y || 0);
        this.fill = args.fill || 'white';
        this.stroke = args.stroke || 'black';
        this.size = args.size || 10;
        this.opacity = args.opacity || 1;
        this.friction = args.friction || 0.1;
    }

    draw() {
        fill(this.fill);
        noStroke();
        ellipse(this.position.x, this.position.y, this.size, this.size);
    }

    update(mouse) {
        this.position.x = mouseX;
        this.position.y = mouseY;
    }
}

let point;

window.setup = (event) => {
    point = new Point();
    createCanvas(windowWidth, windowHeight);
};

window.draw = (event) => {
    background('black');
    point.update();
    point.draw();
};

window.windowResized = (event) => {
    resizeCanvas(windowWidth, windowHeight);
    background('black');
};

// eventos de mouse

window.mousePressed = (e) => {
    // console.log(e);
};
window.mouseMoved = (e) => {
    // console.log(e);
};

window.mouseReleased = (e) => {
    // console.log(e);
};