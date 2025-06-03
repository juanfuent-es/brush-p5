import Puzzle from "./js/glass/puzzle.js";
import DigitalWorld from "./js/glass/digital-world.js";

const digital_world = new DigitalWorld();
const puzzle = new Puzzle(digital_world.world);

window.setup = (event) => {
    createCanvas(windowWidth, windowHeight);
}

// Redimensionar el canvas y el renderizador de Matter.js
window.windowResized = (event) => {
    resizeCanvas(windowWidth, windowHeight);
    digital_world.resize(windowWidth, windowHeight); // Crear el suelo nuevamente
};

// Dibujar en cada frame
window.draw = (event) => {
    background(255); // Limpiar el canvas
    digital_world.update(); // Actualizar el motor de Matter.js
    puzzle.draw(digital_world.bodies); // Dibujar los trazos
};

function deleteBodies() {
    digital_world.deleteBodies();
    puzzle.deleteShapes();
}