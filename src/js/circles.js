import Point from "./components/point.js";

export default class Circles {
    constructor(args = {}) {
        this.total_points = args.total_points || 10;
        this.palette = args.palette || ['#A1A2A6', '#024959', '#F2C12E', '#F2AE30', '#593E25'];
        this.bg = this.palette[Math.floor(Math.random() * this.palette.length)];
        this.circles = [];
        this.max_friction = args.friction || .1
        this.max_size = args.size || 100
        this.setup()
    }

    setup() {
        const alpha_step = 255 / this.total_points
        const friction_step = this.max_friction / this.total_points
        const size_step = this.max_size / this.total_points
        console.log("size_step", size_step)
        for (let i = this.total_points; i > 0; i--) {
            const randomColor = this.palette[Math.floor(Math.random() * this.palette.length)];
            const point = new Point({
                stroke: 0,
                fill: randomColor,
                size: this.max_size - (size_step * i),
                friction: i * friction_step,
                alpha: i * alpha_step
            })
            this.circles.push(point);
        }
    }

    draw() {
        background(this.bg)
        for (let i = 0; i < this.circles.length; i++) {
            blendMode(HARD_LIGHT);
            this.circles[i].draw();
        }
    }
}