document.addEventListener('DOMContentLoaded', () => {
  const profilePic = document.getElementById('profile-pic');
  const navLogo = document.querySelector('.nav-logo');

  if (!profilePic || !navLogo) return;

  // Get offset of element center with reference to page
  function getElementCenter(el) {
    const rect = el.getBoundingClientRect();
    const scrollY = window.scrollY || window.pageYOffset;
    const scrollX = window.scrollX || window.pageXOffset;
    return {
      x: rect.left + rect.width / 2 + scrollX,
      y: rect.top + rect.height / 2 + scrollY,
      width: rect.width,
      height: rect.height
    };
  }

  let start = null;
  let end = null;

  // Update reference positions
  function recalcPositions() {
    start = getElementCenter(profilePic); // Hero image at rest
    end = getElementCenter(navLogo);      // Logo position in nav bar
  }

  function doTransform(progress) {
    // interpolate between start and end
    const tx = (end.x - start.x) * progress;
    const ty = (end.y - start.y) * progress;
    const scale = 1 + (end.width / start.width - 1) * progress;

    profilePic.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`;

    // Optional: rounded corners for logo
    profilePic.style.borderRadius = progress > 0.96 ? '8px' : '';
    profilePic.style.boxShadow = progress > 0.8
      ? '0 2px 8px rgba(37,99,235,0.08)'
      : '';
    profilePic.style.border = progress > 0.95
      ? '2px solid #2563eb'
      : '7px solid #2563eb';
    profilePic.style.background = '#fff';
    profilePic.style.pointerEvents = 'none'; // Unclickable during move
    profilePic.style.zIndex = progress > 0.7 ? '1001' : '10';
  }

  function resetTransform() {
    profilePic.style.transform = '';
    profilePic.style.borderRadius = '';
    profilePic.style.boxShadow = '';
    profilePic.style.border = '7px solid #2563eb';
    profilePic.style.pointerEvents = '';
    profilePic.style.zIndex = '10';
  }

  function onScroll() {
    const heroRect = profilePic.getBoundingClientRect();
    // Start transition a little before image leaves viewport (adjust as desired)
    const transitionStart = 0;
    const transitionEnd = window.innerHeight * 0.25; // 25% of viewport is left

    let progress = 0;
    if (heroRect.top < transitionEnd) {
      progress = Math.min(1, (transitionEnd - heroRect.top) / (transitionEnd - transitionStart));
    } else {
      progress = 0;
    }
    if (progress > 0) {
      doTransform(progress);
    } else {
      resetTransform();
    }
  }

  // Initial calculation at load
  recalcPositions();
  onScroll();

  // Listen for scroll and resize
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', () => {
    recalcPositions();
    onScroll();
  });
});
