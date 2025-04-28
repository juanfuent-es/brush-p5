import Thread from "./js/light/thread.js";
let lightBrush;
const BACKGROUND = 'rgba(12,12,12,0.15)';
class LightBrush {
  constructor(args) {
    if (args === undefined) args = {};
    this.threads = [];
    this.totalThreads = args.threads || 20;
    this.setup();
  }

  setup() {
    this.threads = [];
    for (let i = 0; i < this.totalThreads; i++) {
      const _thread = new Thread({
        // spring: (Math.sin(i * 3) * 0.1) + 0.4
        spring: (Math.sin(i * 2) * .15) + .5
      });
      this.threads.push(_thread);
    }
  }

  draw(time) {
    for (let i = 0; i < this.threads.length; i++) {
      const thread = this.threads[i];
      thread.update();
      thread.render(time);
    }
  }
}
// p5.js setup function
window.setup = () => {
  createCanvas(windowWidth, windowHeight);
  lightBrush = new LightBrush({
    threads: 3
  });
  background('black');
};

// p5.js draw function
window.draw = () => {
  background(BACKGROUND);
  blendMode(HARD_LIGHT);
  lightBrush.draw();
};

// p5.js windowResized function
window.windowResized = () => {
  resizeCanvas(windowWidth, windowHeight);
  background('black'); // Reset background after resizing
};