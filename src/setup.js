// Definición de clase js
class Point {
  constructor(args = {}) {
    this.pos = createVector(args.x || 0, args.y || 0);
    this.fill = args.fill || 'black';
    this.friction = args.friction || 0.1;
  }

  draw() {
    this.pos.x += (mouseX - this.pos.x) * this.friction;
    this.pos.y += (mouseY - this.pos.y) * this.friction;
    ellipse(this.pos.x, this.pos.y, 10, 10);
    fill(255);
    // text(`${this.pos.x},${this.pos.y}`, this.pos.x, this.pos.y);
  }
}

var TOTAL_POINTS = 10;
var points = [];

window.setup = () => {
  createCanvas(windowWidth, windowHeight);
  background('black');
  for (let i = 0; i < TOTAL_POINTS; i++) {
    var point = new Point({
      x: Math.random() * width,
      y: Math.random() * height,
      friction: Math.random() * .05 + .05,
      fill: 'black'
    });
    points.push(point);
  }
};
// p5.js draw function
window.draw = () => {
  background(0, 1); // Reset background after resizing
  for (let i = 0; i < points.length; i++) {
    const point = points[i];
    point.draw();
  }
};

// p5.js windowResized function
window.windowResized = () => {
  resizeCanvas(windowWidth, windowHeight);
  background('black'); // Reset background after resizing
};