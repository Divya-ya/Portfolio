// scroll-shrink.js
document.addEventListener('DOMContentLoaded', function () {
  const triggerPoint = document.querySelector('.hero-section').offsetHeight - 80;

  window.addEventListener('scroll', function () {
    if (window.scrollY > triggerPoint) {
      document.body.classList.add('shrunk');
    } else {
      document.body.classList.remove('shrunk');
    }
  });
});
