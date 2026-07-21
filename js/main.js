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

/* Animated stat counters */
const statNums = document.querySelectorAll('.stat-card__num[data-target]');

function animateCounter(el) {
  const target = parseFloat(el.getAttribute('data-target'));
  const duration = 1600;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(target * eased);
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });

statNums.forEach(el => statObserver.observe(el));

/* Experimental class form -> saves lead + WhatsApp deep link */
const expForm = document.getElementById('expForm');
if (expForm) {
  expForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nome = expForm.nome.value.trim();
    const telefone = expForm.telefone.value.trim();
    const modalidade = expForm.modalidade.value;
    const comoChegou = expForm.comoChegou.value;
    const faixaEtaria = expForm.faixaEtaria.value;
    const genero = expForm.genero.value;
    const objetivo = expForm.objetivo.value;

    fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, telefone, modalidade, comoChegou, faixaEtaria, genero, objetivo }),
    }).catch(() => {});

    const message = `Olá! Meu nome é ${nome} (WhatsApp: ${telefone}). Quero agendar uma aula experimental de ${modalidade} na Academia Fênix.`;
    const url = `https://wa.me/556596233084?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener');
  });
}
