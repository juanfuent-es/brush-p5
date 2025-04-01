export default class Point {
    constructor(args={}) {
        this.position = createVector(args.x || 0, args.y || 0);
        this.fill = color(args.fill || 'white');
        this.stroke = args.stroke || false;
        this.alpha = args.alpha || 1;
        this.size = args.size || 10;
        this.friction = args.friction || 0.1;
    }

    draw() {
        this.update();
        this.fill.setAlpha(this.alpha)
        fill(this.fill);
        if (this.stroke) {
            stroke(this.stroke);
        } else {
            noStroke();
        }
        // stroke(this.stroke);
        ellipse(this.position.x, this.position.y, this.size, this.size);
    }

    update() {
        this.position.x += (mouseX - this.position.x) * this.friction;
        this.position.y += (mouseY - this.position.y) * this.friction;
    }
}