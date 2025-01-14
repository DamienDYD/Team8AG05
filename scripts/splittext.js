import { gsap } from 'gsap'
import SplitType from 'split-type'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger);

const white = new splitType('h4.white', { types: 'chars'})
const chars = white.chars

gsap.fromTo(
    chars,
    {
        y: 100,
        opacity: 0
    },
    {
        y: 0,
        opacity: 1,
        stagger: 0.05,
        duration: 2,
        ease: 'power4.out',
        ScrollTrigger: {
            trigger: '#product-description',
            start: 'top 80%',
            end: 'top 20%',
            scrub: true,
            markers: false,
            
            
        }
    }
);