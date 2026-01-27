// Minimal JS (enhanced premium): nav toggle, smooth scroll, modal video preview, testimonials carousel, contact form -> WhatsApp
document.addEventListener('DOMContentLoaded', function () {
  // Year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // NAV toggle for mobile
  const navToggle = document.getElementById('navToggle');
  const navList = document.getElementById('navList');
  if (navToggle && navList) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      navList.style.display = expanded ? 'none' : 'flex';
    });

    // ensure correct display on resize
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 720) {
        navList.style.display = 'flex';
        navToggle.setAttribute('aria-expanded', 'false');
      } else {
        navList.style.display = 'none';
      }
    });

    if (window.innerWidth < 720) navList.style.display = 'none';
  }

  // Smooth scroll for anchor links (offset header)
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href && href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const header = document.getElementById('siteHeader');
          const offset = header ? header.offsetHeight : 0;
          const top = target.getBoundingClientRect().top + window.pageYOffset - Math.min(offset, 100);
          window.scrollTo({ top, behavior: 'smooth' });
          // close mobile nav
          if (navList && window.innerWidth < 720) {
            navList.style.display = 'none';
            if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
          }
        }
      }
    });
  });

  // Portfolio thumbnails -> modal video preview
  const thumbs = document.querySelectorAll('.media-thumb');
  const modal = document.getElementById('videoModal');
  const modalContent = document.getElementById('modalContent');
  const modalClose = document.getElementById('modalClose');

  function openModal(url) {
    if (!modal || !modalContent) return;
    modalContent.innerHTML = '';
    const iframe = document.createElement('iframe');
    iframe.src = `${url}?autoplay=1&rel=0`;
    iframe.allow = 'autoplay; fullscreen';
    iframe.frameBorder = '0';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    modalContent.appendChild(iframe);
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modal || !modalContent) return;
    modal.setAttribute('aria-hidden', 'true');
    modalContent.innerHTML = '';
    document.body.style.overflow = '';
  }

  thumbs.forEach(t => {
    t.addEventListener('click', () => {
      const url = t.dataset.video;
      if (url) openModal(url);
    });
    t.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        const url = t.dataset.video;
        if (url) openModal(url);
      }
    });
  });

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modal) modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.getAttribute('aria-hidden') === 'false') {
      closeModal();
    }
  });

  // Testimonials carousel (minimal)
  (function () {
    const slides = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.carousel-controls .prev');
    const nextBtn = document.querySelector('.carousel-controls .next');
    let idx = 0;
    let timer;

    function show(i) {
      slides.forEach((s, j) => s.classList.toggle('active', j === i));
    }

    function next() {
      idx = (idx + 1) % slides.length;
      show(idx);
    }
    function prev() {
      idx = (idx - 1 + slides.length) % slides.length;
      show(idx);
    }

    // initial
    if (slides.length) {
      show(0);
      timer = setInterval(next, 5500);

      if (nextBtn) nextBtn.addEventListener('click', () => { next(); resetTimer(); });
      if (prevBtn) prevBtn.addEventListener('click', () => { prev(); resetTimer(); });

      function resetTimer() {
        clearInterval(timer);
        timer = setInterval(next, 5500);
      }
    }
  })();

  // Contact form: open WhatsApp prefilled (demo)
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = (form.querySelector('#name') || {}).value || '';
      const phone = (form.querySelector('#phone') || {}).value || '';
      const message = (form.querySelector('#message') || {}).value || '';

      if (!name.trim() || !phone.trim() || !message.trim()) {
        alert('Please fill all fields.');
        return;
      }

      const waNum = '911234567890'; // replace with your number (no +)
      const text = encodeURIComponent(`Hi ONE.AND.ONE FILMS, I'm ${name}. ${message} (${phone})`);
      const waUrl = `https://wa.me/${waNum}?text=${text}`;
      window.open(waUrl, '_blank');

      form.reset();
      // small UX note
      setTimeout(() => alert('WhatsApp opened — continue there to send your message.'), 300);
    });
  }
});