document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('.lets-talk');
  const popup = document.getElementById('formPopup');
  const closeBtn = document.getElementById('closeForm');

  btn.addEventListener('click', () => {
    popup.classList.remove('hidden');
  });

  closeBtn.addEventListener('click', () => {
    popup.classList.add('hidden');
  });

  // Close popup on outside click
  window.addEventListener('click', (e) => {
    if (e.target === popup) {
      popup.classList.add('hidden');
    }
  });
});
