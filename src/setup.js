import Brush from './js/components/brush.js';

const brush = new Brush({
  totalPoints: 9,
  fillColor: 'rgba(255,255,255,0.5)'
});

window.setup = () => {
  createCanvas(windowWidth, windowHeight);
  background('black');
};

window.draw = () => {
  // background(0, 10); // Fondo semitransparente para efecto de rastro
  brush.draw({ x: mouseX, y: mouseY });
};

window.windowResized = () => {
  resizeCanvas(windowWidth, windowHeight);
  background('black'); // Reset background after resizing
};