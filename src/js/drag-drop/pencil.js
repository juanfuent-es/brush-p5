import Matter from "matter-js";
import Shape from "./shape.js";

export default class Pencil {
    constructor() {
        this.shapes = []; // Lista de trazos (Shape)
        this.active_shape = null; // Trazo activo
        this.fillColor = "#000000"; // Color de relleno por defecto
        this.toggleStrokeBtn = document.getElementById("toggle-stroke-btn");
        this.colorLabel = document.querySelector("label#color-label");
        this.colorInput = document.querySelector("input#color-input");

        this.events();
    }

    /* Configura los eventos de interacción. */
    events() {
        // Eventos de p5.js
        window.mousePressed = () => this.startShape();
        window.mouseDragged = (event) => this.addPointToShape(event);
        window.mouseReleased = () => this.endShape();

        this.colorInput.addEventListener("input", (event) => this.updateColor(event));
        this.toggleStrokeBtn.addEventListener("click", () => this.toggleStroke());
    }

    /* Inicia un nuevo trazo. */
    startShape() {
        const footer = document.querySelector('#main-footer'); // Seleccionar el footer
        const isFooterHovered = footer.matches(':hover')

        if (!isFooterHovered) {
            // Inicializar una nueva forma si el cursor no está sobre el footer
            this.active_shape = new Shape({
                fillColor: this.fillColor,
                strokeColor: this.strokeEnabled ? 'black' : null, // Asignar stroke según el estado
            });
            this.active_shape.fillColor = this.fillColor; // Asignar el color actual al nuevo shape
            this.shapes.push(this.active_shape);
        }
    }
    /* Alterna entre stroke y noStroke para los shapes */
    toggleStroke() {
        this.strokeEnabled = !this.strokeEnabled;
        console.log(`Stroke ${this.strokeEnabled ? "habilitado" : "deshabilitado"}`);
        this.shapes.forEach((shape) => {
            shape.strokeColor = this.strokeEnabled ? 'black' : null;
        });
        if (this.strokeEnabled) {
            this.toggleStrokeBtn.classList.add("active");
        } else {
            this.toggleStrokeBtn.classList.remove("active");
        }
    }
    /**
     * Añade un punto al trazo activo.
     * @param {MouseEvent} event - Evento del mouse.
     */
    addPointToShape(event) {
        if (this.active_shape) {
            this.active_shape.addPoint(event.x, event.y);
        }
    }

    /* Finaliza el trazo activo */
    endShape() {
        if (!this.active_shape) return;
        if (!this.isShapeValid(this.active_shape)) {
            return this.discardShape();
        }
        this.active_shape.simplify(1); // Simplifica el trazo al finalizar
        // Disparar el evento personalizado 'finishShape' para crear un 'body' en matter
        this.dispatchFinishShapeEvent(this.active_shape);
        // Resetear el Shape activo
        this.active_shape = null;
    }

    /**
     * Valida si un Shape es válido (tiene al menos 3 vértices).
     * @param {Shape} shape - El Shape a validar.
     * @returns {boolean} - `true` si el Shape es válido, `false` en caso contrario.
     */
    isShapeValid(shape) {
        return shape.points.length >= 3;
    }

    /**
     * Descarta el Shape activo si no es válido.
     */
    discardShape() {
        console.warn("El trazo tiene menos de 3 vértices y será descartado.");
        this.shapes.pop(); // Eliminar el Shape inválido de la lista
        this.active_shape = null; // Resetear el Shape activo
    }

    /**
     * Dispara el evento personalizado 'finishShape'.
     * @param {Shape} shape - El Shape que se ha finalizado.
     */
    dispatchFinishShapeEvent(shape) {
        const event = new CustomEvent("finishShape", {
            detail: { shape },
        });
        window.dispatchEvent(event);
    }

    /**
     * Actualiza las posiciones de los shapes con base en los cuerpos de Matter.js.
     * @param {Array} bodies - Lista de cuerpos de Matter.js.
     */
    updateShapesFromBodies(bodies) {
        this.shapes.forEach((shape, index) => {
            const body = bodies[index];
            if (body) {
                // Actualizar los puntos del Shape con las posiciones de los vértices del cuerpo
                shape.points = body.vertices.map((vertex) => ({
                    x: vertex.x,
                    y: vertex.y,
                }));
            }
        });
    }

    /**
     * Dibuja todos los trazos en el canvas.
     * @param {Array} bodies - Lista de cuerpos de Matter.js.
     */
    draw(bodies) {
        const time = window.millis() / 10000; // Obtener el tiempo actual
        this.updateShapesFromBodies(bodies); // Sincronizar shapes con Matter.js
        this.shapes.forEach((shape, i) => shape.draw(time + i)); // Dibujar los shapes
    }

    /* Borra todos los trazos. */
    deleteShapes() {
        this.shapes = [];
    }
     /* Actualiza el color de relleno */
    updateColor(event) {
        this.fillColor = event.target.value;
        console.log("Nuevo color de relleno:", this.fillColor);
        this.colorLabel.style.backgroundColor = this.fillColor;
    }
}