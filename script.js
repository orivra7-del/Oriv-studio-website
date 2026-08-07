document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     MOBILE MENU
  ========================= */

  const menuButton = document.querySelector(".menu");
  const mobileMenu = document.querySelector(".mobile-menu");

  if (menuButton && mobileMenu) {
    menuButton.addEventListener("click", () => {
      mobileMenu.classList.toggle("open");

      menuButton.setAttribute(
        "aria-expanded",
        mobileMenu.classList.contains("open")
      );
    });

    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
      });
    });
  }


  /* =========================
     SCROLL REVEAL ANIMATION
  ========================= */

  const revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(
      (entries, obs) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }

        });

      },
      {
        threshold: 0.12
      }
    );

    revealItems.forEach((item) => {
      observer.observe(item);
    });

  } else {

    revealItems.forEach((item) => {
      item.classList.add("visible");
    });

  }


  /* =========================
     SCROLL PROGRESS BAR
  ========================= */

  const progress = document.querySelector(".progress");

  function updateProgress() {

    if (!progress) return;

    const scrollTop = window.scrollY;

    const scrollable =
      document.documentElement.scrollHeight -
      window.innerHeight;

    const percentage =
      scrollable > 0
        ? (scrollTop / scrollable) * 100
        : 0;

    progress.style.width =
      `${Math.min(100, Math.max(0, percentage))}%`;
  }

  window.addEventListener(
    "scroll",
    updateProgress,
    { passive: true }
  );

  updateProgress();


  /* =========================
     CONTACT FORM
     FORMSUBMIT AJAX
  ========================= */

  const form = document.querySelector("#contact-form");
  const status = document.querySelector("#form-status");

  if (form && status) {

    form.addEventListener("submit", async (event) => {

      event.preventDefault();

      const button =
        form.querySelector('button[type="submit"]');

      if (!button) return;

      const originalHTML = button.innerHTML;

      button.disabled = true;
      button.innerHTML = "Sending...";

      status.className = "form-status";
      status.textContent = "";

      try {

        const response = await fetch(
          "https://formsubmit.co/ajax/orivra7@gmail.com",
          {
            method: "POST",
            body: new FormData(form),
            headers: {
              Accept: "application/json"
            }
          }
        );

        const data = await response.json();

        if (response.ok && data.success) {

          form.reset();

          status.className =
            "form-status success";

          status.textContent =
            "✓ Enquiry sent. We will get back to you shortly.";

        } else {

          throw new Error(
            "Form submission failed"
          );

        }

      } catch (error) {

        status.className =
          "form-status error";

        status.textContent =
          "Something went wrong. Please try again.";

      } finally {

        button.disabled = false;
        button.innerHTML = originalHTML;

      }

    });

  }

});
