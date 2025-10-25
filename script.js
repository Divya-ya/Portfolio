// Handle sticky profile card scroll behavior on desktop only
window.addEventListener('scroll', () => {
  // Skip scroll logic for mobile and tablets
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

  // Keep CSS-defined left position consistent
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

// Reset profile card position when resizing to mobile
window.addEventListener('resize', () => {
  const card = document.querySelector('.profile-card');
  if (!card) return;

  if (window.innerWidth <= 768) {
    // Reset styles for mobile view
    card.style.position = 'relative';
    card.style.top = 'auto';
    card.style.left = 'auto';
  } else {
    // Restore desktop sticky behavior positioning
    card.style.position = 'fixed';
    card.style.top = '80px';
  }

  // Adjust navbar height dynamically for mobile
  const nav = document.querySelector('.sidebar-nav');
  if (window.innerWidth <= 768 && nav) {
    nav.style.height = 'auto';
  }
});
