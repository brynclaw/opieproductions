// ==================== SERVICES ACCORDION ====================
document.addEventListener('DOMContentLoaded', () => {
  const services = document.querySelectorAll('.service--collapsed');
  const expandedService = document.querySelector('.service--expanded');

  services.forEach(service => {
    service.addEventListener('click', () => {
      // Collapse the currently expanded service
      const currentExpanded = document.querySelector('.service--expanded');
      if (currentExpanded) {
        const title = currentExpanded.querySelector('.service__title').textContent;
        const number = currentExpanded.querySelector('.service__number').textContent;

        currentExpanded.classList.remove('service--expanded');
        currentExpanded.classList.add('service--collapsed');

        // Remove description and actions
        const desc = currentExpanded.querySelector('.service__description');
        const actions = currentExpanded.querySelector('.service__actions');
        if (desc) desc.style.display = 'none';
        if (actions) actions.style.display = 'none';

        // Add arrow button if not present
        if (!currentExpanded.querySelector('.arrow-btn')) {
          const arrow = document.createElement('button');
          arrow.className = 'arrow-btn arrow-btn--dark';
          arrow.innerHTML = '<svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M1 12L12 1M12 1H3M12 1v9" stroke="#f0efeb" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
          currentExpanded.appendChild(arrow);
        }
      }

      // Expand the clicked service
      service.classList.remove('service--collapsed');
      service.classList.add('service--expanded');

      const desc = service.querySelector('.service__description');
      const actions = service.querySelector('.service__actions');
      if (desc) desc.style.display = 'block';
      if (actions) actions.style.display = 'flex';
    });
  });

  // ==================== SMOOTH SCROLL FOR NAV LINKS ====================
  document.querySelectorAll('.nav__links a').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // ==================== MARQUEE PAUSE ON HOVER ====================
  const marquee = document.querySelector('.marquee__track');
  if (marquee) {
    marquee.addEventListener('mouseenter', () => {
      marquee.style.animationPlayState = 'paused';
    });
    marquee.addEventListener('mouseleave', () => {
      marquee.style.animationPlayState = 'running';
    });
  }

  // ==================== NAV SCROLL EFFECT ====================
  const nav = document.querySelector('.nav');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
      nav.style.backdropFilter = 'blur(10px)';
      nav.style.backgroundColor = 'rgba(12, 16, 17, 0.9)';
    } else {
      nav.style.backdropFilter = 'none';
      nav.style.backgroundColor = '#0c1011';
    }

    lastScroll = currentScroll;
  });
});
