/* ==========================================================================
   KESHAV LABS - INTERACTIVE PROTOTYPE ENGINE (APP.JS)
   Clean, robust vanilla ES6 driving a premium SaaS-media experience.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // --- INITIALIZE ALL MODULES ---
  initReadingProgress();
  initBlogFilter();
  initWorkflowTabs();
  initServiceBridge();
  initFormHandlers();
  initMobileMenu();
});

/**
 * 1. READING PROGRESS INDICATOR & STICKY HEADER SCROLL SPY
 * Tracks how far the user has scrolled through the page and updates
 * a progress line embedded directly into the bottom of the sticky header.
 */
function initReadingProgress() {
  const progressBar = document.querySelector('.scroll-progress-bar');
  const header = document.querySelector('.header');
  
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    // 1. Calculate reading progress
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
    
    progressBar.style.width = scrolled + '%';

    // 2. Add soft shadow to header on scroll
    if (winScroll > 20) {
      header.style.boxShadow = 'var(--shadow-md)';
      header.style.background = 'rgba(255, 255, 255, 0.95)';
    } else {
      header.style.boxShadow = 'none';
      header.style.background = 'rgba(255, 255, 255, 0.85)';
    }
  });
}

/**
 * 2. LIVE BLOG FILTERING, TEXT KEYWORD SEARCH & COUNT TAGS
 * Provides instant content filtering by both click-categories and text inputs.
 * Dynamically computes matching post counts per category and displays them on the filter pills.
 */
function initBlogFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const searchInput = document.querySelector('.search-input');
  const blogCards = document.querySelectorAll('.blog-card');
  const cornerstoneCard = document.querySelector('.cornerstone-post');
  
  if (!filterButtons.length || !blogCards.length) return;

  let activeCategory = 'all';
  let searchQuery = '';

  // Calculate live matching post counts for each category pill on load
  updateFilterCounters();

  // Category filter click event
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // 1. Update UI active class
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      // 2. Get category value
      activeCategory = button.getAttribute('data-filter');
      
      // 3. Trigger filter sequence
      filterArticles();
    });
  });

  // Real-time search keyup input event
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      filterArticles();
    });
  }

  /**
   * Evaluates each card against active filters & text keywords.
   * Shows/hides cards with a sleek fade-in visual transition.
   */
  function filterArticles() {
    let visibleCount = 0;

    blogCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category').toLowerCase();
      const cardTitle = card.querySelector('.blog-title').textContent.toLowerCase();
      const cardExcerpt = card.querySelector('.blog-excerpt').textContent.toLowerCase();
      
      const categoryMatches = (activeCategory === 'all' || cardCategory === activeCategory);
      const searchMatches = (searchQuery === '' || cardTitle.includes(searchQuery) || cardExcerpt.includes(searchQuery));

      if (categoryMatches && searchMatches) {
        card.style.display = 'flex';
        // Elegant fade-in micro-animation
        card.style.animation = 'fadeIn 0.4s ease forwards';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    // Handle Cornerstone post display (spotlight card matches main list rules)
    if (cornerstoneCard) {
      const cornerstoneCategory = cornerstoneCard.getAttribute('data-category').toLowerCase();
      const cornerstoneTitle = cornerstoneCard.querySelector('.cornerstone-title').textContent.toLowerCase();
      const cornerstoneExcerpt = cornerstoneCard.querySelector('.cornerstone-excerpt').textContent.toLowerCase();

      const cornerCategoryMatches = (activeCategory === 'all' || cornerstoneCategory === activeCategory);
      const cornerSearchMatches = (searchQuery === '' || cornerstoneTitle.includes(searchQuery) || cornerstoneExcerpt.includes(searchQuery));

      if (cornerCategoryMatches && cornerSearchMatches) {
        cornerstoneCard.style.display = 'grid';
        cornerstoneCard.style.animation = 'fadeIn 0.4s ease forwards';
      } else {
        cornerstoneCard.style.display = 'none';
      }
    }
  }

  /**
   * Helper that analyzes all blog assets and calculates the count of matches for each filter pill
   */
  function updateFilterCounters() {
    filterButtons.forEach(btn => {
      const cat = btn.getAttribute('data-filter');
      const countBadge = btn.querySelector('.filter-count');
      if (!countBadge) return;

      let count = 0;
      if (cat === 'all') {
        // Includes regular cards + optional cornerstone
        count = blogCards.length + (cornerstoneCard ? 1 : 0);
      } else {
        blogCards.forEach(card => {
          if (card.getAttribute('data-category').toLowerCase() === cat.toLowerCase()) {
            count++;
          }
        });
        if (cornerstoneCard && cornerstoneCard.getAttribute('data-category').toLowerCase() === cat.toLowerCase()) {
          count++;
        }
      }
      countBadge.textContent = count;
    });
  }
}

