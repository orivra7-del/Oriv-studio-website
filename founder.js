/**
 * ORIV STUDIO — Founder Introduction Cinematic Scroll Experience
 * Powered by GSAP 3 & ScrollTrigger (Local Engine)
 * 
 * Features:
 * 1. Scroll-scrubbed Hero Timeline (Multi-plane Parallax for Avatar, Ring & Typography)
 * 2. Sequential Storytelling Text & Bento Reveals linked to scroll progress
 * 3. Dynamic Skills Showcase with coordinated staggered movement
 * 4. Smooth Section Transitions & Cinematic CTA Expansion
 * 5. Hardware-Accelerated Transforms (60-120 FPS) with zero layout shifts
 * 6. Full Accessibility & prefers-reduced-motion compliance
 * 7. Graceful mobile experience without sticky pinning
 */

document.addEventListener("DOMContentLoaded", () => {
  // Navigation elements
  const enterBtn = document.getElementById("enterStudioBtn");
  const skipBtn = document.getElementById("skipBtn");
  const avatar = document.getElementById("founderAvatar");
  const heroSection = document.getElementById("hero");
  const planetRing = document.querySelector(".planet-ring");

  // Reduced motion accessibility check
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ==========================================================================
  // A. Seamless Studio Navigation to index.html
  // ==========================================================================
  let isNavigating = false;

  function navigateToStudio(e) {
    if (e) e.preventDefault();
    if (isNavigating) return;
    isNavigating = true;

    if (prefersReducedMotion || typeof gsap === "undefined") {
      window.location.href = "index.html";
      return;
    }

    gsap.to(".founder-wrapper", {
      opacity: 0,
      y: -24,
      scale: 0.985,
      duration: 0.36,
      ease: "power2.inOut",
      onComplete: () => {
        window.location.href = "index.html";
      }
    });
  }

  if (enterBtn) enterBtn.addEventListener("click", navigateToStudio);
  if (skipBtn) skipBtn.addEventListener("click", navigateToStudio);

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") navigateToStudio();
  });

  // If GSAP is not available or reduced motion is preferred, ensure full static visibility
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined" || prefersReducedMotion) {
    document.documentElement.classList.add("static-view");
    return;
  }

  // Register GSAP Plugin
  gsap.registerPlugin(ScrollTrigger);
  document.documentElement.classList.add("gsap-active");

  // ==========================================================================
  // B. Hero Entrance Sequence (Fast, Editorial Intro on Page Load)
  // ==========================================================================
  const introTl = gsap.timeline({ defaults: { ease: "power3.out" } });

  introTl
    .from(".founder-header", { y: -20, opacity: 0, duration: 0.55 })
    .from(".founder-tag", { y: 22, opacity: 0, duration: 0.5 }, "-=0.3")
    .from(".founder-headline", { y: 32, opacity: 0, duration: 0.7 }, "-=0.35")
    .from(".founder-role", { y: 22, opacity: 0, duration: 0.6 }, "-=0.45")
    .from(".founder-bio", { y: 20, opacity: 0, duration: 0.6 }, "-=0.45")
    .from(".handwritten-accent", { y: 16, opacity: 0, duration: 0.6 }, "-=0.4")
    .fromTo(".handwritten-swoosh path",
      { strokeDasharray: 260, strokeDashoffset: 260 },
      { strokeDashoffset: 0, duration: 0.8, ease: "power2.out" },
      "-=0.35"
    )
    .fromTo(".planet-ring",
      { scale: 0.75, opacity: 0, rotation: -12 },
      { scale: 1, opacity: 0.95, rotation: 0, duration: 1.05, ease: "back.out(1.2)" },
      "-=1.1"
    )
    .fromTo("#founderAvatar",
      { y: 38, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 0.9, ease: "power2.out" },
      "-=0.9"
    )
    .fromTo(".crown-doodle",
      { y: -22, opacity: 0, scale: 0.6, rotation: -22 },
      { y: 0, opacity: 1, scale: 1, rotation: -10, duration: 0.75, ease: "back.out(2)" },
      "-=0.6"
    )
    .from(".sparkle", { scale: 0, opacity: 0, stagger: 0.08, duration: 0.5 }, "-=0.5");

  // ==========================================================================
  // C. HERO SCROLL SEQUENCE (Scroll-Scrubbed Multi-Plane Parallax Timeline)
  // ==========================================================================
  const isDesktop = window.innerWidth > 960;

  const heroScrubTl = gsap.timeline({
    scrollTrigger: {
      trigger: "#hero",
      start: "top top",
      end: "bottom top",
      scrub: 1.1,
      invalidateOnRefresh: true
    }
  });

  // 1. Foreground Founder Avatar Parallax & Natural Scale
  heroScrubTl.to("#founderAvatar", {
    y: isDesktop ? 90 : 55,
    scale: isDesktop ? 1.035 : 1.02,
    ease: "power1.inOut"
  }, 0);

  // 2. Background Planetary Ring Multi-Plane Depth (Moves faster + scales + rotates)
  heroScrubTl.to(".planet-ring", {
    y: isDesktop ? 160 : 95,
    scale: isDesktop ? 1.24 : 1.15,
    rotation: isDesktop ? 22 : 12,
    opacity: 0.82,
    ease: "power1.inOut"
  }, 0);

  // 3. Crown Doodle Vertical Drift
  heroScrubTl.to(".crown-doodle", {
    y: isDesktop ? 65 : 40,
    rotation: -3,
    opacity: 0.65,
    ease: "power1.inOut"
  }, 0);

  // 4. Hero Content Typography Coordinated Glide & Soft Fade
  heroScrubTl.to(".founder-tag", { y: -28, opacity: 0.15, ease: "power1.inOut" }, 0);
  heroScrubTl.to(".founder-headline", { y: -75, opacity: 0.05, ease: "power1.inOut" }, 0);
  heroScrubTl.to(".founder-role", { y: -60, opacity: 0.1, ease: "power1.inOut" }, 0);
  heroScrubTl.to(".founder-bio", { y: -45, opacity: 0.15, ease: "power1.inOut" }, 0);
  heroScrubTl.to(".handwritten-accent", { y: -35, opacity: 0.15, scale: 0.96, ease: "power1.inOut" }, 0);

  // 5. Sparkles Dispersal
  heroScrubTl.to(".sparkle-1", { y: -70, x: 25, opacity: 0 }, 0);
  heroScrubTl.to(".sparkle-2", { y: -35, x: -20, opacity: 0 }, 0);
  heroScrubTl.to(".sparkle-3", { y: 90, x: 30, opacity: 0 }, 0);
  heroScrubTl.to(".sparkle-4", { y: 50, x: -15, opacity: 0 }, 0);

  // 6. Ambient Studio Glows
  heroScrubTl.to(".ambient-top-left", { y: 160, opacity: 0.2 }, 0);
  heroScrubTl.to(".ambient-bottom-right", { y: -150, opacity: 0.55 }, 0);

  // ==========================================================================
  // D. STORYTELLING & SKILLS BENTO SECTIONS (Sequential Scroll-Linked Reveals)
  // ==========================================================================
  ScrollTrigger.matchMedia({
    // Desktop Viewport (> 960px)
    "(min-width: 961px)": function() {
      const detailsTl = gsap.timeline({
        scrollTrigger: {
          trigger: "#detailsSection",
          start: "top 84%",
          end: "top 30%",
          scrub: 0.85
        }
      });

      const cards = gsap.utils.toArray(".details-section .detail-card");
      const dividers = gsap.utils.toArray(".details-section .card-divider");

      // Sequential Bento Card Reveals
      detailsTl
        .fromTo(cards[0], 
          { y: 55, opacity: 0.2, scale: 0.95 }, 
          { y: 0, opacity: 1, scale: 1, ease: "power2.out" }, 
          0
        )
        .fromTo(dividers[0], 
          { scaleY: 0 }, 
          { scaleY: 1, ease: "power2.out" }, 
          0.08
        )
        .fromTo(cards[1], 
          { y: 55, opacity: 0.2, scale: 0.95 }, 
          { y: 0, opacity: 1, scale: 1, ease: "power2.out" }, 
          0.14
        )
        .fromTo(dividers[1], 
          { scaleY: 0 }, 
          { scaleY: 1, ease: "power2.out" }, 
          0.22
        )
        .fromTo(cards[2], 
          { y: 55, opacity: 0.2, scale: 0.95 }, 
          { y: 0, opacity: 1, scale: 1, ease: "power2.out" }, 
          0.26
        )
        .fromTo(".card-icon", 
          { scale: 0.65, rotation: -12 }, 
          { scale: 1, rotation: 0, stagger: 0.12, ease: "back.out(1.8)" }, 
          0.1
        )
        .fromTo(".skill-pill", 
          { y: 16, x: 12, opacity: 0, scale: 0.9 }, 
          { y: 0, x: 0, opacity: 1, scale: 1, stagger: 0.035, ease: "power2.out" }, 
          0.16
        );

      // Subtle horizontal ribbon drift on skill pills linked to scroll
      gsap.to(".skill-pill:nth-child(odd)", {
        x: -8,
        ease: "none",
        scrollTrigger: {
          trigger: "#detailsSection",
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5
        }
      });

      gsap.to(".skill-pill:nth-child(even)", {
        x: 8,
        ease: "none",
        scrollTrigger: {
          trigger: "#detailsSection",
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5
        }
      });
    },

    // Mobile & Tablet Viewport (<= 960px)
    "(max-width: 960px)": function() {
      const cards = gsap.utils.toArray(".details-section .detail-card");
      cards.forEach((card) => {
        gsap.fromTo(card,
          { y: 38, opacity: 0.25, scale: 0.97 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              end: "top 52%",
              scrub: 0.65
            }
          }
        );
      });

      gsap.fromTo(".skill-pill",
        { y: 14, opacity: 0, scale: 0.92 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.04,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".skills-grid",
            start: "top 88%",
            end: "top 55%",
            scrub: 0.6
          }
        }
      );
    }
  });

  // ==========================================================================
  // E. SECTION TRANSITION & FINAL CTA EXPANSION (Cinematic Finale)
  // ==========================================================================
  const ctaTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: "#enterCtaSection",
      start: "top 90%",
      end: "top 42%",
      scrub: 0.9
    }
  });

  ctaTimeline
    .fromTo("#enterCtaCard",
      { y: 55, scale: 0.93, opacity: 0.35 },
      { y: 0, scale: 1, opacity: 1, ease: "power2.out" },
      0
    )
    .fromTo(".cta-eyebrow",
      { opacity: 0, y: 14, letterSpacing: "0.22em" },
      { opacity: 1, y: 0, letterSpacing: "0.12em", ease: "power2.out" },
      0.08
    )
    .fromTo(".enter-studio-btn",
      { opacity: 0, x: -22 },
      { opacity: 1, x: 0, ease: "power2.out" },
      0.12
    )
    .fromTo(".enter-arrow",
      { x: -16, opacity: 0 },
      { x: 0, opacity: 1, ease: "back.out(2.2)" },
      0.2
    )
    .fromTo(".social-circle",
      { scale: 0.65, y: 22, opacity: 0 },
      { scale: 1, y: 0, opacity: 1, stagger: 0.07, ease: "back.out(1.8)" },
      0.16
    )
    .fromTo(".footer-rule",
      { scaleX: 0 },
      { scaleX: 1, ease: "power2.out" },
      0.3
    )
    .fromTo(".footer-credo",
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, ease: "power2.out" },
      0.35
    );

  // ==========================================================================
  // F. Desktop Interactive Mouse Micro-Tilt (GPU QuickTo)
  // ==========================================================================
  if (avatar && heroSection && window.matchMedia("(pointer: fine)").matches) {
    const tiltX = gsap.quickTo("#founderAvatar", "x", { duration: 0.65, ease: "power3.out" });

    heroSection.addEventListener("mousemove", (e) => {
      const rect = heroSection.getBoundingClientRect();
      const normX = (e.clientX - rect.left) / rect.width - 0.5;
      tiltX(normX * 14); // subtle max 7px tilt
    }, { passive: true });

    heroSection.addEventListener("mouseleave", () => {
      tiltX(0);
    });
  }

  // ==========================================================================
  // G. Interactive Skill Pills Micro-Haptics
  // ==========================================================================
  const skillPills = document.querySelectorAll(".skill-pill");
  skillPills.forEach((pill) => {
    pill.addEventListener("mouseenter", () => {
      gsap.to(pill, { scale: 1.05, duration: 0.2, ease: "power1.out" });
    });
    pill.addEventListener("mouseleave", () => {
      gsap.to(pill, { scale: 1, duration: 0.25, ease: "power1.out" });
    });
  });
});
