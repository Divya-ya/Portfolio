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


// ===== FORM POPUP LOGIC (newly added) =====

// Create the form HTML dynamically
const formHTML = `
  <div id="formPopup" class="form-popup hidden">
    <div class="form-content">
      <span class="close-btn" id="closeForm">&times;</span>
      <h2>Let's Talk</h2>
      <form id="contactForm">
        <label>Name:</label>
        <input type="text" id="name" required />

        <label>Email:</label>
        <input type="email" id="email" required />

        <label>Message:</label>
        <textarea id="message" required></textarea>

        <button type="submit">Send</button>
      </form>
    </div>
  </div>
`;
document.body.insertAdjacentHTML('beforeend', formHTML);

// Handle open/close
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('.lets-talk'); // <-- button class
  const popup = document.getElementById('formPopup');
  const closeBtn = document.getElementById('closeForm');
  const form = document.getElementById('contactForm');

  if (!btn) return;

  btn.addEventListener('click', () => {
    popup.classList.remove('hidden');
  });

  closeBtn.addEventListener('click', () => {
    popup.classList.add('hidden');
  });

  // Handle form submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert("Message sent! Thank you for reaching out.");
    popup.classList.add('hidden');
    form.reset();
  });
});