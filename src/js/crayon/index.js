
import Line from "./line.js";
export default class Crayon {
    constructor() {
        this.lines = []
        this.current_line = null
        // buttons
        this.redoBtn = document.getElementById('redo-btn');
        this.eraseBtn = document.getElementById('erase-btn');
        //
        this.events()
    }

    events() {
        // p5 events
        window.mousePressed = (event) => this.addLine(event);
        window.mouseDragged = (event) => this.addPoint(event);
        // custom events
        this.redoBtn.addEventListener('click', () => this.redo());
        this.eraseBtn.addEventListener('click', () => this.erase());
    }

    redo() {
        // redo stuff
    }
    // reset lines
    erase() {
        this.lines = []
    }

    addLine() {
        this.current_line = new Line({
            stroke: color(random(255), random(255), random(255)),
            strokeWeight: random(1, 10),
        });
        this.lines.push(this.current_line);
    }

    addPoint(event) {
        const point = createVector(event.x, event.y);
        this.current_line.addPoint(point);
    }

    draw() {
        this.lines.forEach(line => line.draw());
    }
}