// When the hero picture fully leaves the viewport, add the 'shrunk' class.
// When any part of it comes back, remove the class.
document.addEventListener('DOMContentLoaded', function () {
  const profilePic = document.getElementById('profile-pic');
  if (!profilePic) return;

  // Observe the entire .hero-pic container so effect works as soon as picture leaves viewport
  const picContainer = profilePic.parentElement;

  const observer = new IntersectionObserver(
    ([entry]) => {
      // entry.isIntersecting is true when any part of element is visible
      if (!entry.isIntersecting) {
        document.body.classList.add('shrunk');
      } else {
        document.body.classList.remove('shrunk');
      }
    },
    { threshold: 0.01 } // triggers when a tiny part becomes invisible/visible
  );
  observer.observe(picContainer);
});