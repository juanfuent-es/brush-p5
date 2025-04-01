import MouseCursor from "./js/mouse_cursor.js";

let circles;
window.setup = (event) => {
    circles = new MouseCursor({
        palette: ['#A1A2A6', '#024959', '#F2C12E', '#F2AE30', '#593E25'],
        total_points: 10
    });
    createCanvas(windowWidth, windowHeight);
};

window.draw = (event) => {
    circles.draw()
};

window.windowResized = (event) => {
    resizeCanvas(windowWidth, windowHeight);
};

// eventos de mouse

window.mousePressed = (e) => {
    // console.log(e);
};
window.mouseMoved = (e) => {
    // console.log(e);
};

window.mouseReleased = (e) => {
    // console.log(e);
};