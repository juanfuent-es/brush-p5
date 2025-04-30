import Matter from "matter-js";
import decomp from "poly-decomp"; // Importar poly-decomp

export default class DigitalWorld {
    constructor() {
        Matter.Common.setDecomp(decomp);
        // Crear el motor y el mundo de Matter.js
        this.engine = Matter.Engine.create();
        this.world = this.engine.world;
        this.bodies = []; // Lista de cuerpos rígidos
        // Configurar el renderizador (opcional)
        this.render = Matter.Render.create({
            element: document.body,
            engine: this.engine,
            options: {
                width: window.innerWidth,
                height: window.innerHeight,
                wireframes: true,
            },
        });

        // Iniciar el motor y el renderizador
        Matter.Runner.run(this.engine);
        Matter.Render.run(this.render);

        this.adjustWalls();
        // Escuchar eventos
        this.setupEvents();
    }

    deleteBodies() {
        this.bodies.forEach((body) => {
            Matter.World.remove(this.world, body);
        });
        this.bodies = []; // Limpiar la lista de cuerpos
    }

    setupEvents() {
        window.addEventListener("finishShape", (event) => {
            const shape = event.detail.shape;
            if (shape) {
                const body = this.createBody(shape.points);
                shape.setBody(body); // Asignar el cuerpo al shape
            }
        });

        // Escuchar el evento de cambio de gravedad
        const gravityInput = document.querySelector("#gravity-input");
        if (gravityInput) {
            gravityInput.addEventListener("input", (event) => {
                this.changeGravity(event.target.value)
            });
        }
    }

    /**
     * Cambia la gravedad del mundo de Matter.js.
     * @param {number} value - Nuevo valor de gravedad.
     */
    changeGravity(value) {
        const gravityValue = parseFloat(value);
        this.engine.world.gravity.y = gravityValue;
        console.log("Gravedad actualizada a:", gravityValue);
    }

    resize() {
        this.render.options.width = window.innerWidth;
        this.render.options.height = window.innerHeight;
        this.adjustWalls();
    }

    /* Crea o actualiza un cuerpo rígido estático que actúa como el suelo. */
    adjustWalls() {
        // Eliminar las paredes existentes si ya están definidas
        if (this.walls) {
            this.walls.forEach((wall) => Matter.World.remove(this.world, wall));
        }
        // Obtener el alto del footer
        const footer = document.querySelector('#main-footer');
        const footerHeight = footer ? footer.offsetHeight : 0;

        // Crear nuevas paredes
        const thickness = 10; // Grosor de las paredes
        const width = window.innerWidth;
        const height = window.innerHeight - footerHeight; // Altura ajustada para excluir el footer

        const topWall = Matter.Bodies.rectangle(width / 2, -thickness / 2, width, thickness, { isStatic: true });
        const bottomWall = Matter.Bodies.rectangle(width / 2, height + thickness / 2, width, thickness, { isStatic: true });
        const leftWall = Matter.Bodies.rectangle(-thickness / 2, height / 2, thickness, height, { isStatic: true });
        const rightWall = Matter.Bodies.rectangle(width + thickness / 2, height / 2, thickness, height, { isStatic: true });

        // Agregar las paredes al mundo
        this.walls = [topWall, bottomWall, leftWall, rightWall];
        Matter.World.add(this.world, this.walls);
    }

    /**
     * Añade un nuevo cuerpo al mundo físico a partir de vértices.
     * @param {Array} vertices - Lista de vértices [{x, y}, {x, y}, ...].
     */
    createBody(vertices) {
        console.log("Añadiendo forma al mundo físico:", vertices);
        // Calcular el centroide de los vértices
        const centroid = this.calculateCentroid(vertices);
        // Calcular el área del cuerpo
        const area = this.calculatePolygonArea(vertices);
        // Ajustar propiedades físicas según el área
        const density = 10 * area; // Densidad proporcional al área
        const restitution = Math.max(0.1, 1 - area / 10000); // Menor restitución para áreas grandes
        const friction = Math.min(1, 0.1 + area / 5000); // Mayor fricción para áreas grandes

        // Crear el cuerpo en la posición del centroide
        let body = Matter.Bodies.fromVertices(
            centroid.x, // Posición inicial en X
            centroid.y, // Posición inicial en Y
            vertices,
            {
                density: density, // Densidad proporcional al área
                restitution: restitution, // Elasticidad ajustada
                friction: friction, // Fricción ajustada
            }
        );

        if (body) {
            console.log("Propiedades físicas asignadas:", {
                density,
                restitution,
                friction,
            });
            // Agregar el cuerpo al mundo
            Matter.World.add(this.world, body);
            this.bodies.push(body); // Guardar el cuerpo para sincronizarlo con p5.js
        }
        return body;
    }

    /**
     * Calcula el área de un polígono dado sus vértices.
     * @param {Array} vertices - Lista de vértices [{x, y}, {x, y}, ...].
     * @returns {number} - Área del polígono.
     */
    calculatePolygonArea(vertices) {
        let area = 0;
        const n = vertices.length;

        for (let i = 0; i < n; i++) {
            const current = vertices[i];
            const next = vertices[(i + 1) % n]; // El siguiente vértice (circular)
            area += current.x * next.y - next.x * current.y;
        }

        return Math.abs(area / 2); // Retornar el área absoluta
    }

    /**
     * Calcula el centroide de un conjunto de vértices.
     * @param {Array} vertices - Lista de vértices [{x, y}, {x, y}, ...].
     * @returns {Object} - Centroide {x, y}.
     */
    calculateCentroid(vertices) {
        const sum = vertices.reduce(
            (pos, vertex) => {
                pos.x += vertex.x;
                pos.y += vertex.y;
                return pos;
            }, { x: 0, y: 0 }
        );
        return {
            x: sum.x / vertices.length,
            y: sum.y / vertices.length,
        };
    }

    /**
     * Actualiza el motor físico en cada frame.
     */
    update() {
        Matter.Engine.update(this.engine);
    }
}