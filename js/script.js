// ==================== SERVICES ACCORDION (HOVER) ====================
document.addEventListener('DOMContentLoaded', () => {
  const servicesList = document.querySelector('.services-list');
  const allServices = document.querySelectorAll('.service');

  function expandService(service) {
    // Skip if already expanded
    if (service.classList.contains('service--expanded')) return;

    // Collapse all services
    allServices.forEach(s => {
      s.classList.remove('service--expanded');
      s.classList.add('service--collapsed');
    });

    // Expand the target
    service.classList.remove('service--collapsed');
    service.classList.add('service--expanded');
  }

  // Hover to expand
  allServices.forEach(service => {
    service.addEventListener('mouseenter', () => {
      expandService(service);
    });
  });

  // Also support click/tap for mobile
  allServices.forEach(service => {
    service.addEventListener('click', (e) => {
      // Don't interfere with link clicks inside expanded service
      if (e.target.closest('a') && service.classList.contains('service--expanded')) return;
      expandService(service);
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

  // ==================== PRICING WIZARD ====================
  const wizardSteps = document.querySelectorAll('.pricing-wizard__step');
  const progressFill = document.getElementById('progressFill');
  const stepCount = document.getElementById('stepCount');
  const backBtn = document.getElementById('backBtn');
  let currentStep = 1;
  const totalSteps = 5;

  function showStep(step) {
    wizardSteps.forEach(s => s.style.display = 'none');
    const target = document.getElementById('step' + step);
    if (target) target.style.display = 'block';
    if (progressFill) progressFill.style.width = (step / totalSteps * 100) + '%';
    if (stepCount) stepCount.textContent = 'Step ' + step + ' of ' + totalSteps;
    if (backBtn) backBtn.style.display = step > 1 ? 'inline-flex' : 'none';
    currentStep = step;
  }

  // Option click advances to next step
  document.querySelectorAll('.pricing-wizard__option').forEach(option => {
    option.addEventListener('click', () => {
      // Mark selected
      const siblings = option.parentElement.querySelectorAll('.pricing-wizard__option');
      siblings.forEach(s => s.classList.remove('pricing-wizard__option--selected'));
      option.classList.add('pricing-wizard__option--selected');

      // Advance after short delay
      setTimeout(() => {
        if (currentStep < totalSteps) {
          showStep(currentStep + 1);
        }
      }, 300);
    });
  });

  if (backBtn) {
    backBtn.addEventListener('click', () => {
      if (currentStep > 1) {
        showStep(currentStep - 1);
      }
    });
  }

  // ==================== APPROACH ACCORDION ====================
  const approachSteps = document.querySelectorAll('.approach__step');
  approachSteps.forEach(step => {
    step.addEventListener('click', () => {
      // Remove active from all
      approachSteps.forEach(s => s.classList.remove('approach__step--active'));
      step.classList.add('approach__step--active');
    });
  });

});
