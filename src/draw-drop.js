import Preloader from "./js/components/preloader.js"
import Intro from "./js/drag-drop/intro.js"
import Pencil from "./js/drag-drop/pencil.js";
import DigitalWorld from "./js/drag-drop/digital-world.js";

const preloader = new Preloader();
const intro = new Intro();
const magic_crayon = new Pencil();
const world = new DigitalWorld();

window.setup = (event) => createCanvas(windowWidth, windowHeight);

window.addEventListener("load", () => {
    preloader.hide()
    intro.show()
});
// Redimensionar el canvas y el renderizador de Matter.js
window.windowResized = (event) => {
    resizeCanvas(windowWidth, windowHeight);
    world.resize(); // Crear el suelo nuevamente
};

// Dibujar en cada frame
window.draw = (event) => {
    background(255); // Limpiar el canvas
    world.update(); // Actualizar el motor de Matter.js
    magic_crayon.draw(world.bodies); // Dibujar los trazos
};