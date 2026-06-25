'use strict';

/* ============================================================
   Particles — canvas-based, lightweight
   ============================================================ */
(function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const ctx = canvas.getContext('2d');
  let W, H, particles;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function mkParticle() {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.5 + 0.4,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -(Math.random() * 0.4 + 0.1),
      alpha: Math.random() * 0.4 + 0.05,
    };
  }

  function init() {
    resize();
    particles = Array.from({ length: 55 }, mkParticle);
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200, 190, 255, ${p.alpha})`;
      ctx.fill();

      p.x += p.vx;
      p.y += p.vy;

      if (p.y < -5 || p.x < -5 || p.x > W + 5) {
        p.x = Math.random() * W;
        p.y = H + 5;
      }
    });
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize, { passive: true });
  init();
  draw();
})();

/* ============================================================
   Scroll Reveal — IntersectionObserver with stagger
   ============================================================ */
(function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (!entry.isIntersecting) return;
      const delay = parseInt(entry.target.dataset.delay || '0', 10);
      setTimeout(() => entry.target.classList.add('visible'), delay);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });

  els.forEach((el, i) => {
    el.dataset.delay = String(i * 80);
    observer.observe(el);
  });
})();

/* ============================================================
   Link hover micro-interaction — subtle tilt on desktop
   ============================================================ */
(function initTilt() {
  if (window.matchMedia('(hover: none)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  document.querySelectorAll('.link-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `translateX(5px) rotateX(${-y * 3}deg) rotateY(${x * 3}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();

/* ============================================================
   Share Modal
   ============================================================ */
document.addEventListener('DOMContentLoaded', function () {
  const shareBtn  = document.getElementById('share-button');
  const modal     = document.getElementById('share-modal');
  const closeBtn  = document.getElementById('modal-close');
  const backdrop  = document.getElementById('modal-backdrop');
  const pageUrl   = window.location.href;
  const shareMsg  = 'Captei uma URL de potencial épico no vasto éter digital! 🌐 Há hyperlinks que, segundo os padrões do universo cibernético, podem ser muito úteis. Recomendo uma inspeção! 🚀';
  const enc       = encodeURIComponent;

  function populateLinks() {
    const u = enc(pageUrl);
    const t = enc(shareMsg);
    const title = enc(document.title);

    document.getElementById('whatsapp-share').href  = `https://api.whatsapp.com/send?text=${t}%20${u}`;
    document.getElementById('linkedin-share').href  = `https://www.linkedin.com/sharing/share-offsite/?url=${u}`;
    document.getElementById('twitter-share').href   = `https://twitter.com/intent/tweet?text=${t}&url=${u}`;
    document.getElementById('telegram-share').href  = `https://t.me/share/url?url=${u}&text=${t}`;
    document.getElementById('email-share').href     = `mailto:?subject=${title}&body=${t}%0A${u}`;
    document.getElementById('facebook-share').href  = `https://www.facebook.com/sharer/sharer.php?u=${u}`;
  }

  function openModal() {
    populateLinks();
    modal.setAttribute('aria-hidden', 'false');
    closeBtn.focus();
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.setAttribute('aria-hidden', 'true');
    shareBtn.focus();
    document.body.style.overflow = '';
  }

  shareBtn.addEventListener('click', function (e) {
    e.preventDefault();
    if (navigator.share) {
      navigator.share({ title: document.title, text: shareMsg, url: pageUrl })
        .catch(() => openModal());
    } else {
      openModal();
    }
  });

  closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
      closeModal();
    }
  });

  /* Focus trap inside modal */
  modal.addEventListener('keydown', function (e) {
    if (e.key !== 'Tab') return;
    const focusable = modal.querySelectorAll('a[href], button');
    const first = focusable[0];
    const last  = focusable[focusable.length - 1];
    if (e.shiftKey ? document.activeElement === first : document.activeElement === last) {
      e.preventDefault();
      (e.shiftKey ? last : first).focus();
    }
  });

  /* Console easter egg */
  console.log(
    '%c👀 Oi, dev curioso! Que tal dar uma olhada nos projetos?\nGitHub → https://github.com/santosqa\nBlog   → https://www.santosqa.com/posts/',
    'color:#7c6be8;font-size:13px;font-weight:bold;background:#07061a;padding:10px 14px;border-radius:8px;'
  );
});
