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
