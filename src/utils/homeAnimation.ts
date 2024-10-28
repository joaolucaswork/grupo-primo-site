/* eslint-disable eqeqeq */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import 'swiper/css/bundle';
import 'lenis/dist/lenis.css';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import Swiper from 'swiper';
import { EffectFade } from 'swiper/modules';

export function homeAnimation() {
  gsap.registerPlugin(ScrollTrigger);

  const lenis = new Lenis({
    wrapper: window,
    content: document.documentElement,
    smoothWheel: true,
    lerp: 0.1,
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    touchMultiplier: 1.5,
    infinite: false,
    autoResize: true,
  });

  const vagasSwiper = new Swiper('.swiper.is-vagas', {
    direction: 'vertical',
    slidesPerView: 'auto',
    freeMode: true,
    mousewheel: true,
    nested: true,
  });

  const infoSwiper = new Swiper('.swiper.is-vagas-content', {
    modules: [EffectFade],
    slidesPerView: 1,
    effect: 'fade',
    fadeEffect: { crossFade: true },
    allowTouchMove: false,
    scrollbar: {
      el: '.swiper-scrollbar',
      draggable: true,
    },
  });

  const vagasItems = document.querySelectorAll('.swiper-wrapper.is-vagas .swiper-slide.is-vagas');

  const scrollToItem = (item) => {
    lenis.scrollTo(item, {
      offset: -window.innerHeight / 2 + item.offsetHeight / 2,
      duration: 1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  };

  ScrollTrigger.create({
    trigger: '.swiper.is-vagas',
    start: 'top 20%',
    end: 'bottom 80%',
    scrub: true,
    onUpdate: (self) => {
      const itemIndex = Math.floor(self.progress * (vagasItems.length - 1));

      infoSwiper.slideTo(itemIndex, 300);
      vagasSwiper.slideTo(itemIndex, 300);

      vagasItems.forEach((item, index) => {
        const isActive = index === itemIndex;
        gsap.to(item, { opacity: isActive ? 1 : 0.5, duration: 0.3 });

        const button = item.querySelector('.button.is-vagas');
        if (button) {
          gsap.to(button, {
            width: isActive ? '11.38rem' : '9rem',
            backgroundColor: isActive ? '#ffffff' : 'transparent',
            color: isActive ? '#000000' : 'white',
            duration: 0.3,
          });
        }
      });
    },
  });

  vagasItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      infoSwiper.slideTo(index, 300);
      vagasSwiper.slideTo(index, 300);
      scrollToItem(item);
    });
  });

  // Corrected animation loop
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  // Connect GSAP ScrollTrigger to Lenis
  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);
}
