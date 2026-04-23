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

  // ==================== PRICING WIZARD FORM ====================
  const pricingOptions = document.querySelectorAll('.pricing-wizard__option');
  const nextBtn = document.getElementById('nextBtn');
  const backBtn = document.getElementById('backBtn');
  const progressDots = document.querySelectorAll('.pricing-wizard__progress-dot');
  const wizardSteps = document.querySelectorAll('.pricing-wizard__step');

  let currentStep = 1;
  const totalSteps = 3;
  const answers = {};

  function updateProgressDots() {
    progressDots.forEach((dot, index) => {
      dot.classList.remove('pricing-wizard__progress-dot--active', 'pricing-wizard__progress-dot--completed');

      if (index < currentStep - 1) {
        dot.classList.add('pricing-wizard__progress-dot--completed');
      } else if (index === currentStep - 1) {
        dot.classList.add('pricing-wizard__progress-dot--active');
      }
    });
  }

  function showStep(step) {
    wizardSteps.forEach(s => s.style.display = 'none');
    const target = document.getElementById('step' + step);
    if (target) {
      target.style.display = 'block';
    }

    backBtn.style.display = step > 1 ? 'inline-flex' : 'none';
    nextBtn.textContent = step === totalSteps ? 'Get Estimate' : 'Next Step';

    updateProgressDots();
    currentStep = step;
  }

  pricingOptions.forEach(option => {
    option.addEventListener('click', () => {
      const step = option.getAttribute('data-step');
      const optionValue = option.getAttribute('data-option');
      const siblings = option.parentElement.querySelectorAll('.pricing-wizard__option');

      siblings.forEach(s => s.classList.remove('pricing-wizard__option--selected'));
      option.classList.add('pricing-wizard__option--selected');

      answers[`step${step}`] = optionValue;

      setTimeout(() => {
        if (currentStep < totalSteps) {
          showStep(currentStep + 1);
        }
      }, 300);
    });
  });

  nextBtn.addEventListener('click', () => {
    if (currentStep < totalSteps) {
      showStep(currentStep + 1);
    } else {
      console.log('Form submitted with answers:', answers);
      alert('Thank you! Your estimate request has been received. We will review it and send you a clear estimate within 24 hours.');
    }
  });

  if (backBtn) {
    backBtn.addEventListener('click', () => {
      if (currentStep > 1) {
        showStep(currentStep - 1);
      }
    });
  }

  updateProgressDots();
});