/**
 * 3. INTERACTIVE SAAS-STYLE WORKFLOW TAB VISUALIZER
 * Swaps complex structured workflow checklists, metrics, and tools.
 * Mimics developer or advanced automation documentation dashboards.
 */
function initWorkflowTabs() {
  const tabButtons = document.querySelectorAll('.workflow-tab-btn');
  const contentPanels = document.querySelectorAll('.workflow-content');
  
  if (!tabButtons.length || !contentPanels.length) return;

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // 1. Remove active states from buttons
      tabButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      // 2. Hide all contents
      contentPanels.forEach(panel => panel.classList.remove('active'));

      // 3. Find and display correct panel
      const targetId = button.getAttribute('data-target');
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });
}

/**
 * 4. NATIVE IN-FEED & SERVICE INTERSTICIAL TO FORM BRIDGE
 * Allows a conversion button (e.g. clicking Service CTA "Inquire" or native banners)
 * to smoothly guide the reader, auto-populates the select menu with the chosen option,
 * and sets up visual focus inside the contact field.
 */
function initServiceBridge() {
  const serviceInquireButtons = document.querySelectorAll('.service-inquire-btn, .infeed-btn');
  const serviceDropdown = document.getElementById('service-interest');
  
  if (!serviceInquireButtons.length) return;

  serviceInquireButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const selectedService = button.getAttribute('data-service');
      
      if (serviceDropdown && selectedService) {
        serviceDropdown.value = selectedService;
        
        // Add a temporary subtle highlight animation to input
        serviceDropdown.style.borderColor = 'var(--border-focus)';
        serviceDropdown.style.boxShadow = '0 0 0 3px rgba(15, 23, 42, 0.1)';
        setTimeout(() => {
          serviceDropdown.style.borderColor = '';
          serviceDropdown.style.boxShadow = '';
        }, 1500);
      }
      
      // Smooth scroll directly to the contact module
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        e.preventDefault();
        contactSection.scrollIntoView({ behavior: 'smooth' });
        
        // Auto focus email field
        const nameInput = document.getElementById('contact-name');
        if (nameInput) {
          setTimeout(() => nameInput.focus(), 800);
        }
      }
    });
  });
}

/**
 * 5. VALIDATION ENGINE & FLOATING FEEDBACK TOASTS
 * intercepts form submissions, performs robust validation, and launches
 * modern success banners with a premium visual design.
 */
function initFormHandlers() {
  const contactForm = document.getElementById('keshav-contact-form');
  const newsletterForm = document.getElementById('keshav-newsletter-form');
  const footerNewsletterForm = document.getElementById('keshav-footer-newsletter');

  // Contact Form Submission Handler
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const message = document.getElementById('contact-message').value.trim();
      
      if (!name || !email || !message) {
        showToast('Please fill in all required fields.', 'error');
        return;
      }

      if (!validateEmail(email)) {
        showToast('Please enter a valid email address.', 'error');
        return;
      }

      // Success sequence
      showToast('Thank you! Your message was sent successfully.', 'success');
      contactForm.reset();
    });
  }

  // Hero Newsletter Submission Handler
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = newsletterForm.querySelector('.newsletter-input').value.trim();
      
      if (!email) {
        showToast('Please provide an email address.', 'error');
        return;
      }

      if (!validateEmail(email)) {
        showToast('Please enter a valid email address.', 'error');
        return;
      }

      // Success sequence
      showToast('Welcome aboard! Check your inbox for your first workflow pack.', 'success');
      newsletterForm.reset();
    });
  }

  // Footer Newsletter Submission Handler
  if (footerNewsletterForm) {
    footerNewsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = footerNewsletterForm.querySelector('.footer-sub-input').value.trim();
      
      if (!email) {
        showToast('Please enter your email.', 'error');
        return;
      }

      if (!validateEmail(email)) {
        showToast('Invalid email address.', 'error');
        return;
      }

      showToast('Successfully subscribed to the weekly newsletter!', 'success');
      footerNewsletterForm.reset();
    });
  }

  // Email helper
  function validateEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  }

  /**
   * Floating Toast System
   * Instantiates a dynamic, highly styled notice overlay and removes it cleanly after display.
   */
  function showToast(message, type = 'success') {
    // 1. Create container if missing
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    // 2. Create Toast DOM node
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    // Choose icon based on state
    const iconSvg = type === 'success' 
      ? `<svg class="toast-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" /></svg>`
      : `<svg class="toast-icon" style="color: #ef4444;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12" /></svg>`;

    toast.innerHTML = `
      ${iconSvg}
      <span>${message}</span>
    `;

    container.appendChild(toast);

    // 3. Animate In
    setTimeout(() => toast.classList.add('show'), 50);

    // 4. Animate Out & Destroy
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 4000);
  }
}

