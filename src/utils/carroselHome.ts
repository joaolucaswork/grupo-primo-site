/* eslint-disable eqeqeq */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Swiper from 'swiper';
import { EffectFade } from 'swiper/modules';

export function carroselHome() {
  gsap.registerPlugin(ScrollTrigger);

  // Função para animar os slides ao carregar a página
  function animateSlides() {
    let mainTl = gsap.timeline({ delay: 0 });

    // Animação do hero (entrada do site)
    $('.hero_wrap').each(function () {
      let heroMask = $(this).find('.hero_mask');
      let heroImg = $(this).find('.hero_img');
      let heroTl = gsap.timeline({ defaults: { duration: 1, ease: 'power2.inOut' } });

      heroTl.set(heroMask, { opacity: 1 });
      heroTl.from(heroMask, { y: '100vh' });
      heroTl.from(heroImg, { y: '-100vh' }, '<');
      heroTl.fromTo(
        heroMask,
        { clipPath: 'inset(calc(50% - 20vw) calc(50% - 20vw) round 1.25rem)' },
        { clipPath: 'inset(calc(0% - 0vw) calc(0% - 0vw) round 1.25rem)' }
      );

      mainTl.add(heroTl);
    });

    // Seleciona os slides com a classe "is-tab"
    const initialSlides = document.querySelectorAll('.swiper-slide.is-tab');

    // Define a posição inicial e visibilidade dos slides
    gsap.set(initialSlides, {
      x: 300,
      opacity: 0,
      visibility: 'hidden',
    });

    // Adiciona as animações dos slides à timeline principal
    mainTl.to(initialSlides, {
      x: 0,
      opacity: 1,
      visibility: 'visible',
      stagger: { each: 0.2, from: 'start' },
      ease: 'power2.out',
      duration: 1,
    });

    // Seleciona o elemento com a classe "eco_main_content"
    const ecoMainContent = document.querySelector('.eco_main_content');

    // Define a opacidade inicial e visibilidade do eco_main_content
    gsap.set(ecoMainContent, {
      opacity: 0,
      y: 50,
      visibility: 'hidden',
    });

    // Adiciona a animação do eco_main_content após as animações anteriores
    mainTl.to(
      ecoMainContent,
      {
        opacity: 1,
        y: 0,
        visibility: 'visible',
        duration: 0.5,
        ease: 'power2.out',
      },
      '-=2'
    );
  }

  // Chama a função de animação quando a página carregar
  window.addEventListener('load', animateSlides);

  // Inicialização dos Swipers
  let noticiasSwiper;
  let podContentSwiper;

  function initNoticasSwiper() {
    const swiperContainer = document.querySelector('.swiper.is-noticias');
    if (!swiperContainer) return;

    const slideCount = swiperContainer.querySelectorAll(
      '.swiper-slide:not(.swiper-slide-hidden)'
    ).length;

    if (noticiasSwiper) {
      noticiasSwiper.params.slidesPerView = Math.min(slideCount, 2);
      noticiasSwiper.update();
    } else {
      noticiasSwiper = new Swiper('.swiper.is-noticias', {
        slidesPerView: Math.min(slideCount, 2),
        loop: false,
        observer: true,
        mousewheel: true,
        centerInsufficientSlides: true,
        observeParents: true,
        centeredSlidesBounds: true,
        keyboard: true,
        navigation: {
          nextEl: '.arrow.is-right.news',
          prevEl: '.arrow.is-left.news',
        },
        on: {
          init: function () {
            updateNavigationVisibility(this, 'news');
          },
          slideChange: function () {
            updateNavigationVisibility(this, 'news');
          },
        },
      });
    }

    updateNavigationVisibility(noticiasSwiper, 'news');
  }

  function initPodContentSwiper() {
    const swiperContainer = document.querySelector('.swiper.is-pod-content');
    if (!swiperContainer) return;

    const slideCount = swiperContainer.querySelectorAll(
      '.swiper-slide:not(.swiper-slide-hidden)'
    ).length;

    if (podContentSwiper) {
      podContentSwiper.params.slidesPerView = Math.min(slideCount, 2);
      podContentSwiper.update();
    } else {
      podContentSwiper = new Swiper('.swiper.is-pod-content', {
        slidesPerView: Math.min(slideCount, 2),
        loop: false,
        observer: true,
        mousewheel: true,
        centerInsufficientSlides: true,
        observeParents: true,
        centeredSlidesBounds: true,
        keyboard: true,
        navigation: {
          nextEl: '.arrow.is-right.pod',
          prevEl: '.arrow.is-left.pod',
        },
        on: {
          init: function () {
            updateNavigationVisibility(this, 'pod');
          },
          slideChange: function () {
            updateNavigationVisibility(this, 'pod');
          },
        },
      });
    }

    updateNavigationVisibility(podContentSwiper, 'pod');
  }

  function updateNavigationVisibility(swiper, type) {
    const nextButton = document.querySelector(`.arrow.is-right.${type}`);
    const prevButton = document.querySelector(`.arrow.is-left.${type}`);

    if (nextButton) nextButton.style.display = swiper.isEnd ? 'none' : '';
    if (prevButton) prevButton.style.display = swiper.isBeginning ? 'none' : '';
  }

  function handleFilterChange() {
    // Destruir e reinicializar o swiper de notícias
    if (noticiasSwiper) {
      noticiasSwiper.destroy(true, true);
      noticiasSwiper = null;
    }

    // Destruir e reinicializar o swiper de pod content
    if (podContentSwiper) {
      podContentSwiper.destroy(true, true);
      podContentSwiper = null;
    }

    setTimeout(() => {
      initNoticasSwiper();
      initPodContentSwiper();
    }, 300);
  }

  document.addEventListener('DOMContentLoaded', () => {
    initNoticasSwiper();
    initPodContentSwiper();

    const filterSelect = document.querySelector('[fs-cmsfilter-field="tipo"]');
    if (filterSelect) filterSelect.addEventListener('change', handleFilterChange);

    document.querySelectorAll('.fs-select_link-1').forEach((link) => {
      link.addEventListener('click', handleFilterChange);
    });
  });
}
