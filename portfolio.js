document.addEventListener('DOMContentLoaded', () => {
  const profilePic = document.getElementById('profile-pic');
  const navLogo = document.querySelector('.nav-logo');

  if (!profilePic || !navLogo) return;

  // Function to get latest positions and sizes
  function updatePositions() {
    return {
      picRect: profilePic.getBoundingClientRect(),
      logoRect: navLogo.getBoundingClientRect()
    };
  }

  // You may want to debounce or throttle scroll for performance on heavy pages
  window.addEventListener('scroll', () => {
    const { picRect, logoRect } = updatePositions();

    // Calculate translation distances
    const deltaX = logoRect.left - picRect.left;
    const deltaY = logoRect.top - picRect.top;

    // Calculate the scaling factors
    const scaleX = logoRect.width / picRect.width;
    const scaleY = logoRect.height / picRect.height;

    // Determine scroll progress from when the bottom of hero pic reaches nav to when it fully reaches (you can adjust 200px padding)
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const heroBottom = scrollTop + picRect.bottom; // absolute bottom position of hero pic in page coords
    const navBottom = scrollTop + logoRect.bottom; // absolute bottom position of nav logo placeholder

    // Define start and end scroll positions for transition
    // Start transition when hero image bottom reaches navbar bottom
    const startTransition = heroBottom - navBottom; // zero or negative means hero is at or above nav logo
    const transitionRange = 150; // pixels over which to animate transition

    // Calculate normalized progress (clamp between 0 and 1)
    let progress = 0;
    if (startTransition < transitionRange && startTransition > 0) {
      progress = 1 - startTransition / transitionRange;
    } else if (startTransition <= 0) {
      progress = 1;
    } else {
      progress = 0;
    }

    // Interpolate transform values
    const translateX = deltaX * progress;
    const translateY = deltaY * progress;
    // Use uniform scaling for smoothness; adjust if needed
    const scale = 1 - (1 - scaleX) * progress;

    if (progress > 0) {
      profilePic.style.position = 'fixed';
      profilePic.style.top = picRect.top + 'px';
      profilePic.style.left = picRect.left + 'px';
      profilePic.style.transformOrigin = 'top left';
      profilePic.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
      profilePic.style.transition = 'transform 0.1s linear';
      profilePic.style.zIndex = '1001'; // above navbar links
    } else {
      // Reset styles to default when progress is zero
      profilePic.style.position = '';
      profilePic.style.top = '';
      profilePic.style.left = '';
      profilePic.style.transform = '';
      profilePic.style.transition = '';
      profilePic.style.zIndex = '';
      profilePic.style.transformOrigin = '';
    }
  });

  // Also update on window resize to recalculate positions if necessary
  window.addEventListener('resize', () => {
    // Optional: trigger scroll event to recalc immediately
    window.dispatchEvent(new Event('scroll'));
  });
});
