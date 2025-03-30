import Trace from "./trace.js";

export default class Brush {
    constructor(totalPoints, fillColor) {
        this.traces = [];
        this.totalPoints = totalPoints;
        this.fillColor = fillColor;
        this.pointer_pressed = false;
        this.pointerEvents();
    }

    pointerEvents() {
        // Eventos para manejar el brush
        window.addEventListener('pointerdown', () => {
            this.pointer_pressed = this.addTrace();
        });

        window.addEventListener('pointerup', () => {
            if (this.pointer_pressed) {
                this.pointer_pressed = null;
            }
        });
    }

    addTrace() {
        const trace = new Trace(this.totalPoints, this.fillColor);
        this.traces.push(trace);
        return trace;
    }

    draw(target) {
        if (this.pointer_pressed) {
            this.traces.forEach((trace) => trace.update(target));
        }
        this.traces.forEach((trace) => trace.draw());
    }
}