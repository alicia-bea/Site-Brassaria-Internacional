/* Carrossel da página inicial: troca de slides, setas, bolinhas e autoplay
 * (pausa com mouse/foco e respeita prefers-reduced-motion).
 * (Estilos: css/components/carousel.css) */

export function iniciarCarrossel() {
  const carousel = document.querySelector('.hero-carousel');
  if (carousel) {
    const slides = [...carousel.querySelectorAll('.carousel-slide')];
    slides.forEach(slide => {
      const image = slide.dataset.image;
      if (!image) return;
      const probe = new Image();
      probe.onload = () => { slide.style.backgroundImage = `linear-gradient(90deg, rgba(20,27,14,.88), rgba(20,27,14,.18)), url("${image}")`; };
      probe.src = image;
    });
    const dots = [...carousel.querySelectorAll('.carousel-dots button')];
    let active = 0;
    let timer;
    const show = index => {
      active = (index + slides.length) % slides.length;
      slides.forEach((slide, i) => {
        slide.classList.toggle('is-active', i === active);
        slide.setAttribute('aria-hidden', String(i !== active));
        slide.querySelectorAll('a').forEach(a => a.tabIndex = i === active ? 0 : -1);
      });
      dots.forEach((dot, i) => {
        dot.classList.toggle('is-active', i === active);
        if (i === active) dot.setAttribute('aria-current', 'true');
        else dot.removeAttribute('aria-current');
      });
    };
    const autoplay = () => {
      clearInterval(timer);
      if (!matchMedia('(prefers-reduced-motion: reduce)').matches) timer = setInterval(() => show(active + 1), 6000);
    };
    carousel.querySelector('.carousel-prev').addEventListener('click', () => { show(active - 1); autoplay(); });
    carousel.querySelector('.carousel-next').addEventListener('click', () => { show(active + 1); autoplay(); });
    dots.forEach((dot, i) => dot.addEventListener('click', () => { show(i); autoplay(); }));
    carousel.addEventListener('mouseenter', () => clearInterval(timer));
    carousel.addEventListener('mouseleave', autoplay);
    carousel.addEventListener('focusin', () => clearInterval(timer));
    carousel.addEventListener('focusout', event => { if (!carousel.contains(event.relatedTarget)) autoplay(); });
    show(0); autoplay();
  }
}
