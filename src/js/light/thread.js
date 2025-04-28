import Vertex from "./vertex.js";

export default class Thread {
    constructor(args = {}) {
        this.spring = args.spring || (Math.random() * 0.1) + 0.4;
        this.size = args.size || 50;
        this.vertex = [];
        this.lineWidth = Math.random() * window.devicePixelRatio;
        this.hsl = 'hsl(360, 100%, 100%)';

        // Initialize vertices at screen center
        this.setVertices();
    }

    setVertices() {
        for (let i = 0; i < this.size; i++) {
            this.vertex.push(new Vertex(width / 2, height / 2));
        }
    }

    update() {
        let pos = createVector(mouseX, mouseY);
        let spring = this.spring;
        for (let i = 0; i < this.vertex.length; i++) {
            const vtx = this.vertex[i];
            vtx.integration(pos, spring);
            vtx.vel.mult(0.5);
            vtx.pos.add(vtx.vel);
            spring *= 0.99;
            pos = this.vertex[i].pos;
        }
    }

    HSL(t) {
        const hue = Math.floor(Math.abs(Math.sin(t + this.lineWidth) * 260)) + 100;
        const sat = Math.floor(Math.abs(Math.cos(t - this.lineWidth) * 50)) + 50;
        const light = Math.floor(Math.abs(Math.sin(t) * 50)) + 50;
        return `hsl(${hue}, ${sat}%, ${light}%)`;
    }

    render() {
        const t = millis() / 10000; // Time in seconds
        let a = this.vertex[0];
        let b = this.vertex[1];

        push();
        beginShape();
        stroke(this.HSL(t));
        strokeWeight(this.lineWidth);
        noFill();

        // Start the path
        vertex(a.pos.x, a.pos.y);

        // Create quadratic curves between vertices
        for (let i = 1; i < this.vertex.length - 2; i++) {
            a = this.vertex[i];
            b = this.vertex[i + 1];
            const endPoint = a.quadTo(b);
            quadraticVertex(a.pos.x, a.pos.y, endPoint.x, endPoint.y);
        }

        // Final curve
        a = b;
        b = this.vertex[this.vertex.length - 1];
        quadraticVertex(a.pos.x, a.pos.y, b.pos.x, b.pos.y);

        endShape();
        pop();
    }
}