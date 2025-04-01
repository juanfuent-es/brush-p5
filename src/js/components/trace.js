import Point from "./point.js";
export default class Trace {
    constructor(args = {}) {
        this.points = [];
        const totalPoints = args.totalPoints || 10;
        this.active = true; // Define si el trace debe actualizarse
        for (let i = 0; i < totalPoints; i++) {
            this.points.push(
                new Point({
                    x: mouseX,
                    y: mouseY,
                    friction: i * 0.2 + 0.05,
                    fill: args.fillColor,
                })
            );
        }
    }

    update(target) {
        if (this.active) {
            this.points.forEach((point) => point.update(target));
        }
    }

    draw() {
        noFill();
        stroke(255);
        strokeWeight(2);
        beginShape();
        this.points.forEach((point) => {
            vertex(point.position.x, point.position.y);
            point.draw();
        });
        endShape();
    }
}