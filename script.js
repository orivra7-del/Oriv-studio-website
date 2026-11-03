/**
 * ORIV STUDIO — Modern Tech / Bento Grid Agency Scripts
 */

document.addEventListener("DOMContentLoaded", () => {
  /* ==========================================================================
     1. Theme Management (Dark / Light Mode)
     ========================================================================== */
  const themeToggle = document.getElementById("themeToggle");
  const htmlRoot = document.documentElement;

  // Retrieve saved preference or check system
  const savedTheme = localStorage.getItem("oriv_theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  const currentTheme = savedTheme || (prefersDark ? "dark" : "light");
  setTheme(currentTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const activeTheme = htmlRoot.getAttribute("data-theme") === "light" ? "dark" : "light";
      setTheme(activeTheme);
    });
  }

  function setTheme(theme) {
    htmlRoot.setAttribute("data-theme", theme);
    localStorage.setItem("oriv_theme", theme);
    if (themeToggle) {
      themeToggle.setAttribute("aria-label", `Switch to ${theme === "dark" ? "light" : "dark"} mode`);
    }
    document.querySelectorAll(".brand-logo-img").forEach((img) => {
      img.src = theme === "light" ? "oriv-logo-light.png" : "oriv-logo.png";
    });
  }

  /* ==========================================================================
     2. Comprehensive Scroll Engine (Progress, Header, Scroll Spy, Parallax)
     ========================================================================== */
  const scrollProgress = document.getElementById("scrollProgress");
  const header = document.querySelector(".header");
  const navLinks = document.querySelectorAll(".nav-desktop .nav-link");
  const sections = document.querySelectorAll("main section[id]");
  const scrollToTopBtn = document.getElementById("scrollToTop");
  const processProgress = document.getElementById("processProgress");
  const processSection = document.getElementById("process");
  const parallaxImages = document.querySelectorAll(".project-preview img");

  let isTicking = false;

  function onScroll() {
    const scrollY = window.scrollY;
    const windowH = window.innerHeight;
    const scrollTotal = document.documentElement.scrollHeight - windowH;

    // A. Top Progress Bar
    if (scrollProgress) {
      const progressPercent = scrollTotal > 0 ? (scrollY / scrollTotal) * 100 : 0;
      scrollProgress.style.width = `${Math.min(100, Math.max(0, progressPercent))}%`;
    }

    // B. Header Compact on Scroll
    if (header) {
      if (scrollY > 50) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    }

    // C. Floating Back to Top Button
    if (scrollToTopBtn) {
      if (scrollY > 400) {
        scrollToTopBtn.classList.add("visible");
      } else {
        scrollToTopBtn.classList.remove("visible");
      }
    }

    // D. Navigation Scroll Spy
    let currentId = "";
    sections.forEach((sec) => {
      const top = sec.offsetTop - 140;
      const height = sec.offsetHeight;
      if (scrollY >= top && scrollY < top + height) {
        currentId = sec.getAttribute("id");
      }
    });

    if (currentId) {
      navLinks.forEach((link) => {
        if (link.getAttribute("href") === `#${currentId}`) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      });
    }

    // E. Process Roadmap Progress Line
    if (processProgress && processSection) {
      const rect = processSection.getBoundingClientRect();
      if (rect.top <= windowH && rect.bottom >= 0) {
        const visiblePct = Math.min(1, Math.max(0, (windowH - rect.top) / (windowH + rect.height * 0.5)));
        processProgress.style.width = `${visiblePct * 100}%`;
      }
    }

    // F. Smooth Scroll Parallax on Project Previews
    parallaxImages.forEach((img) => {
      const parent = img.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      if (rect.top < windowH && rect.bottom > 0) {
        const offset = ((rect.top + rect.height / 2) - windowH / 2) * 0.08;
        img.style.transform = `scale(1.05) translateY(${offset.toFixed(1)}px)`;
      }
    });

    isTicking = false;
  }

  window.addEventListener("scroll", () => {
    if (!isTicking) {
      requestAnimationFrame(onScroll);
      isTicking = true;
    }
  }, { passive: true });
  onScroll();

  if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ==========================================================================
     3. Mobile Navigation Drawer
     ========================================================================== */
  const menuToggle = document.getElementById("menuToggle");
  const mobileNav = document.getElementById("mobileNav");

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mobileNav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", isOpen.toString());
      menuToggle.textContent = isOpen ? "✕" : "☰";
    });

    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰";
      });
    });
  }

  /* ==========================================================================
     4. Enhanced Multi-Directional Scroll Reveal Engine
     ========================================================================== */
  const revealElements = document.querySelectorAll(".reveal, .reveal-up, .reveal-scale, .reveal-left, .reveal-right, .reveal-fade");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add("visible"));
  }

  /* ==========================================================================
     5. Portfolio Filter & Case Studies Data
     ========================================================================== */
  const caseStudiesData = {
    atelier: {
      title: "Atelier No. 07",
      category: "Luxury Fashion & E-Commerce",
      client: "Atelier No. 07 Paris",
      year: "2026",
      url: "atelier.html",
      metrics: [
        { val: "+148%", label: "Mobile Conversion" },
        { val: "0.8s", label: "Page Load Speed" },
        { val: "4.8x", label: "Average Session Time" }
      ],
      challenge: "Transform an artisanal Parisian runway label into a global direct-to-consumer digital flagship without diluting its boutique rarity.",
      solution: "Engineered an editorial e-commerce experience utilizing fluid page transitions, bespoke micro-typography, and high-performance WebGL fabric shaders.",
      stack: ["Next.js", "Shopify Storefront API", "Tailwind CSS", "Three.js", "GSAP"]
    },
    dental: {
      title: "Form Dental",
      category: "Healthcare & Patient Onboarding",
      client: "Form Dental Clinic Group",
      year: "2026",
      url: "dental.html",
      metrics: [
        { val: "3.2x", label: "Online Appointment Bookings" },
        { val: "-62%", label: "Front Desk Admin Calls" },
        { val: "99/100", label: "Google PageSpeed Core" }
      ],
      challenge: "Replace confusing healthcare intake forms with a warm, frictionless digital reception desk that comforts anxious patients.",
      solution: "Designed a multi-step intuitive booking funnel with calendar integrations, real-time insurance verification, and calming minimalist visual direction.",
      stack: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Serverless API"]
    },
    monument: {
      title: "Monument Estates",
      category: "Ultra-Luxury Real Estate",
      client: "Monument Real Estate Partners",
      year: "2026",
      url: "monument.html",
      metrics: [
        { val: "$42M+", label: "Property Inquiries Driven" },
        { val: "88%", label: "Qualified Lead Rate" },
        { val: "Award", label: "Awwwards Site of the Day" }
      ],
      challenge: "Showcase private multimillion-dollar architectural estates to high-net-worth buyers requiring absolute discretion and immersive visual fidelity.",
      solution: "Constructed an immersive bento gallery with interactive 3D floor plans, cinematic drone video streaming, and private enquiry portals.",
      stack: ["Next.js", "WebGL", "PostCSS", "Mapbox GL", "Cloudflare Stream"]
    },
    kroma: {
      title: "Kroma AI",
      category: "SaaS & Generative AI Platform",
      client: "Kroma Systems Inc.",
      year: "2026",
      url: "kroma.html",
      metrics: [
        { val: "120K+", label: "Waitlist Signups" },
        { val: "38%", label: "Visitor-to-Trial Rate" },
        { val: "1st", label: "Product Hunt #1 of the Day" }
      ],
      challenge: "Position an early-stage AI video generation startup above standard generic AI tools with an authoritative, technical visual language.",
      solution: "Developed an interactive bento dashboard teaser, live WebGL particle playground, and frictionless developer documentation.",
      stack: ["Vite", "React", "Canvas API", "Tailwind CSS", "Supabase"]
    }
  };

  // Filter Buttons
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");

      projectCards.forEach((card) => {
        const category = card.getAttribute("data-category");
        if (filter === "all" || category === filter) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // Modal Setup
  const modalOverlay = document.getElementById("caseStudyModal");
  const modalClose = document.getElementById("modalClose");
  const modalHeroBadge = document.getElementById("modalHeroBadge");
  const modalTitle = document.getElementById("modalTitle");
  const modalChallenge = document.getElementById("modalChallenge");
  const modalSolution = document.getElementById("modalSolution");
  const modalMetrics = document.getElementById("modalMetrics");
  const modalStack = document.getElementById("modalStack");
  const modalLiveDemoBtn = document.getElementById("modalLiveDemoBtn");

  projectCards.forEach((card) => {
    card.addEventListener("click", () => {
      const studyKey = card.getAttribute("data-study");
      const data = caseStudiesData[studyKey];
      if (!data || !modalOverlay) return;

      modalHeroBadge.textContent = `${data.category} • ${data.year}`;
      modalTitle.textContent = data.title;
      modalChallenge.textContent = data.challenge;
      modalSolution.textContent = data.solution;

      if (modalLiveDemoBtn && data.url) {
        modalLiveDemoBtn.href = data.url;
        modalLiveDemoBtn.textContent = `Launch ${data.title} Site ↗`;
      }

      // Metrics
      modalMetrics.innerHTML = data.metrics
        .map(
          (m) => `
          <div>
            <div class="modal-metric-val">${m.val}</div>
            <div class="modal-metric-sub">${m.label}</div>
          </div>
        `
        )
        .join("");

      // Tech Stack
      modalStack.innerHTML = data.stack
        .map((s) => `<span class="project-tag">${s}</span>`)
        .join("");

      modalOverlay.classList.add("open");
      document.body.style.overflow = "hidden";
    });
  });

  function closeModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove("open");
    document.body.style.overflow = "";
  }

  if (modalClose) modalClose.addEventListener("click", closeModal);
  if (modalOverlay) {
    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalOverlay && modalOverlay.classList.contains("open")) {
      closeModal();
    }
  });

  /* ==========================================================================
     6. Interactive Pricing / Services Estimator
     ========================================================================== */
  const serviceRadios = document.querySelectorAll('input[name="est-service"]');
  const timelineRadios = document.querySelectorAll('input[name="est-timeline"]');
  const addonCheckboxes = document.querySelectorAll('input[name="est-addon"]');
  const estPriceVal = document.getElementById("estPriceVal");
  const estAltCurrency = document.getElementById("estAltCurrency");
  const estDurationVal = document.getElementById("estDurationVal");
  const estBreakdown = document.getElementById("estBreakdown");
  const applyEstimateBtn = document.getElementById("applyEstimateBtn");
  const currBtnUSD = document.getElementById("currBtnUSD");
  const currBtnINR = document.getElementById("currBtnINR");

  let currentCurrency = "USD";
  const USD_TO_INR = 83.5;

  const serviceData = {
    "marketing-flagship": { name: "Brand & Marketing Flagship", basePrice: 4200, baseWeeks: 4 },
    "saas-webapp": { name: "Custom Web Application / SaaS", basePrice: 7500, baseWeeks: 6 },
    "ecommerce": { name: "Custom E-Commerce Store", basePrice: 6000, baseWeeks: 5 },
    "redesign": { name: "Full Platform Overhaul & Redesign", basePrice: 4800, baseWeeks: 4 }
  };

  const timelineData = {
    standard: { label: "Standard Pace", mult: 1.0, weekMult: 1.0 },
    rush: { label: "Sprint / Rush (+25%)", mult: 1.25, weekMult: 0.6 },
    flexible: { label: "Phased Deployment (-10%)", mult: 0.9, weekMult: 1.4 }
  };

  const addonPrices = {
    "3d-webgl": { name: "3D & Interactive WebGL", price: 1600, inr: 133000 },
    "cms-custom": { name: "Custom CMS Architecture", price: 1200, inr: 100000 },
    "ai-automation": { name: "AI Automation & Chat Integration", price: 1400, inr: 117000 },
    "seo-perf": { name: "Core Web Vitals & SEO Suite", price: 900, inr: 75000 }
  };

  function formatLakhs(amount) {
    const lakhs = (amount / 100000).toFixed(2).replace(/\.00$/, "").replace(/(\.[1-9])0$/, "$1");
    return `₹${lakhs}L`;
  }

  function formatINR(amount) {
    return "₹" + Math.round(amount).toLocaleString("en-IN");
  }

  function formatUSD(amount) {
    return "$" + Math.round(amount).toLocaleString("en-US");
  }

  function calculateEstimate() {
    let selectedService = "marketing-flagship";
    serviceRadios.forEach((r) => {
      if (r.checked) selectedService = r.value;
    });

    let selectedTimeline = "standard";
    timelineRadios.forEach((r) => {
      if (r.checked) selectedTimeline = r.value;
    });

    const sInfo = serviceData[selectedService];
    const tInfo = timelineData[selectedTimeline];

    let addonsTotalUSD = 0;
    const selectedAddonNames = [];

    addonCheckboxes.forEach((cb) => {
      const parentLabel = cb.closest(".addon-item");
      if (cb.checked) {
        if (parentLabel) parentLabel.classList.add("selected");
        const aInfo = addonPrices[cb.value];
        if (aInfo) {
          addonsTotalUSD += aInfo.price;
          selectedAddonNames.push(aInfo.name);
        }
      } else {
        if (parentLabel) parentLabel.classList.remove("selected");
      }
    });

    // Compute base USD and INR
    const baseCalculatedUSD = (sInfo.basePrice + addonsTotalUSD) * tInfo.mult;
    const lowEstUSD = Math.round(baseCalculatedUSD * 0.95);
    const highEstUSD = Math.round(baseCalculatedUSD * 1.15);

    const lowEstINR = Math.round(lowEstUSD * USD_TO_INR);
    const highEstINR = Math.round(highEstUSD * USD_TO_INR);

    const calculatedWeeks = Math.max(2, Math.round(sInfo.baseWeeks * tInfo.weekMult));

    // Update Display based on Active Currency
    if (estPriceVal && estAltCurrency) {
      if (currentCurrency === "INR") {
        estPriceVal.textContent = `${formatINR(lowEstINR)} – ${formatINR(highEstINR)}`;
        estAltCurrency.textContent = `≈ ${formatUSD(lowEstUSD)} – ${formatUSD(highEstUSD)} USD (${formatLakhs(lowEstINR)} – ${formatLakhs(highEstINR)})`;
      } else {
        estPriceVal.textContent = `${formatUSD(lowEstUSD)} – ${formatUSD(highEstUSD)}`;
        estAltCurrency.textContent = `≈ ${formatINR(lowEstINR)} – ${formatINR(highEstINR)} INR (${formatLakhs(lowEstINR)} – ${formatLakhs(highEstINR)})`;
      }
    }

    if (estDurationVal) {
      estDurationVal.textContent = `Estimated Timeline: ~${calculatedWeeks} Weeks`;
    }

    if (estBreakdown) {
      const displayCurrency = currentCurrency === "INR" ? "INR (₹) Indian Rupee" : "USD ($) Global";
      estBreakdown.innerHTML = `
        <div class="est-breakdown-row"><span>Service:</span><strong>${sInfo.name}</strong></div>
        <div class="est-breakdown-row"><span>Timeline:</span><strong>${tInfo.label}</strong></div>
        <div class="est-breakdown-row"><span>Billing Currency:</span><strong>${displayCurrency}</strong></div>
        ${
          selectedAddonNames.length > 0
            ? `<div class="est-breakdown-row"><span>Add-ons:</span><strong>${selectedAddonNames.join(", ")}</strong></div>`
            : `<div class="est-breakdown-row"><span>Add-ons:</span><strong>None selected</strong></div>`
        }
      `;
    }

    return {
      service: sInfo.name,
      timeline: tInfo.label,
      addons: selectedAddonNames,
      usdRange: `${formatUSD(lowEstUSD)} – ${formatUSD(highEstUSD)}`,
      inrRange: `${formatINR(lowEstINR)} – ${formatINR(highEstINR)} (${formatLakhs(lowEstINR)} – ${formatLakhs(highEstINR)})`,
      currentCurrency: currentCurrency,
      duration: `~${calculatedWeeks} Weeks`
    };
  }

  // Currency Toggle Handler
  function setCurrency(curr) {
    currentCurrency = curr;
    if (currBtnUSD && currBtnINR) {
      if (curr === "INR") {
        currBtnINR.classList.add("active");
        currBtnINR.setAttribute("aria-pressed", "true");
        currBtnUSD.classList.remove("active");
        currBtnUSD.setAttribute("aria-pressed", "false");
      } else {
        currBtnUSD.classList.add("active");
        currBtnUSD.setAttribute("aria-pressed", "true");
        currBtnINR.classList.remove("active");
        currBtnINR.setAttribute("aria-pressed", "false");
      }
    }
    calculateEstimate();
  }

  if (currBtnUSD) currBtnUSD.addEventListener("click", () => setCurrency("USD"));
  if (currBtnINR) currBtnINR.addEventListener("click", () => setCurrency("INR"));

  // Bind change events
  serviceRadios.forEach((r) => r.addEventListener("change", calculateEstimate));
  timelineRadios.forEach((r) => r.addEventListener("change", calculateEstimate));
  addonCheckboxes.forEach((cb) => cb.addEventListener("change", calculateEstimate));

  calculateEstimate();

  // Apply Estimate to Contact Form with Both Currencies
  if (applyEstimateBtn) {
    applyEstimateBtn.addEventListener("click", () => {
      const summary = calculateEstimate();
      const messageField = document.getElementById("formMessage");
      const budgetField = document.getElementById("formBudget");
      const serviceSelect = document.getElementById("formService");

      if (serviceSelect) {
        serviceSelect.value = "Estimator Pre-Scoped";
      }

      if (budgetField) {
        budgetField.value = summary.currentCurrency === "INR" 
          ? `${summary.inrRange} / ${summary.usdRange} USD`
          : `${summary.usdRange} / ${summary.inrRange}`;
      }

      if (messageField) {
        messageField.value = `Hi Oriv Studio,\n\nI calculated an estimated project scope using your online estimator:\n- Selected Scope: ${summary.service}\n- Desired Timeline: ${summary.timeline} (${summary.duration})\n- Add-ons: ${summary.addons.join(", ") || "Standard"}\n- Estimated Investment: ${summary.usdRange} USD ≈ ${summary.inrRange} INR\n\nHere are some extra details about our brand & goals: `;
        messageField.focus();
      }

      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  /* ==========================================================================
     7. FAQ Accordion Logic
     ========================================================================== */
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    if (question && answer) {
      question.addEventListener("click", () => {
        const isActive = item.classList.contains("active");

        // Close other items
        faqItems.forEach((other) => {
          if (other !== item) {
            other.classList.remove("active");
            const otherAns = other.querySelector(".faq-answer");
            if (otherAns) otherAns.style.maxHeight = null;
          }
        });

        if (!isActive) {
          item.classList.add("active");
          answer.style.maxHeight = `${answer.scrollHeight + 30}px`;
        } else {
          item.classList.remove("active");
          answer.style.maxHeight = null;
        }
      });
    }
  });

  /* ==========================================================================
     8. AJAX Contact Form Submission
     ========================================================================== */
  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");
  const submitButton = document.getElementById("submitButton");

  if (contactForm && formStatus && submitButton) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const originalBtnText = submitButton.innerHTML;
      submitButton.disabled = true;
      submitButton.innerHTML = "Submitting Enquiry...";
      formStatus.className = "form-status";
      formStatus.textContent = "Transmitting enquiry to Oriv Studio...";

      try {
        const formData = new FormData(contactForm);

        const response = await fetch("https://formsubmit.co/ajax/orivra7@gmail.com", {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json"
          }
        });

        const result = await response.json();

        if (response.ok && (result.success === "true" || result.success === true || result.message)) {
          formStatus.className = "form-status success";
          formStatus.textContent = "✓ Enquiry received! We'll review your scope and respond within 24 hours.";
          contactForm.reset();
          calculateEstimate(); // reset estimator selections if any
        } else {
          formStatus.className = "form-status error";
          formStatus.textContent = "Error sending message. Please email directly at orivra7@gmail.com";
        }
      } catch (err) {
        formStatus.className = "form-status error";
        formStatus.textContent = "Connection error. Please email directly at orivra7@gmail.com";
      } finally {
        submitButton.disabled = false;
        submitButton.innerHTML = originalBtnText;
      }
    });
  }

  /* ==========================================================================
     9. Interactive Custom Cursor Engine
     ========================================================================== */
  const cursorDot = document.getElementById("cursorDot");
  const cursorRing = document.getElementById("cursorRing");

  if (cursorDot && cursorRing && window.matchMedia("(pointer: fine)").matches) {
    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;

    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    });

    function renderCursor() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      cursorRing.style.left = `${ringX}px`;
      cursorRing.style.top = `${ringY}px`;
      requestAnimationFrame(renderCursor);
    }
    renderCursor();

    const interactiveTargets = document.querySelectorAll("a, button, .project-card, .bento-card, .filter-btn, .choice-label, .addon-item, input, textarea, select");
    interactiveTargets.forEach((el) => {
      el.addEventListener("mouseenter", () => cursorRing.classList.add("active"));
      el.addEventListener("mouseleave", () => cursorRing.classList.remove("active"));
    });
  }

  /* ==========================================================================
     10. Interactive Hero Particle Mesh Canvas
     ========================================================================== */
  const canvas = document.getElementById("heroCanvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let width, height;
    let particles = [];
    let mouse = { x: null, y: null, radius: 140 };

    function resizeCanvas() {
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
      initParticles();
    }

    function initParticles() {
      particles = [];
      const count = Math.min(65, Math.floor((width * height) / 16000));
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.7,
          vy: (Math.random() - 0.5) * 0.7,
          radius: Math.random() * 2 + 1,
          baseAlpha: Math.random() * 0.4 + 0.2
        });
      }
    }

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    window.addEventListener("mousemove", (e) => {
      const rect = canvas.getBoundingClientRect();
      if (e.clientY >= rect.top && e.clientY <= rect.bottom) {
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
      } else {
        mouse.x = null;
        mouse.y = null;
      }
    });

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);

      const isDark = document.documentElement.getAttribute("data-theme") !== "light";
      const particleColor = isDark ? "248, 89, 31" : "224, 79, 25";
      const secondaryColor = isDark ? "244, 240, 232" : "166, 166, 166";

      // Draw and connect particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Mouse interaction
        if (mouse.x !== null) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            p.x -= (dx / dist) * force * 2.5;
            p.y -= (dy / dist) * force * 2.5;
          }
        }

        // Draw dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${particleColor}, ${p.baseAlpha})`;
        ctx.fill();

        // Connect with nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            const lineAlpha = (1 - dist / 110) * 0.22;
            ctx.strokeStyle = `rgba(${secondaryColor}, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }

  /* ==========================================================================
     11. 3D Card Interactive Tilt & Spotlight Tracker
     ========================================================================== */
  const tiltCards = document.querySelectorAll(".bento-card, .project-card");

  tiltCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);

      if (window.matchMedia("(pointer: fine)").matches) {
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) * 6;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      }
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
      card.style.removeProperty("--mouse-x");
      card.style.removeProperty("--mouse-y");
    });
  });

  /* ==========================================================================
     12. Magnetic Interactive Buttons
     ========================================================================== */
  const magneticButtons = document.querySelectorAll(".magnetic-btn, .btn-primary");

  if (window.matchMedia("(pointer: fine)").matches) {
    magneticButtons.forEach((btn) => {
      btn.addEventListener("mousemove", (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
      });

      btn.addEventListener("mouseleave", () => {
        btn.style.transform = "";
      });
    });
  }

  /* ==========================================================================
     13. Kinetic Number Count-Up Animations
     ========================================================================== */
  const counterElements = document.querySelectorAll("[data-counter]");

  if ("IntersectionObserver" in window && counterElements.length > 0) {
    const counterObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const targetNum = parseInt(el.getAttribute("data-counter"), 10);
          const prefix = el.getAttribute("data-prefix") || "";
          const suffix = el.getAttribute("data-suffix") || "";
          const duration = 1500;
          const startTime = performance.now();

          function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentVal = Math.round(easeProgress * targetNum);

            el.textContent = `${prefix}${currentVal}${suffix}`;

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              el.textContent = `${prefix}${targetNum}${suffix}`;
              el.classList.add("counted");
            }
          }

          requestAnimationFrame(updateCounter);
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.3 });

    counterElements.forEach((el) => counterObserver.observe(el));
  }

  /* ==========================================================================
     14. Text Scramble Cipher Animation on Hover
     ========================================================================== */
  const scrambleElements = document.querySelectorAll("[data-scramble]");
  const glyphs = "ABCDEF01_!@#*&~/<>[]";

  scrambleElements.forEach((el) => {
    const originalText = el.getAttribute("data-scramble") || el.textContent;
    let intervalId = null;

    el.addEventListener("mouseenter", () => {
      let iteration = 0;
      clearInterval(intervalId);

      intervalId = setInterval(() => {
        el.textContent = originalText
          .split("")
          .map((char, index) => {
            if (index < iteration) {
              return originalText[index];
            }
            if (char === " ") return " ";
            return glyphs[Math.floor(Math.random() * glyphs.length)];
          })
          .join("");

        if (iteration >= originalText.length) {
          clearInterval(intervalId);
        }
        iteration += 1 / 2;
      }, 30);
    });
  });
});
