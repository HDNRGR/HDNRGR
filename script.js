document.addEventListener("DOMContentLoaded", () => {
  // ----- Intersection Observer for scroll animations -----
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        // Type entire Experience section as one
        if (entry.target.classList.contains("experience")) {
          const span = entry.target.querySelector("li span");
          if (!span) return;

          // Reset in case of previous scroll
          span.classList.remove("typing");
          span.style.width = "0";
          span.style.animation = "";

          const textLength = span.textContent.length;
          const duration = textLength * 0.015; // 15ms per character

          // Trigger typing
          span.style.animation = `typing ${duration}s steps(${textLength}, end) forwards`;
          span.classList.add("typing");
        }

      } else {
        entry.target.classList.remove("visible");

        // Reset typing when scrolled away
        if (entry.target.classList.contains("experience")) {
          const span = entry.target.querySelector("li span");
          if (!span) return;
          span.classList.remove("typing");
          span.style.width = "0";
          span.style.animation = "";
        }
      }
    });
  }, { threshold: 0.2 });

  // Observe all fade elements + experience
  document.querySelectorAll('.fade-left, .fade-right, .fade-up, .experience')
    .forEach(el => observer.observe(el));

  // ----- Portfolio View Gallery toggle -----
  const btn = document.getElementById("viewGalleryBtn");
  const extraGallery = document.querySelector(".extra-gallery");

  if (btn && extraGallery) {
    btn.addEventListener("click", () => {
      extraGallery.classList.toggle("show");
      btn.textContent = extraGallery.classList.contains("show") ? "Show Less" : "View Gallery";
    });
  }

  // ----- About Section fade fix for mobile -----
  const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const aboutHeading = document.querySelector("#about h2");
        const aboutImage = document.querySelector(".about-content img");

        if (aboutHeading) aboutHeading.classList.add("visible");
        if (aboutImage) aboutImage.classList.add("visible");
      }
    });
  }, { threshold: 0.2 });

  // Observe the split-sections boxes to trigger heading & image fade
  const splitSections = document.querySelector(".split-sections");
  if (splitSections) aboutObserver.observe(splitSections);

  // ----- Hero "View Portfolio" button -----
  const hero = document.querySelector(".hero");
  const about = document.querySelector("#about");
  const vpBtn = document.querySelector(".hero .btn");

  if (vpBtn && hero && about) {
    vpBtn.addEventListener("click", (e) => {
      e.preventDefault();

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

  // ----- Logo scroll to top -----
  const logo = document.querySelector(".navbar .logo");
  if (logo) {
    logo.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

});

// ----- Fullscreen image viewer with dimmed glass background -----
document.querySelectorAll(".gallery img").forEach(img => {
  img.addEventListener("click", () => {
    // Create overlay
    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.background = "rgba(0, 0, 0, 0.85)"; // dimmed black
    overlay.style.backdropFilter = "blur(15px)";      // glass blur
    overlay.style.webkitBackdropFilter = "blur(15px)"; // Safari
    overlay.style.display = "flex";
    overlay.style.alignItems = "center";
    overlay.style.justifyContent = "center";
    overlay.style.cursor = "zoom-out";
    overlay.style.zIndex = 2000;

    // Create full image
    const fullImg = document.createElement("img");
    fullImg.src = img.src;
    fullImg.style.width = "auto";
    fullImg.style.height = "auto";
    fullImg.style.maxWidth = "95vw";  // 95% of viewport width
    fullImg.style.maxHeight = "95vh"; // 95% of viewport height
    fullImg.style.borderRadius = "10px";
    fullImg.style.boxShadow = "0 0 30px rgba(0,0,0,0.5)";
    fullImg.style.transition = "transform 0.3s ease";
    fullImg.style.transform = "scale(0.8)";

    // Animate pop-in
    setTimeout(() => {
      fullImg.style.transform = "scale(1)";
    }, 10);

    overlay.appendChild(fullImg);

    // Close overlay on click
    overlay.addEventListener("click", () => {
      overlay.remove();
    });

    document.body.appendChild(overlay);
  });
});

document.querySelectorAll('.info-box').forEach(box => {
  box.addEventListener('click', () => {
    box.classList.toggle('active');
  });
});
