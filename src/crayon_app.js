import Preloader from "./preloader.js";
import Crayon from "./crayon.js";

const crayon = new Crayon()
const preloader = new Preloader();

window.setup = (event) => {
    createCanvas(windowWidth, windowHeight);
};

window.draw = (event) => {
    background(0);
    crayon.draw();
};

window.windowResized = (event) => {
    resizeCanvas(windowWidth, windowHeight);
};

window.addEventListener('load', () => preloader.hide());