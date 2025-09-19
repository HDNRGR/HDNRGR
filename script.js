document.addEventListener("DOMContentLoaded", () => {

  // ----- Intersection Observer for scroll animations -----
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      } else {
        entry.target.classList.remove("visible");
      }
    });
  }, { threshold: 0.2 });

  // Observe all fade elements
  document.querySelectorAll('.fade-left, .fade-right, .fade-up, .experience')
    .forEach(el => observer.observe(el));

  // ----- Portfolio View Gallery toggle -----
  const btn = document.getElementById("viewGalleryBtn");
  const extraGallery = document.querySelector(".extra-gallery");

  if (btn && extraGallery) {
    btn.addEventListener("click", () => {
      extraGallery.classList.toggle("show");

      // Change button text
      btn.textContent = extraGallery.classList.contains("show") 
        ? "Show Less" 
        : "View Gallery";
    });
  }

  // ----- Hero button scroll -----
  const hero = document.querySelector(".hero");
  const about = document.querySelector("#about");
  const vpBtn = document.querySelector(".hero .btn");

  if (vpBtn && hero && about) {
    vpBtn.addEventListener("click", (e) => {
      e.preventDefault();

      // Fade hero out
      hero.classList.add("fade-out");

      setTimeout(() => {
        window.scrollTo(0, about.offsetTop);
        about.classList.add("fade-in");

        setTimeout(() => {
          hero.classList.remove("fade-out");
          hero.classList.add("fade-in");

          setTimeout(() => hero.classList.remove("fade-in"), 900);
        }, 1200);
      }, 600);
    });
  }

  // ----- Scroll to top when clicking logo -----
  const logo = document.querySelector(".navbar .logo");
  if (logo) {
    logo.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ----- Fullscreen image viewer with dimmed background -----
  document.querySelectorAll(".gallery img").forEach(img => {
    img.addEventListener("click", () => {
      const overlay = document.createElement("div");
      overlay.style.position = "fixed";
      overlay.style.top = 0;
      overlay.style.left = 0;
      overlay.style.width = "100%";
      overlay.style.height = "100%";
      overlay.style.background = "rgba(0, 0, 0, 0.85)";
      overlay.style.backdropFilter = "blur(15px)";
      overlay.style.webkitBackdropFilter = "blur(15px)";
      overlay.style.display = "flex";
      overlay.style.alignItems = "center";
      overlay.style.justifyContent = "center";
      overlay.style.cursor = "zoom-out";
      overlay.style.zIndex = 2000;

      const fullImg = document.createElement("img");
      fullImg.src = img.src;
      fullImg.style.width = "auto";
      fullImg.style.height = "auto";
      fullImg.style.maxWidth = "95vw";
      fullImg.style.maxHeight = "95vh";
      fullImg.style.borderRadius = "10px";
      fullImg.style.boxShadow = "0 0 30px rgba(0,0,0,0.5)";
      fullImg.style.transition = "transform 0.3s ease";
      fullImg.style.transform = "scale(0.8)";

      setTimeout(() => fullImg.style.transform = "scale(1)", 10);

      overlay.appendChild(fullImg);

      overlay.addEventListener("click", () => overlay.remove());
      document.body.appendChild(overlay);
    });
  });

  // ----- Info-box click animation -----
  document.querySelectorAll('.info-box').forEach(box => {
    box.addEventListener('click', () => box.classList.toggle('active'));
  });

});
