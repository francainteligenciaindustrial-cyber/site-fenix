document.getElementById('year').textContent = new Date().getFullYear();

/* Header scroll state + progress bar */
const header = document.getElementById('header');
const progressBar = document.getElementById('progressBar');

function onScroll() {
  header.classList.toggle('is-scrolled', window.scrollY > 40);

  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = progress + '%';
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* Mobile nav */
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');

function closeMobileNav() {
  hamburger.classList.remove('is-active');
  mobileNav.classList.remove('is-open');
  hamburger.setAttribute('aria-expanded', 'false');
}

hamburger.addEventListener('click', () => {
  const isOpen = mobileNav.classList.toggle('is-open');
  hamburger.classList.toggle('is-active', isOpen);
  hamburger.setAttribute('aria-expanded', String(isOpen));
});

mobileNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', closeMobileNav);
});

/* Reveal on scroll */
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach((el, i) => {
  el.style.transitionDelay = `${(i % 4) * 80}ms`;
  observer.observe(el);
});
