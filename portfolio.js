document.addEventListener('DOMContentLoaded', function () {
  const profilePic = document.getElementById('profile-pic');
  if (!profilePic) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) {
        document.body.classList.add('shrunk');
      } else {
        document.body.classList.remove('shrunk');
      }
    },
    { threshold: [0, 0.1], rootMargin: '-20px 0px 0px 0px' }
  );
  observer.observe(profilePic);
});
