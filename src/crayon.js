import Line from "./js/crayon/line.js";
export default class Crayon {
    constructor() {
        this.lines = []
        this.current_line = null
        this.redoBtn = document.getElementById('redo-btn');
        this.eraseBtn = document.getElementById('erase-btn');
        this.events()
    }

    events() {
        // p5 events
        window.mousePressed = (event) => this.addLine(event);
        window.mouseDragged = (event) => this.addPoint(event)
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
    addPoint(event) {
        const p = createVector(event.x, event.y);
        this.current_line.addPoint(p);
    }

    addLine() {
        this.current_line = new Line({
            stroke: color(random(255), random(255), random(255)),
            strokeWeight: random(1, 10),
        });
        this.lines.push(this.current_line);
    }

    draw() {
        this.lines.forEach(line => line.draw());
    }
}