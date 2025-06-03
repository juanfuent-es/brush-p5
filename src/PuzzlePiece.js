import { Bodies, Body } from 'matter-js';

export class PuzzlePiece {
    constructor(points, options = {}) {
        this.points = points;
        this.options = {
            isStatic: false,
            restitution: 0.6,
            friction: 0.1,
            ...options
        };
        this.body = null;
        this.createBody();
    }

    createBody() {
        try {
            console.log('Creating body with points:', this.points);
            
            // Convert SVG points to Matter.js vertices
            const vertices = this.points.map(point => {
                const [x, y] = point.split(' ').map(Number);
                // Scale points to cover the screen
                return {
                    x: (x / 1282.85) * windowWidth,
                    y: (y / 1026.42) * windowHeight
                };
            });

            console.log('Converted vertices:', vertices);

            // Ensure we have at least 3 vertices for a valid polygon
            if (vertices.length < 3) {
                console.warn('Not enough vertices for physics body:', vertices);
                return;
            }

            // Create the physics body with a small offset from center
            this.body = Bodies.fromVertices(
                windowWidth / 2 + (Math.random() - 0.5) * 100,
                windowHeight / 4,
                [vertices],
                {
                    ...this.options,
                    chamfer: { radius: 5 } // Add some rounding to the corners
                }
            );

            console.log('Created physics body:', this.body);

            // Add some random rotation
            Body.setAngularVelocity(this.body, (Math.random() - 0.5) * 0.1);
        } catch (error) {
            console.error('Error creating physics body:', error);
        }
    }

    draw() {
        if (!this.body) {
            console.warn('Cannot draw: body is null');
            return;
        }

        push();
        translate(this.body.position.x, this.body.position.y);
        rotate(this.body.angle);
        
        fill(0); // Black fill
        stroke(255); // White stroke
        strokeWeight(2);
        
        beginShape();
        this.points.forEach(point => {
            const [x, y] = point.split(' ').map(Number);
            // Scale points to cover the screen
            vertex((x / 1282.85) * windowWidth, (y / 1026.42) * windowHeight);
        });
        endShape(CLOSE);
        pop();
    }
} 