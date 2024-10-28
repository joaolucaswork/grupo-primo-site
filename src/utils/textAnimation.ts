/* eslint-disable eqeqeq */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

export function textAnimation() {
  gsap.registerPlugin(ScrollTrigger);

  // Split text into spans
  let typeSplit = new SplitType('[text-split]', {
    types: 'words, chars',
    tagName: 'span',
  });

  // Link timelines to scroll position
  function createScrollTrigger(triggerElement, timeline) {
    // Reset tl when scroll out of view past bottom of screen
    ScrollTrigger.create({
      trigger: triggerElement,
      start: 'top bottom',
      onLeaveBack: () => {
        timeline.progress(0);
        timeline.pause();
      },
    });
    // Play tl when scrolled into view (60% from top of screen)
    ScrollTrigger.create({
      trigger: triggerElement,
      start: 'top 60%',
      onEnter: () => timeline.play(),
    });
  }

  $('[words-slide-up]').each(function (index) {
    let tl = gsap.timeline({ paused: true });
    tl.from($(this).find('.word'), {
      opacity: 0,
      yPercent: 100,
      duration: 0.5,
      ease: 'back.out(2)',
      stagger: { amount: 0.5 },
    });
    createScrollTrigger($(this), tl);
  });

  $('[letters-slide-up]').each(function (index) {
    let tl = gsap.timeline({ paused: true });
    tl.from($(this).find('.char'), {
      yPercent: 100,
      duration: 0.2,
      ease: 'power1.out',
      stagger: { amount: 0.6 },
    });
    createScrollTrigger($(this), tl);
  });

  $('[letters-slide-down]').each(function (index) {
    let tl = gsap.timeline({ paused: true });
    tl.from($(this).find('.char'), {
      yPercent: -120,
      duration: 0.3,
      ease: 'power1.out',
      stagger: { amount: 0.7 },
    });
    createScrollTrigger($(this), tl);
  });

  $('[letters-fade-in]').each(function (index) {
    let tl = gsap.timeline({ paused: true });
    tl.from($(this).find('.char'), {
      opacity: 0,
      duration: 0.2,
      ease: 'power1.out',
      stagger: { amount: 0.8 },
    });
    createScrollTrigger($(this), tl);
  });

  $('[scrub-each-word]').each(function (index) {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: $(this),
        start: 'top 30%', // Quando a animação começa
        end: 'bottom end', // Faz a animação terminar exatamente no final do scroll
        scrub: 2, // Torna a animação mais suave e lenta
      },
    });
    tl.from($(this).find('.word'), {
      opacity: 0.2,
      duration: 2, // Aumenta o tempo de duração da animação
      ease: 'power1.out',
      stagger: { each: 0.6 }, // Deixa a animação mais espaçada e lenta entre os elementos
    });
    tl.to(
      ['.section_about_home', '.section-text-min', '.section-spacer'],
      {
        color: 'white',
        backgroundColor: '#ff4900', // Altera a cor de fundo
        duration: 0.4, // Define a duração da transição de cor
      },
      '-=0.7'
    ); // Inicia um pouco antes do fim do scroll
  });

  // Avoid flash of unstyled content
  gsap.set('[text-split]', { opacity: 1 });
}
