import Thread from "./js/light/thread.js";
let lightBrush;
var a = 0;
class LightBrush {
  constructor(args) {
    if (args === undefined) args = {};
    this.bg = 'rgba(12,12,12,0.1)';
    this.threads = [];
    this.mouse = createVector(mouseX, mouseY);
    this.totalThreads = args.threads || 20;
    this.setup();
  }

  setup() {
    this.threads = [];
    for (let i = 0; i < this.totalThreads; i++) {
      const _thread = new Thread({
        // spring: (Math.sin(i * 3) * 0.1) + 0.4
        spring: (Math.sin(i * 3) * .25) + .5
      });
      this.threads.push(_thread);
    }
  }

  draw(time) {
    background(this.bg);
    this.mouse.x = mouseX;
    this.mouse.y = mouseY;
    for (let i = 0; i < this.threads.length; i++) {
      const thread = this.threads[i];
      thread.update(this.mouse);
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
  const time = millis() / 1000; // Time in seconds
  lightBrush.draw(time);
};

// p5.js windowResized function
window.windowResized = () => {
  resizeCanvas(windowWidth, windowHeight);
  background('black'); // Reset background after resizing
};