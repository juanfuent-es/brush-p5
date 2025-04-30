import Preloader from "./js/components/preloader.js"
import Intro from "./js/drag-drop/intro.js"
import Pencil from "./js/drag-drop/pencil.js";
import DigitalWorld from "./js/drag-drop/digital-world.js";

const preloader = new Preloader();
const intro = new Intro();
const digital_world = new DigitalWorld();
const magic_pencil = new Pencil(digital_world.world);

window.setup = (event) => {
    createCanvas(windowWidth, windowHeight);
    const eraseBtn = document.getElementById("erase-btn");
    eraseBtn.addEventListener("click", () => deleteBodies());
}

window.addEventListener("load", () => {
    preloader.hide()
    intro.show()
});
// Redimensionar el canvas y el renderizador de Matter.js
window.windowResized = (event) => {
    resizeCanvas(windowWidth, windowHeight);
    digital_world.resize(windowWidth, windowHeight); // Crear el suelo nuevamente
};

// Dibujar en cada frame
window.draw = (event) => {
    background(255); // Limpiar el canvas
    digital_world.update(); // Actualizar el motor de Matter.js
    magic_pencil.draw(digital_world.bodies); // Dibujar los trazos
};

function deleteBodies() {
    digital_world.deleteBodies();
    magic_pencil.deleteShapes();
}