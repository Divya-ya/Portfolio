window.addEventListener('scroll', () => {
  const card = document.querySelector('.profile-card');
  const footer = document.querySelector('footer');
  if (!card || !footer) return;

  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const footerTop = footer.offsetTop;
  const cardHeight = card.offsetHeight;
  const gap = 20; // gap in pixels between card and footer
  const fixedTop = 80; // fixed top offset (matches CSS)

  const maxTop = footerTop - cardHeight - gap;

  if (scrollTop + fixedTop > maxTop) {
    card.style.position = 'absolute';
    card.style.top = maxTop + 'px';
    card.style.left = '40px';
  } else {
    card.style.position = 'fixed';
    card.style.top = fixedTop + 'px';
    card.style.left = '40px';
  }
});