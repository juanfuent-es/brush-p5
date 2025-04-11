export default class Vertex {
	constructor(x, y) {
		this.pos = createVector(x, y);
		this.vel = createVector(0, 0);
		this.acc = createVector(0, 0);
	}

	integration(target, spring) {
		const force = p5.Vector.sub(target, this.pos);
		force.mult(spring);
		this.acc.add(force);
		this.vel.add(this.acc);
		this.acc.mult(0);
	}

	quadTo(b) {
		const midPoint = p5.Vector.add(this.pos, b.pos);
		midPoint.mult(0.5);
		return midPoint;
	}
}