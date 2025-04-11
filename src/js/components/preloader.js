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
            y:'-100%',
            display: 'none',
            ease: 'power2.out'
        });
    }
}