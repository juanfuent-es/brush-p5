export default class Preloader {
    constructor() {
        this.preloader = document.getElementById('preloader');
    }

    show() {
        gsap.to(this.preloader, {
            duration: 1,
            y:'0%',
            display: 'flex',
            ease: 'power2.in'
        });
    }

    hide() {
        gsap.to(this.preloader, {
            duration: .45,
            delay: .5,
            // x:'-100%',
            // y:'-100%',
            scaleX: 1.5,
            scaleY: 1.5,
            opacity: 0,
            display: 'none',
            ease: 'power2.out'
        });
    }
}