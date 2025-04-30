import gsap from "gsap";
export default class Preloader {
    constructor(args = {}) {
        this.duration = args.duration || 1;
        this.delay = args.delay || .5;
        this.preloader = document.querySelector('#preloader');
        this.setTL();
    }

    setTL() {
        this.timeline = new gsap.timeline({
            paused: true, 
            delay: this.delay
        })
        this.timeline.to(this.preloader, {
            duration: this.duration,
            y: '-100%',
            display: 'none',
            ease: 'power2.out'
        }, this.delay)
    }

    show() {
        return this.timeline.duration(.65).reverse()
    }

    hide() {
        return this.timeline.duration(1.2).play()
    }
}