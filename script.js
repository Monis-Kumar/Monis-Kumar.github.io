/* ========================================
   RETRO-MINIMAL UNIQLO WEBSITE - SHARED JS
   ======================================== */

// Menu Toggle
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const menuClose = document.querySelector('.mobile-menu-close');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.add('active');
  });
}

if (menuClose) {
  menuClose.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
  });
}

// Close mobile menu when a link is clicked
if (mobileMenu) {
  const mobileNavLinks = mobileMenu.querySelectorAll('a');
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
    });
  });
}

// Search Modal
const searchIcon = document.querySelector('.search-icon');
const searchModal = document.querySelector('#searchModal');
const modalClose = document.querySelector('.modal-close');

if (searchIcon && searchModal) {
  searchIcon.addEventListener('click', (e) => {
    e.preventDefault();
    searchModal.classList.add('active');
    const searchInput = searchModal.querySelector('.search-input');
    if (searchInput) searchInput.focus();
  });
}

if (modalClose) {
  modalClose.addEventListener('click', () => {
    searchModal.classList.remove('active');
  });
}

// Close modals on background click
if (searchModal) {
  searchModal.addEventListener('click', (e) => {
    if (e.target === searchModal) {
      searchModal.classList.remove('active');
    }
  });
}

// Search functionality
const searchInput = document.querySelector('.search-input');
if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const results = document.querySelectorAll('.search-result');
    
    results.forEach(result => {
      const text = result.textContent.toLowerCase();
      if (text.includes(query) || query === '') {
        result.style.display = 'flex';
      } else {
        result.style.display = 'none';
      }
    });
  });
}

// Floating menu button (mobile)
const floatingMenuBtn = document.querySelector('.floating-menu-btn');
if (floatingMenuBtn) {
  floatingMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.add('active');
  });
}

// Quick View Modal
const quickViewButtons = document.querySelectorAll('.quick-view-btn');
const quickViewModal = document.querySelector('#quickViewModal');
const quickViewClose = document.querySelector('.quick-view-close');

quickViewButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    if (quickViewModal) {
      quickViewModal.classList.add('active');
      // In real implementation, would populate modal with product data
    }
  });
});

if (quickViewClose) {
  quickViewClose.addEventListener('click', () => {
    if (quickViewModal) {
      quickViewModal.classList.remove('active');
    }
  });
}

if (quickViewModal) {
  quickViewModal.addEventListener('click', (e) => {
    if (e.target === quickViewModal) {
      quickViewModal.classList.remove('active');
    }
  });
}

// Carousel/Slider
const carouselPrev = document.querySelector('.carousel-prev');
const carouselNext = document.querySelector('.carousel-next');
const carouselTrack = document.querySelector('.carousel-track');

if (carouselPrev && carouselTrack) {
  carouselPrev.addEventListener('click', () => {
    carouselTrack.style.transform = `translateX(calc(${carouselTrack.scrollLeft + 300}px))`;
    carouselTrack.scrollLeft -= 300;
  });
}

if (carouselNext && carouselTrack) {
  carouselNext.addEventListener('click', () => {
    carouselTrack.scrollLeft += 300;
  });
}

// Accordion (Details Toggle)
const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach(header => {
  header.addEventListener('click', function() {
    const content = this.nextElementSibling;
    const isOpen = content.style.maxHeight;
    
    // Close all other accordions
    document.querySelectorAll('.accordion-content').forEach(acc => {
      acc.style.maxHeight = null;
      acc.previousElementSibling.classList.remove('active');
    });
    
    // Toggle current
    if (!isOpen) {
      content.style.maxHeight = content.scrollHeight + 'px';
      header.classList.add('active');
    } else {
      content.style.maxHeight = null;
      header.classList.remove('active');
    }
  });
});

// Image Gallery (Product Page)
const thumbnails = document.querySelectorAll('.product-thumbnail');
const mainImage = document.querySelector('.product-main-image');

if (thumbnails.length > 0 && mainImage) {
  thumbnails.forEach(thumb => {
    thumb.addEventListener('click', () => {
      const src = thumb.getAttribute('data-image');
      mainImage.src = src;
      mainImage.style.animation = 'none';
      setTimeout(() => {
        mainImage.style.animation = 'heroGlitch 0.3s ease-out';
      }, 10);
      
      // Update active state
      thumbnails.forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
    });
  });
}

// Size selector
const sizeButtons = document.querySelectorAll('.size-option');
sizeButtons.forEach(btn => {
  btn.addEventListener('change', function() {
    sizeButtons.forEach(b => {
      if (b !== this) b.checked = false;
    });
  });
});

// Add to cart feedback
const addToCartButton = document.querySelector('.add-to-cart-btn');
if (addToCartButton) {
  addToCartButton.addEventListener('click', function() {
    const originalText = this.textContent;
    this.textContent = 'Added to Cart! ✓';
    this.style.backgroundColor = 'var(--accent-red)';
    this.style.color = 'var(--primary-white)';
    
    setTimeout(() => {
      this.textContent = originalText;
      this.style.backgroundColor = '';
      this.style.color = '';
    }, 2000);
  });
}

// Newsletter subscription (fake)
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = newsletterForm.querySelector('input');
    const btn = newsletterForm.querySelector('button');
    
    if (input.value) {
      const originalText = btn.textContent;
      btn.textContent = 'Thanks! ✓';
      input.value = '';
      
      setTimeout(() => {
        btn.textContent = originalText;
      }, 2000);
    }
  });
}

// Lazy load images
if ('IntersectionObserver' in window) {
  const images = document.querySelectorAll('img[loading="lazy"]');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        img.loading = 'eager';
        observer.unobserve(img);
      }
    });
  });
  images.forEach(img => imageObserver.observe(img));
}

// Smooth scroll on anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// Mobile bottom floating menu setup
function setupMobileMenu() {
  const width = window.innerWidth;
  const floatingBtn = document.querySelector('.floating-menu-btn');
  
  if (width <= 768) {
    if (!floatingBtn && !document.querySelector('.floating-menu-btn')) {
      const btn = document.createElement('div');
      btn.className = 'floating-menu-btn';
      btn.innerHTML = '☰';
      document.body.appendChild(btn);
      btn.addEventListener('click', () => {
        if (mobileMenu) {
          mobileMenu.classList.add('active');
        }
      });
    }
  } else {
    if (floatingBtn) {
      floatingBtn.remove();
    }
  }
}

window.addEventListener('resize', setupMobileMenu);
document.addEventListener('DOMContentLoaded', setupMobileMenu);

// Accessibility - keyboard navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (searchModal && searchModal.classList.contains('active')) {
      searchModal.classList.remove('active');
    }
    if (mobileMenu && mobileMenu.classList.contains('active')) {
      mobileMenu.classList.remove('active');
    }
    if (quickViewModal && quickViewModal.classList.contains('active')) {
      quickViewModal.classList.remove('active');
    }
  }
});
