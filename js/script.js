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

  // ==================== PRICING QUIZ ====================
  const quizSection = document.querySelector('.pricing-quiz');
  if (quizSection) {
    const TOTAL_STEPS = 5;
    const TOTAL_SEGS = 27;
    let currentStep = 1;

    const steps = quizSection.querySelectorAll('.pricing-quiz__step');
    const nextBtn = quizSection.querySelector('.pricing-quiz__next-btn');
    const prevBtn = quizSection.querySelector('.pricing-quiz__prev-btn');
    const progressEl = document.getElementById('quizProgress');
    // Header is only shown on step 1 — select the one that's a direct child of __left (not inside a step)
    const mainHeader = quizSection.querySelector('.pricing-quiz__left > .pricing-quiz__header');
    const mainDivider = quizSection.querySelector('.pricing-quiz__left > .pricing-quiz__divider');

    function buildProgressBar(step) {
      if (!progressEl) return;
      const activeCount = Math.round((step / TOTAL_STEPS) * TOTAL_SEGS);
      const beforeSegs = activeCount;
      const afterSegs = TOTAL_SEGS - activeCount;

      let html = '<div class="pricing-quiz__progress-bar">';
      for (let i = 0; i < beforeSegs; i++) {
        html += '<span class="pricing-quiz__progress-seg pricing-quiz__progress-seg--active" style="animation-delay:' + (i * 15) + 'ms"></span>';
      }
      html += '</div>';
      html += '<div class="pricing-quiz__step-badge">';
      html += '<span class="pricing-quiz__step-num">' + step + '</span>';
      html += '<span class="pricing-quiz__step-label">[ Step ]</span>';
      html += '</div>';
      html += '<div class="pricing-quiz__progress-bar pricing-quiz__progress-bar--remaining">';
      for (let i = 0; i < afterSegs; i++) {
        html += '<span class="pricing-quiz__progress-seg"></span>';
      }
      html += '</div>';
      progressEl.innerHTML = html;
    }

    function showStep(step) {
      currentStep = step;
      steps.forEach(s => {
        s.style.display = parseInt(s.getAttribute('data-step')) === step ? 'flex' : 'none';
      });

      // Show/hide main header (only on step 1)
      if (mainHeader) mainHeader.style.display = step === 1 ? 'flex' : 'none';
      if (mainDivider) mainDivider.style.display = step === 1 ? 'block' : 'none';

      // Show/hide prev button
      if (prevBtn) prevBtn.style.display = step > 1 ? 'inline-flex' : 'none';

      // Swap illustrations
      quizSection.querySelectorAll('.pricing-quiz__illustration').forEach(illus => {
        illus.style.display = parseInt(illus.getAttribute('data-illus')) === step ? 'block' : 'none';
      });

      // Update next button text
      if (nextBtn) {
        nextBtn.textContent = step === TOTAL_STEPS ? 'Request My Estimate' : 'Next Step';
      }

      buildProgressBar(step);

      // Stagger-animate child elements
      const activeStep = quizSection.querySelector('.pricing-quiz__step[data-step="' + step + '"]');
      if (activeStep) {
        const children = activeStep.querySelectorAll('.pricing-quiz__question-group, .pricing-quiz__site-card, .pricing-quiz__header, .pricing-quiz__divider, .pricing-quiz__final-left, .pricing-quiz__final-right, .pricing-quiz__final-info, .pricing-quiz__form-fields');
        children.forEach((child, i) => {
          child.style.opacity = '0';
          child.style.transform = 'translateY(15px)';
          child.style.transition = 'none';
          setTimeout(() => {
            child.style.transition = 'opacity 0.4s ease-out, transform 0.4s ease-out';
            child.style.opacity = '1';
            child.style.transform = 'translateY(0)';
          }, 80 * i);
        });
      }

      // Scroll to top of quiz
      quizSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Next button
    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentStep < TOTAL_STEPS) {
          showStep(currentStep + 1);
        } else {
          // Final step: could submit form or navigate
          alert('Thank you! Your estimate request has been received. We will review and respond within 24 hours.');
        }
      });
    }

    // Prev button
    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentStep > 1) {
          showStep(currentStep - 1);
        }
      });
    }

    // Init progress bar
    buildProgressBar(1);

    // Pill selection
    document.querySelectorAll('.pricing-quiz__pill').forEach(pill => {
      pill.addEventListener('click', () => {
        const group = pill.getAttribute('data-group');
        const isMulti = pill.classList.contains('pricing-quiz__pill--multi');

        if (isMulti) {
          // Toggle selection for multi-select pills
          pill.classList.toggle('pricing-quiz__pill--selected');
        } else {
          // Single-select: deselect siblings, select this one
          document.querySelectorAll('.pricing-quiz__pill[data-group="' + group + '"]')
            .forEach(p => p.classList.remove('pricing-quiz__pill--selected'));
          pill.classList.add('pricing-quiz__pill--selected');
        }

        // Show domain input when "Yes" is selected for website question
        if (group === 'website') {
          const domainInput = document.querySelector('.pricing-quiz__domain-input');
          if (domainInput) {
            domainInput.style.display = pill.textContent.trim() === 'Yes' ? 'block' : 'none';
          }
        }
      });
    });

    // Site type card selection
    document.querySelectorAll('.pricing-quiz__site-card').forEach(card => {
      card.addEventListener('click', () => {
        document.querySelectorAll('.pricing-quiz__site-card')
          .forEach(c => c.classList.remove('pricing-quiz__site-card--selected'));
        card.classList.add('pricing-quiz__site-card--selected');
      });
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
