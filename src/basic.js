var mouse = {
    x: 0,
    y: 0
}
var friction = 0.1;
// p5.js setup function
window.setup = () => {
    createCanvas(windowWidth, windowHeight);
    background('black');
    mouse = createVector(mouseX, mouseY);
};

// p5.js draw function
window.draw = () => {
    mouse.x += (mouseX - mouse.x) * friction;
    mouse.y += (mouseY - mouse.y) * friction;
    background('black');
    text(mouseX + "," + mouseY, mouseX, mouseY);
    fill(255);
    ellipse(mouse.x, mouse.y, 10, 10);
};

// p5.js windowResized function
window.windowResized = () => {
  resizeCanvas(windowWidth, windowHeight);
  background('black'); // Reset background after resizing
};