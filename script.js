document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  const container = document.querySelector('.hero-about-container');
  const aboutSection = document.getElementById("about");
  
  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href").substring(1);
      if(targetId === "about") {
        e.preventDefault();
        container.classList.add("about-active");
        history.pushState(null, null, "#about");
      } else if(targetId === "home") {
        e.preventDefault();
        container.classList.remove("about-active");
        history.pushState(null, null, "#home");
      } else {
        container.classList.remove("about-active");
      }
    });
  });

  // Optional: toggle about-active on scroll near about section
  window.addEventListener("scroll", () => {
    if (!container.classList.contains("about-active")) return;
    const aboutTop = aboutSection.getBoundingClientRect().top;
    if (aboutTop > window.innerHeight / 2) {
      container.classList.remove("about-active");
      history.pushState(null, null, "#home");
    }
  });
});
