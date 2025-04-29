import gsap from "gsap";
export default class Preloader {
    constructor(args = {}) {
        this.duration = args.duration || 1;
        this.delay = args.delay || .5;
        this.preloader = document.querySelector('#preloader');
        this.header = document.querySelector('#main-header');
        this.footer = document.querySelector('#main-footer');
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
        if (this.header) {
            this.timeline.from(this.header, {
                duration: this.duration,
                y: '-100%',
                ease: 'power2.out'
            }, 0)
        }
        if (this.footer) {
            this.timeline.from(this.footer, {
                duration: this.duration / 2,
                y: '100%',
                ease: 'power2.out'
            }, this.duration * .8)
        }
    }

    show() {
        gsap.to(this.preloader, {
            duration: this.duration,
            delay: this.delay,
            y: '0%',
            display: 'flex',
            ease: 'power2.in'
        });
    }

    hide() {
        return this.timeline.play()
    }
}