/* eslint-disable eqeqeq */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';

export function navAnimation() {
  gsap.registerPlugin(Flip);
  $('.nav_wrap').each(function () {
    const hamburgerEl = $(this).find('.nav_hamburger_wrap');
    const navLineEl = $(this).find('.nav_hamburger_line');
    const menuContainEl = $(this).find('.menu_contain');
    const flipItemEl = $(this).find('.nav_hamburger_base');
    const menuWrapEl = $(this).find('.menu_wrap');
    const menuBaseEl = $(this).find('.menu_base');
    const menuLinkEl = $(this).find('.menu_link');

    const flipDuration = 0.6;

    function flip(forwards) {
      const state = Flip.getState(flipItemEl);
      if (forwards) {
        flipItemEl.appendTo(menuContainEl);
      } else {
        flipItemEl.appendTo(hamburgerEl);
      }
      Flip.from(state, { duration: flipDuration });
    }

    const tl = gsap.timeline({ paused: true });
    tl.set(menuWrapEl, { display: 'flex' });
    tl.from(menuBaseEl, {
      opacity: 0,
      duration: flipDuration,
      ease: 'none',
      onStart: () => {
        flip(true);
      },
    });
    tl.to(navLineEl.eq(0), { y: 4, rotate: 45, duration: flipDuration }, '<');
    tl.to(navLineEl.eq(1), { y: -4, rotate: -45, duration: flipDuration }, '<');
    tl.from(menuLinkEl, {
      opacity: 0,
      yPercent: 50,
      duration: 0.2,
      stagger: { amount: 0.2 },
      onReverseComplete: () => {
        flip(false);
      },
    });

    function openMenu(open) {
      if (!tl.isActive()) {
        if (open) {
          tl.play();
          hamburgerEl.addClass('nav-open');
        } else {
          tl.reverse();
          hamburgerEl.removeClass('nav-open');
        }
      }
    }

    hamburgerEl.on('click', function () {
      if ($(this).hasClass('nav-open')) {
        openMenu(false);
      } else {
        openMenu(true);
      }
    });

    menuBaseEl.on('mouseenter', function () {
      openMenu(false);
    });
    menuBaseEl.on('click', function () {
      openMenu(false);
    });

    $(document).on('keydown', function (e) {
      if (e.key === 'Escape') {
        openMenu(false);
      }
    });
  });
}
