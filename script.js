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
});
