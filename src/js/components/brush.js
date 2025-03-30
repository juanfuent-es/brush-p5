import Trace from "./trace.js";

export default class Brush {
    constructor(totalPoints, fillColor) {
        this.traces = [];
        this.totalPoints = totalPoints;
        this.fillColor = fillColor;
    }

    addTrace() {
        const trace = new Trace(this.totalPoints, this.fillColor);
        this.traces.push(trace);
        return trace;
    }

    update(target) {
        this.traces.forEach((trace) => trace.update(target));
    }

    draw() {
        this.traces.forEach((trace) => trace.draw());
    }
}