/**
 * 6. RESPONSIVE MOBILE NAVIGATION SYSTEM
 * Manages the slide-out navigation overlay for phones and tablets.
 */
function initMobileMenu() {
  const header = document.querySelector('.header');
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  
  if (!toggleBtn) return;

  // We will build the mobile menu DOM overlay dynamically to keep the HTML markup ultra-clean!
  let overlayMenu = document.querySelector('.mobile-menu-overlay');
  
  if (!overlayMenu) {
    overlayMenu = document.createElement('div');
    overlayMenu.className = 'mobile-menu-overlay';
    
    // Custom styles written inline to avoid cluttering main style sheets
    overlayMenu.style.position = 'fixed';
    overlayMenu.style.top = '4.5rem';
    overlayMenu.style.left = '0';
    overlayMenu.style.width = '100%';
    overlayMenu.style.height = 'calc(100vh - 4.5rem)';
    overlayMenu.style.backgroundColor = 'var(--bg-primary)';
    overlayMenu.style.zIndex = '99';
    overlayMenu.style.display = 'none';
    overlayMenu.style.flexDirection = 'column';
    overlayMenu.style.padding = '3rem 2rem';
    overlayMenu.style.gap = '2rem';
    overlayMenu.style.borderTop = '1px solid var(--border-light)';
    
    // Copy nav links into the mobile menu
    const navLinks = document.querySelectorAll('.nav-link');
    let menuHtml = '<ul style="list-style: none; display: flex; flex-direction: column; gap: 1.75rem;">';
    
    navLinks.forEach(link => {
      menuHtml += `
        <li>
          <a href="${link.getAttribute('href')}" class="mobile-menu-link" style="font-family: var(--font-heading); font-size: 1.5rem; font-weight: 600; color: var(--text-primary);">${link.textContent}</a>
        </li>
      `;
    });
    
    menuHtml += '</ul>';
    
    // Add conversion CTAs
    menuHtml += `
      <div style="margin-top: auto; display: flex; flex-direction: column; gap: 1rem;">
        <a href="#contact" class="btn btn-primary mobile-menu-cta" style="text-align: center;">Work With Me</a>
      </div>
    `;
    
    overlayMenu.innerHTML = menuHtml;
    document.body.appendChild(overlayMenu);
  }

  // Toggle Action Handler
  let isMenuOpen = false;

  toggleBtn.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    if (isMenuOpen) {
      overlayMenu.style.display = 'flex';
      overlayMenu.style.animation = 'fadeIn 0.25s ease forwards';
      toggleBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style="width: 24px; height: 24px; stroke-width: 2px;">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-d="M6 18L18 6M6 6l12 12" />
        </svg>
      `;
      // Lock scroll behind menu
      document.body.style.overflow = 'hidden';
    } else {
      closeMenu();
    }
  });

  // Handle mobile link clicks (smooth navigation and close overlay)
  const mobileLinks = overlayMenu.querySelectorAll('.mobile-menu-link, .mobile-menu-cta');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  function closeMenu() {
    isMenuOpen = false;
    overlayMenu.style.display = 'none';
    toggleBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style="width: 24px; height: 24px; stroke-width: 2px;">
        <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    `;
    document.body.style.overflow = '';
  }
}
