window.setup = (event) => {
    createCanvas(windowWidth, windowHeight);
};

window.draw = (event) => {
    circles.draw()
};

window.windowResized = (event) => {
    resizeCanvas(windowWidth, windowHeight);
};