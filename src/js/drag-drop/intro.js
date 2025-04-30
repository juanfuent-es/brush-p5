import { gsap } from "gsap";

export default class Intro {
    constructor() {
        this.startButton = document.querySelector("#start-btn");
        this.setTL();
        this.events();
    }

    events() {
        this.startButton.addEventListener("click", () => this.hide())
    }

    setTL() {
        this.tl = new gsap.timeline({
            paused: true
        }).from("#intro-info", {
            opacity: 0,
            y: '-100%'
        }, 0).from('.intro-item', {
            y: 30,
            opacity: 0,
            ease: 'power2.inout',
            stagger: 0.1
        }, .5).to("#footer-controls", {
            display: 'none',
            opacity: 0,
            y: '100%'
        }, 0)
    }

    show() {
        return this.tl.play()
    }

    hide() {
        return this.tl.reverse()
    }

}