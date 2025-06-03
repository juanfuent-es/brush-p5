import { Engine, World, Bodies } from 'matter-js';
import { PuzzlePiece } from './PuzzlePiece.js';

export class PhysicsPuzzle {
    constructor() {
        console.log('Initializing PhysicsPuzzle');
        this.engine = Engine.create({
            gravity: { x: 0, y: 1 }
        });
        this.world = this.engine.world;
        this.pieces = [];
        this.setupPhysics();
        this.loadPuzzlePieces();
    }

    setupPhysics() {
        console.log('Setting up physics world');
        // Add ground
        const ground = Bodies.rectangle(
            windowWidth / 2,
            windowHeight + 50,
            windowWidth,
            100,
            { 
                isStatic: true,
                friction: 0.3,
                restitution: 0.2,
                render: { visible: false }
            }
        );
        World.add(this.world, ground);

        // Add walls
        const wallOptions = { 
            isStatic: true,
            friction: 0.3,
            restitution: 0.2,
            render: { visible: false }
        };
        const leftWall = Bodies.rectangle(-50, windowHeight / 2, 100, windowHeight, wallOptions);
        const rightWall = Bodies.rectangle(windowWidth + 50, windowHeight / 2, 100, windowHeight, wallOptions);
        World.add(this.world, [leftWall, rightWall]);
        console.log('Physics world setup complete');
    }

    loadPuzzlePieces() {
        console.log('Loading puzzle pieces from SVG');
        const svg = document.getElementById('glass-puzzle');
        if (!svg) {
            console.error('SVG element not found');
            return;
        }
        console.log('Found SVG element:', svg);

        const paths = svg.querySelectorAll('path, polygon');
        console.log('Found paths/polygons:', paths.length);
        
        if (!paths.length) {
            console.error('No paths or polygons found in SVG');
            return;
        }
        
        paths.forEach((path, index) => {
            try {
                console.log(`Processing element ${index}:`, path.tagName);
                let points = [];
                
                if (path.tagName === 'PATH') {
                    const d = path.getAttribute('d');
                    if (!d) {
                        console.warn('Path has no d attribute:', path);
                        return;
                    }
                    console.log('Path data:', d);
                    points = this.pathToPoints(d);
                } else if (path.tagName === 'POLYGON') {
                    const pointsAttr = path.getAttribute('points');
                    if (!pointsAttr) {
                        console.warn('Polygon has no points attribute:', path);
                        return;
                    }
                    console.log('Polygon points:', pointsAttr);
                    points = pointsAttr.split(' ');
                }
                
                console.log(`Extracted points for element ${index}:`, points);
                
                if (points && points.length > 0) {
                    const piece = new PuzzlePiece(points);
                    this.pieces.push(piece);
                    if (piece.body) {
                        World.add(this.world, piece.body);
                        console.log(`Added piece ${index} to world`);
                    }
                }
            } catch (error) {
                console.error(`Error processing element ${index}:`, error);
            }
        });
        
        console.log('Total pieces created:', this.pieces.length);
    }

    pathToPoints(d) {
        console.log('Converting path to points:', d);
        const commands = d.split(/(?=[MLHVCSQTAZmlhvcsqtaz])/);
        const points = [];
        let currentX = 0;
        let currentY = 0;
        
        commands.forEach(cmd => {
            if (!cmd) return;
            
            const type = cmd[0];
            const coords = cmd.slice(1).trim().split(/[\s,]+/).map(Number);
            
            if (type === 'M' || type === 'L') {
                if (coords.length >= 2) {
                    currentX = coords[0];
                    currentY = coords[1];
                    points.push(`${currentX} ${currentY}`);
                }
            } else if (type === 'H') {
                if (coords.length >= 1) {
                    currentX = coords[0];
                    points.push(`${currentX} ${currentY}`);
                }
            } else if (type === 'V') {
                if (coords.length >= 1) {
                    currentY = coords[0];
                    points.push(`${currentX} ${currentY}`);
                }
            } else if (type === 'Z' || type === 'z') {
                // Close the path by connecting to the first point
                if (points.length > 0) {
                    points.push(points[0]);
                }
            }
        });
        
        console.log('Converted points:', points);
        return points;
    }

    update() {
        Engine.update(this.engine);
    }

    draw() {
        if (this.pieces.length === 0) {
            console.warn('No pieces to draw');
            return;
        }
        this.pieces.forEach((piece, index) => {
            try {
                piece.draw();
            } catch (error) {
                console.error(`Error drawing piece ${index}:`, error);
            }
        });
    }
} 