import Point from "./components/point.js";

export default class MouseCursor {
    constructor(args = {}) {
        this.total_points = args.total_points || 10;
        this.palette = args.palette || ['#A1A2A6', '#024959', '#F2C12E', '#F2AE30', '#593E25'];
        this.bg = this.palette[Math.floor(Math.random() * this.palette.length)];
        this.points = [];
        for (let i = 1; i <= this.total_points; i++) {
            const randomColor = this.palette[Math.floor(Math.random() * this.palette.length)];
            const point = new Point({
                stroke: 0,
                fill: randomColor,
                size: 300 - (20 * i),
                friction: i * 0.1,
                alpha: 150
            })
            this.points.push(point);
        }
    }

    draw() {
        background(this.bg);
        for (let i = 0; i < this.points.length; i++) {
            blendMode(HARD_LIGHT);
            this.points[i].draw();
        }
    }
}