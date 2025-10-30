window.addEventListener('scroll', () => {
  // Skip scroll logic on narrow mobile screens
  if (window.innerWidth <= 768) return;

  const card = document.querySelector('.profile-card');
  const footer = document.querySelector('footer');
  if (!card || !footer) return;

  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const footerTop = footer.offsetTop;
  const cardHeight = card.offsetHeight;
  const gap = 20; // gap between card and footer
  const fixedTop = 80; // fixed top offset (matches CSS)
  const maxTop = footerTop - cardHeight - gap;

  // Keep your CSS-defined left position
  const cssLeft = getComputedStyle(card).left;

  if (scrollTop + fixedTop > maxTop) {
    card.style.position = 'absolute';
    card.style.top = maxTop + 'px';
    card.style.left = cssLeft;
  } else {
    card.style.position = 'fixed';
    card.style.top = fixedTop + 'px';
    card.style.left = cssLeft;
  }
});

// Optional: reset card position if resized to mobile
window.addEventListener('resize', () => {
  const card = document.querySelector('.profile-card');
  if (window.innerWidth <= 768 && card) {
    card.style.position = 'relative';
    card.style.top = 'auto';
    card.style.left = 'auto';
  }
});
// === FIX: ensure card resets properly when rotating or resizing ===
window.addEventListener('orientationchange', () => {
  const card = document.querySelector('.profile-card');
  if (!card) return;
  if (window.innerWidth <= 1100) {
    card.style.position = 'static';
    card.style.top = 'auto';
    card.style.left = 'auto';
  }
});
