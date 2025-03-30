import Brush from './js/components/brush.js';

const brush = new Brush({
  totalPoints: 9,
  fillColor: 'rgba(255,255,255,0.5)'
});
let currentTrace = null;

window.setup = () => {
  createCanvas(windowWidth, windowHeight);
  background('black');

  // Eventos para manejar el brush
  window.addEventListener('pointerdown', () => {
    currentTrace = brush.addTrace();
  });

  window.addEventListener('pointerup', () => {
    if (currentTrace) {
      currentTrace = null;
    }
  });
};

window.draw = () => {
  // background(0, 10); // Fondo semitransparente para efecto de rastro
  brush.update({ x: mouseX, y: mouseY });
  brush.draw();
};

window.windowResized = () => {
  resizeCanvas(windowWidth, windowHeight);
  background('black'); // Reset background after resizing
};