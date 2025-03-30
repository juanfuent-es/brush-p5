export default class Point {
  constructor(args = {}) {
    this.position = createVector(args.x || 0, args.y || 0);
    this.fill = args.fill || 'black';
    this.friction = args.friction || 0.1;
  }

  update(target) {
    this.position.x += (target.x - this.position.x) * this.friction;
    this.position.y += (target.y - this.position.y) * this.friction;
  }

  draw() {
    fill(this.fill);
    // ellipse(this.position.x, this.position.y, 10, 10);
  }
}
