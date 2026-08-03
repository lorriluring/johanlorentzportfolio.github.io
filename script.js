// Fade in on scroll using IntersectionObserver
const revealTargets = document.querySelectorAll('section, .hero');

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealTargets.forEach(target => {
  target.classList.remove('visible');
  revealObserver.observe(target);
});

// Dark mode toggle
function setDarkMode(enabled) {
  document.body.classList.toggle('dark-mode', enabled);
  localStorage.setItem('darkMode', enabled ? 'true' : 'false');
}

document.addEventListener('DOMContentLoaded', () => {
  const darkModeToggle = document.getElementById('darkModeToggle');
  if (darkModeToggle) {
    const darkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(darkMode);

    darkModeToggle.addEventListener('click', () => {
      setDarkMode(!document.body.classList.contains('dark-mode'));
    });
  }

  // Highlight the active nav link while scrolling the one-pager
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  if (navLinks.length) {
    const sections = Array.from(navLinks)
      .map(link => document.querySelector(link.getAttribute('href')))
      .filter(Boolean);

    const navObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const link = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (!link) return;
        link.classList.toggle('active', entry.isIntersecting);
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    sections.forEach(section => navObserver.observe(section));
  }
});

// Carousel functionality
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.carousel').forEach(carousel => {
    const images = carousel.querySelectorAll('.carousel-image');
    const prevBtn = carousel.querySelector('.carousel-btn.prev');
    const nextBtn = carousel.querySelector('.carousel-btn.next');
    let current = 0;

    function showImage(idx) {
      images.forEach((img, i) => img.classList.toggle('active', i === idx));
    }

    prevBtn.addEventListener('click', () => {
      current = (current - 1 + images.length) % images.length;
      showImage(current);
    });

    nextBtn.addEventListener('click', () => {
      current = (current + 1) % images.length;
      showImage(current);
    });

    let startX = 0;
    const track = carousel.querySelector('.carousel-track');
    track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; });
    track.addEventListener('touchend', e => {
      const endX = e.changedTouches[0].clientX;
      if (endX - startX > 40) prevBtn.click();
      if (startX - endX > 40) nextBtn.click();
    });

    showImage(current);
  });
});

// Lightbox for case study images
document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  const img = document.createElement('img');
  img.className = 'lightbox-img';
  overlay.appendChild(img);
  document.body.appendChild(overlay);

  document.querySelectorAll('.carousel-image, .case-image').forEach(image => {
    image.style.cursor = 'zoom-in';
    image.addEventListener('click', () => {
      img.src = image.src;
      img.alt = image.alt;
      overlay.classList.add('active');
    });
  });

  overlay.addEventListener('click', e => {
    if (e.target === overlay || e.target === img) {
      overlay.classList.remove('active');
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') overlay.classList.remove('active');
  });
});
