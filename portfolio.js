/*window.addEventListener('scroll', () => {
  const heroPicImg = document.querySelector('.hero-pic img');
  if (!heroPicImg) return;
  const scrollY = window.scrollY || window.pageYOffset;
  const maxScroll = 300; // pixel scroll after which pic is at smallest size
  const minScale = 0.5;  // minimum shrink scale
  // Calculate progress between 0 and 1
  const progress = Math.min(scrollY / maxScroll, 1);
  // Interpolate scale between 1 and minScale
  const scale = 1 - progress * (1 - minScale);
  heroPicImg.style.transform = `scale(${scale})`;
});*/ // shrinks the photo perfectly
/*window.addEventListener('load', () => {
  const heroPicImg = document.querySelector('.hero-pic img');
  const navLogo = document.querySelector('.nav-logo');
  let startX, startY, endX, endY, startW, endW;
  function measure() {
    const startRect = heroPicImg.getBoundingClientRect();
    const endRect = navLogo.getBoundingClientRect();
    startX = startRect.left;
    startY = startRect.top;
    startW = startRect.width;
    endX = endRect.left;
    endY = endRect.top;
    endW = endRect.width;
  }
  function onScroll() {
    const maxScroll = 100; // length of transition
    const scrollY = window.scrollY;
    const progress = Math.min(scrollY / maxScroll, 1);
    // Scale interpolation
    const minScale = endW / startW;
    const scale = 1 - progress * (1 - minScale);
    // Translate interpolation
    const tx = (endX - startX) * progress;
    const ty = (endY - startY) * progress;
    heroPicImg.style.transformOrigin = "top left";
    heroPicImg.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`;
  }
  window.addEventListener('resize', () => { measure(); onScroll(); });
  window.addEventListener('scroll', onScroll);
  measure();
  onScroll();
});*/
/*
window.addEventListener('load', () => {
  const heroPicImg = document.querySelector('.hero-pic img');
  const navLogo = document.querySelector('.nav-logo');
  let startX, startY, endX, endY, startW, endW;
  function measure() {
    const startRect = heroPicImg.getBoundingClientRect();
    const endRect = navLogo.getBoundingClientRect();
    startX = startRect.left;
    startY = startRect.top;
    startW = startRect.width;
    endX = endRect.left;
    endY = endRect.top;
    endW = endRect.width;
  }
  function onScroll() {
    const maxScroll = 100; // length of transition
    const scrollY = window.scrollY;
    const progress = Math.min(scrollY / maxScroll, 1);
    // Scale interpolation
    const minScale = endW / startW;
    const scale = 1 - progress * (1 - minScale);
    // Translate interpolation
    const tx = (endX - startX) * progress;
    const ty = (endY - startY) * progress;

    heroPicImg.style.transformOrigin = "top left";

    if (progress === 1) {
      // Fix the image at nav-logo position
      heroPicImg.style.position = 'fixed';
      heroPicImg.style.left = `${endX}px`;
      heroPicImg.style.top = `${endY}px`;
      heroPicImg.style.width = `${endW}px`;
      heroPicImg.style.height = 'auto';
      heroPicImg.style.transform = 'none';
      heroPicImg.style.zIndex = '1001';
    } else {
      // Animate movement and scale during scroll progress
      heroPicImg.style.position = '';
      heroPicImg.style.left = '';
      heroPicImg.style.top = '';
      heroPicImg.style.width = '';
      heroPicImg.style.height = '';
      heroPicImg.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`;
      heroPicImg.style.zIndex = progress > 0 ? '1001' : '';
    }
  }

  window.addEventListener('resize', () => { measure(); onScroll(); });
  window.addEventListener('scroll', onScroll);
  measure();
  onScroll();
});
*/

window.addEventListener('load', () => {
  const heroPicImg = document.querySelector('.hero-pic img');
  const navLogo = document.querySelector('.nav-logo');
  let startX, startY, endX, endY, startW, endW;

  function measure() {
    const startRect = heroPicImg.getBoundingClientRect();
    const endRect = navLogo.getBoundingClientRect();
    startX = startRect.left + window.scrollX;
    startY = startRect.top + window.scrollY;
    startW = startRect.width;
    endX = endRect.left + window.scrollX;
    endY = endRect.top + window.scrollY;
    endW = endRect.width;
  }

  function onScroll() {
    const maxScroll = 100; // length of transition
    const scrollY = window.scrollY || window.pageYOffset;
    const progress = Math.min(scrollY / maxScroll, 1);

    // Scale interpolation
    const minScale = endW / startW;
    const scale = 1 - progress * (1 - minScale);

    // Translate interpolation
    const tx = (endX - startX) * progress;
    const ty = (endY - startY) * progress;

    heroPicImg.style.transformOrigin = "top left";

    // Container holding the image (to collapse whitespace)
    const heroPicContainer = document.querySelector('.hero-pic');

    if (progress === 1) {
      // Fix the image at nav-logo position
      heroPicImg.style.position = 'fixed';
      heroPicImg.style.left = `${endX - window.scrollX}px`;
      heroPicImg.style.top = `${endY - window.scrollY}px`;
      heroPicImg.style.width = `${endW}px`;
      heroPicImg.style.height = 'auto';
      heroPicImg.style.transform = 'none';
      heroPicImg.style.zIndex = '1001';

      // Collapse the white space container smoothly
      heroPicContainer.style.width = '0px';
      heroPicContainer.style.height = '0px';
      heroPicContainer.style.overflow = 'hidden';
      heroPicContainer.style.transition = 'width 0.3s ease, height 0.3s ease';
    } else {
      // Animate movement and scale during scroll progress
      heroPicImg.style.position = '';
      heroPicImg.style.left = '';
      heroPicImg.style.top = '';
      heroPicImg.style.width = '';
      heroPicImg.style.height = '';
      heroPicImg.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`;
      heroPicImg.style.zIndex = progress > 0 ? '1001' : '';

      // Reset container size and transition while scrolling
      heroPicContainer.style.width = '';
      heroPicContainer.style.height = '';
      heroPicContainer.style.overflow = '';
      heroPicContainer.style.transition = '';
    }
  }

  window.addEventListener('resize', () => { measure(); onScroll(); });
  window.addEventListener('scroll', onScroll);

  measure();
  onScroll();
});
