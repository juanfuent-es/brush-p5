export default class Preloader {
    constructor() {
        this.preloader = document.getElementById('preloader');
    }

    show() {
        gsap.to(this.preloader, {
            duration: 1,
            y:'0%',
            ease: 'power2.out'
        });
    }

    hide() {
        gsap.to(this.preloader, {
            duration: 1,
            delay: .5,
            y:'-100%',
            display: 'none',
            ease: 'power2.out'
        });
    }
}