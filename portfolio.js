window.addEventListener('load', () => {
  const heroPic = document.querySelector('.hero-pic');
  const navLogo = document.querySelector('.nav-logo');

  if (!heroPic || !navLogo) return;

  function getElementTopLeft(el) {
    const rect = el.getBoundingClientRect();
    const scrollY = window.scrollY || window.pageYOffset;
    const scrollX = window.scrollX || window.pageXOffset;
    return {
      x: rect.left + scrollX,
      y: rect.top + scrollY,
      width: rect.width,
      height: rect.height,
    };
  }

  let start = null;
  let end = null;

  function recalcPositions() {
    start = getElementTopLeft(heroPic);
    end = getElementTopLeft(navLogo);
  }

  function doTransform(progress) {
    if (progress >= 1) {
      heroPic.style.position = 'fixed';
      heroPic.style.left = `${end.x - window.scrollX}px`;
      heroPic.style.top = `${end.y - window.scrollY}px`;
      heroPic.style.width = `${end.width}px`;
      heroPic.style.height = 'auto';
      heroPic.style.transform = 'none';
      heroPic.style.zIndex = '1001';
    } else {
      heroPic.style.position = '';
      heroPic.style.left = '';
      heroPic.style.top = '';
      heroPic.style.width = '';
      heroPic.style.height = '';
      heroPic.style.zIndex = '10';

      const tx = (end.x - start.x) * progress;
      const ty = (end.y - start.y) * progress;
      const scale = 1 - (1 - end.width / start.width) * progress;

      heroPic.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`;
    }
  }

  function resetTransform() {
    heroPic.style.position = '';
    heroPic.style.left = '';
    heroPic.style.top = '';
    heroPic.style.width = '';
    heroPic.style.height = '';
    heroPic.style.zIndex = '10';
    heroPic.style.transform = '';
  }

  function onScroll() {
    const scrollTop = window.scrollY || window.pageYOffset;
    const totalDistance = start.y - end.y;

    let progress = (start.y - scrollTop - end.height / 2) / totalDistance;
    progress = 1 - progress;
    progress = Math.min(Math.max(progress, 0), 1);

    if (progress > 0) {
      doTransform(progress);
    } else {
      resetTransform();
    }
  }

  // Initialization with image load check
  function init() {
    const img = heroPic.querySelector('img');
    if (img) {
      if (img.complete) {
        recalcPositions();
        onScroll();
      } else {
        img.onload = () => {
          recalcPositions();
          onScroll();
        };
      }
    } else {
      recalcPositions();
      onScroll();
    }
  }

  // Initialize positions and apply transform on page load
  init();

  // Trigger scroll event programmatically to apply initial transform
  window.dispatchEvent(new Event('scroll'));

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', () => {
    recalcPositions();
    onScroll();
  });
});
