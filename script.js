// Fade in on scroll using IntersectionObserver
const sections = document.querySelectorAll('section');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // Optional: stop observing after reveal
    }
  });
}, {
  threshold: 0.1
});

sections.forEach(section => {
  section.classList.remove('visible'); // Ensure hidden by default
  observer.observe(section);
});

window.addEventListener('DOMContentLoaded', () => {
  const introPhoto = document.querySelector('.intro-photo');
  if (introPhoto) {
    setTimeout(() => {
      introPhoto.classList.add('visible');
    }, 300); // Delay for a softer effect
  }
});

// Dark mode toggle
function setDarkMode(enabled) {
  if (enabled) {
    document.body.classList.add('dark-mode');
    localStorage.setItem('darkMode', 'true');
  } else {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('darkMode', 'false');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Dark mode button logic
  const darkModeToggle = document.getElementById('darkModeToggle');
  if (darkModeToggle) {
    // Set initial state
    const darkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(darkMode);

    darkModeToggle.textContent = darkMode ? '☀️' : '🌙';

    darkModeToggle.addEventListener('click', () => {
      const enabled = !document.body.classList.contains('dark-mode');
      setDarkMode(enabled);
      darkModeToggle.textContent = enabled ? '☀️' : '🌙';
    });
  }

  // IntersectionObserver for .case-section elements
  const caseSections = document.querySelectorAll('.case-section');
  const caseObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.1 });

  caseSections.forEach(section => {
    section.classList.remove('visible'); // Ensure hidden by default
    caseObserver.observe(section);
  });
});

// Carousel functionality
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.carousel').forEach(carousel => {
    const images = carousel.querySelectorAll('.carousel-image');
    const prevBtn = carousel.querySelector('.carousel-btn.prev');
    const nextBtn = carousel.querySelector('.carousel-btn.next');
    let current = 0;

    function showImage(idx) {
      images.forEach((img, i) => {
        img.classList.toggle('active', i === idx);
      });
    }

    prevBtn.addEventListener('click', () => {
      current = (current - 1 + images.length) % images.length;
      showImage(current);
    });

    nextBtn.addEventListener('click', () => {
      current = (current + 1) % images.length;
      showImage(current);
    });

    // Optional: swipe support for touch devices
    let startX = 0;
    carousel.querySelector('.carousel-track').addEventListener('touchstart', e => {
      startX = e.touches[0].clientX;
    });
    carousel.querySelector('.carousel-track').addEventListener('touchend', e => {
      let endX = e.changedTouches[0].clientX;
      if (endX - startX > 40) prevBtn.click();
      if (startX - endX > 40) nextBtn.click();
    });

    showImage(current);
  });
});

// Lightbox for carousel images
document.addEventListener('DOMContentLoaded', () => {
  // Create overlay element
  const overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  document.body.appendChild(overlay);

  const img = document.createElement('img');
  img.className = 'lightbox-img';
  overlay.appendChild(img);

  // Show lightbox on image click
  document.querySelectorAll('.carousel-image').forEach(image => {
    image.style.cursor = 'zoom-in';
    image.addEventListener('click', () => {
      img.src = image.src;
      img.alt = image.alt;
      overlay.classList.add('active');
    });
  });

  // Hide lightbox on overlay or close click
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay || e.target === img) {
      overlay.classList.remove('active');
    }
  });

  // Hide lightbox on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') overlay.classList.remove('active');
  });
});
