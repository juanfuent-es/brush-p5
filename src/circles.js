import Circles from "./js/circles/index.js";

let circles;

window.setup = (event) => {
    circles = new Circles({
        palette: ['#A1A2A6', '#024959', '#F2C12E', '#F2AE30', '#593E25'],
        total_points: 3
    });
    createCanvas(windowWidth, windowHeight);
};

window.draw = (event) => {
    circles.draw()
};

window.windowResized = (event) => {
    resizeCanvas(windowWidth, windowHeight);
};