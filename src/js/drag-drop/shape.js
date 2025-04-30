import { simplifyPath } from "../utils/simplify-helper.js";

export default class Shape {
    constructor(args={}) {
        this.points = []; // Lista de puntos del trazo
        this.strokeColor = args.strokeColor || 'white';
        this.fillColor = args.fillColor || 'red';
    }

    addPoint(x, y) {
        this.points.push(createVector(x, y));
    }

    simplify(epsilon = 5) {
        this.points = simplifyPath(this.points, epsilon); // Simplifica los puntos
    }

    draw(t) {
        fill(this.fillColor);
        if (this.strokeColor) {
            stroke(this.strokeColor);
        } else {
            noStroke();
        }
        beginShape();
        this.points.forEach(p => vertex(p.x, p.y));
        endShape(CLOSE);
    }
}