/* ============================================
   PHA — Pohjois-Hämeen Ampujat
   Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---------- Sticky Header ----------
  const header = document.querySelector('.header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 50);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ---------- Mobile Navigation ----------
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open');
      document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });

    mobileNav.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ---------- Hero Carousel ----------
  const slides = document.querySelectorAll('.hero-slide');
  const indicators = document.querySelectorAll('.hero-indicator');

  if (slides.length > 1) {
    let current = 0;
    let interval;

    const showSlide = (index) => {
      slides[current].classList.remove('active');
      if (indicators[current]) indicators[current].classList.remove('active');

      current = index;

      slides[current].classList.add('active');
      if (indicators[current]) indicators[current].classList.add('active');
    };

    const nextSlide = () => {
      showSlide((current + 1) % slides.length);
    };

    const startAutoplay = () => {
      interval = setInterval(nextSlide, 5000);
    };

    const stopAutoplay = () => {
      clearInterval(interval);
    };

    indicators.forEach((indicator, i) => {
      indicator.addEventListener('click', () => {
        stopAutoplay();
        showSlide(i);
        startAutoplay();
      });
    });

    startAutoplay();
  }

  // ---------- Scroll Reveal ----------
  const reveals = document.querySelectorAll('.reveal');

  if (reveals.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    reveals.forEach(el => observer.observe(el));
  }

  // ---------- Smooth Scroll ----------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = header ? header.offsetHeight : 0;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ---------- Language Toggle (non-functional demo) ----------
  const langToggle = document.querySelector('.lang-toggle');
  if (langToggle) {
    langToggle.addEventListener('click', (e) => {
      e.preventDefault();
      const spans = langToggle.querySelectorAll('span');
      spans.forEach(s => s.classList.toggle('active-lang'));
    });
  }

  // ---------- Counter Animation ----------
  const counters = document.querySelectorAll('.stat-number');
  if (counters.length > 0) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.count, 10);
          if (isNaN(target)) return;

          let count = 0;
          const duration = 2000;
          const step = Math.ceil(target / (duration / 16));

          const animate = () => {
            count += step;
            if (count >= target) {
              el.textContent = target.toLocaleString('fi-FI');
            } else {
              el.textContent = count.toLocaleString('fi-FI');
              requestAnimationFrame(animate);
            }
          };
          animate();
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(el => counterObserver.observe(el));
  }

});
