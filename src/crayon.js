import Preloader from "./js/components/preloader.js";
import Crayon from "./js/crayon/index.js";

const crayon = new Crayon()
const preloader = new Preloader();

window.setup = (event) => createCanvas(windowWidth, windowHeight);
// Definición de eventos en una sóla línea
window.windowResized = (event) => resizeCanvas(windowWidth, windowHeight);
window.addEventListener('load', () => preloader.hide());

// RAF: Request Animation Frame
// https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
window.draw = (event) => {
    background(0);
    crayon.draw();
};