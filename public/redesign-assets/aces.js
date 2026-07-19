/* ACES PDSI — shared site behavior: mobile nav + scroll reveal */
(function () {
  "use strict";

  /* ---------- Mobile navigation ---------- */
  function buildMobileNav() {
    var nav = document.querySelector("header .nav");
    var links = document.querySelector("header nav.links");
    if (!nav || !links) return;

    var logo = document.querySelector("header .brand img");

    // Hamburger button
    var toggle = document.createElement("button");
    toggle.className = "navtoggle";
    toggle.setAttribute("aria-label", "Open menu");
    toggle.setAttribute("aria-expanded", "false");
    toggle.innerHTML = "<span></span><span></span><span></span>";
    nav.appendChild(toggle);

    // Slide-out panel, cloned from the desktop links
    var menu = document.createElement("div");
    menu.className = "mobnav";
    menu.innerHTML =
      '<div class="scrim"></div>' +
      '<div class="panel" role="dialog" aria-modal="true" aria-label="Site menu">' +
      '<div class="phead">' +
      (logo ? '<img src="' + logo.getAttribute("src") + '" alt="ACES">' : "<span></span>") +
      '<button class="pclose" aria-label="Close menu">' +
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M6 6l12 12M18 6L6 18"/></svg>' +
      "</button></div>" +
      '<div class="mlinks"></div>' +
      "</div>";
    document.body.appendChild(menu);

    var mlinks = menu.querySelector(".mlinks");
    links.querySelectorAll("a").forEach(function (a) {
      var clone = a.cloneNode(true);
      clone.removeAttribute("style");
      mlinks.appendChild(clone);
    });

    var panel = menu.querySelector(".panel");
    var scrim = menu.querySelector(".scrim");

    function open() {
      menu.classList.add("open");
      panel.style.marginRight = "0px";
      scrim.style.opacity = "1";
      document.body.classList.add("nav-locked");
      toggle.setAttribute("aria-expanded", "true");
      toggle.setAttribute("aria-label", "Close menu");
    }
    function close() {
      menu.classList.remove("open");
      panel.style.marginRight = "";
      scrim.style.opacity = "";
      document.body.classList.remove("nav-locked");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
    }

    toggle.addEventListener("click", function () {
      menu.classList.contains("open") ? close() : open();
    });
    menu.querySelector(".scrim").addEventListener("click", close);
    menu.querySelector(".pclose").addEventListener("click", close);
    mlinks.addEventListener("click", function (e) {
      if (e.target.closest("a")) close();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menu.classList.contains("open")) close();
    });
    // Auto-close if resized back up to desktop
    window.addEventListener("resize", function () {
      if (window.innerWidth > 980 && menu.classList.contains("open")) close();
    });

    // Allow deep-linking the open menu (e.g. for QA): #menu
    if (location.hash === "#menu") open();
  }

  /* ---------- Scroll reveal ---------- */
  function setupReveal() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    var groups = [
      ".triple .ibox",
      ".statement .narrow > *",
      ".bigshot",
      ".feat-row > div",
      ".callout",
      ".blocks .head > *",
      ".bcell",
      ".quote-grid > div",
      ".news .head > *",
      ".post",
      ".faq-head > *",
      ".faq-list details",
      ".cta-inner > *",
      ".section-narrow > *",
      ".vcard",
      ".detail .txt > *",
      ".detail .img-col",
      ".stepc",
      ".person",
      ".evrow",
      ".rescard",
      ".formcard",
      ".contact-aside > *",
      ".kgrid .ki"
    ];

    var targets = [];
    groups.forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (el) {
        targets.push(el);
      });
    });
    if (!targets.length) return;

    // No IntersectionObserver support → never hide; bail before adding has-reveal.
    if (!("IntersectionObserver" in window)) return;

    document.documentElement.classList.add("has-reveal");
    targets.forEach(function (el, i) {
      el.setAttribute("data-reveal", "");
      // small stagger within a row, capped so nothing waits too long
      el.style.transitionDelay = (Math.min(i % 4, 3) * 70) + "ms";
    });

    function reveal(el) {
      el.classList.add("in");
    }

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            reveal(en.target);
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    targets.forEach(function (el) {
      io.observe(el);
    });

    // Belt-and-suspenders scroll fallback (in case the observer misbehaves in
    // some embedding context). Idempotent with the observer above.
    var ticking = false;
    function sweep() {
      ticking = false;
      var h = window.innerHeight;
      var remaining = false;
      targets.forEach(function (el) {
        if (el.classList.contains("in")) return;
        remaining = true;
        if (el.getBoundingClientRect().top < h * 0.92) reveal(el);
      });
      if (!remaining) window.removeEventListener("scroll", onScroll);
    }
    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(sweep);
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });

    // Failsafe: if anything visible is still hidden after a few seconds
    // (observer never fired), reveal it so content is never stuck invisible.
    setTimeout(function () {
      targets.forEach(function (el) {
        if (!el.classList.contains("in")) {
          var r = el.getBoundingClientRect();
          if (r.top < window.innerHeight) reveal(el);
        }
      });
    }, 2600);
  }

  function init() {
    buildMobileNav();
    setupReveal();
    setupBioModal();
  }

  /* ---------- Bio modal ---------- */
  function setupBioModal() {
    if (document.getElementById("bio-modal")) return;
    var modal = document.createElement("div");
    modal.id = "bio-modal";
    modal.setAttribute("hidden", "");
    modal.innerHTML =
      '<div class="bm-backdrop" data-bm-close></div>' +
      '<div class="bm-panel" role="dialog" aria-modal="true" aria-labelledby="bm-name">' +
        '<button class="bm-close" aria-label="Close" data-bm-close>&times;</button>' +
        '<div class="bm-photo"><img alt="" id="bm-photo"></div>' +
        '<div class="bm-body">' +
          '<h3 id="bm-name"></h3>' +
          '<div class="bm-role" id="bm-role"></div>' +
          '<a class="bm-email" id="bm-email" href="#"></a>' +
          '<div class="bm-bio" id="bm-bio"></div>' +
        '</div>' +
      '</div>';
    var style = document.createElement("style");
    style.textContent =
      '#bio-modal[hidden]{display:none}' +
      '#bio-modal{position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;padding:20px}' +
      '#bio-modal .bm-backdrop{position:absolute;inset:0;background:rgba(10,34,54,.55);backdrop-filter:blur(2px)}' +
      '#bio-modal .bm-panel{position:relative;background:#fff;border-radius:18px;max-width:720px;width:100%;max-height:88vh;overflow:auto;display:grid;grid-template-columns:220px 1fr;gap:0;box-shadow:0 30px 80px -20px rgba(10,34,54,.5)}' +
      '#bio-modal .bm-photo{background:#eef2f6}' +
      '#bio-modal .bm-photo img{width:100%;height:100%;object-fit:cover;object-position:center 18%;display:block;min-height:260px}' +
      '#bio-modal .bm-body{padding:28px 30px 30px}' +
      '#bio-modal .bm-body h3{margin:0 0 4px;font-size:22px;font-weight:600}' +
      '#bio-modal .bm-role{color:#5a6b7a;font-size:14px;margin-bottom:10px}' +
      '#bio-modal .bm-email{display:inline-block;font-size:13.5px;color:var(--blue,#0a5cd6);margin-bottom:14px;text-decoration:none}' +
      '#bio-modal .bm-email:hover{text-decoration:underline}' +
      '#bio-modal .bm-bio{font-size:15px;line-height:1.65;color:#1c2b39}' +
      '#bio-modal .bm-close{position:absolute;top:10px;right:12px;background:none;border:0;font-size:28px;line-height:1;cursor:pointer;color:#0a2236;z-index:2}' +
      '@media(max-width:640px){#bio-modal .bm-panel{grid-template-columns:1fr}#bio-modal .bm-photo img{min-height:220px}}';
    document.head.appendChild(style);
    document.body.appendChild(modal);

    function open(btn) {
      var name = btn.getAttribute("data-name") || "";
      var role = btn.getAttribute("data-fulltitle") || btn.getAttribute("data-role") || "";
      var email = btn.getAttribute("data-email") || "";
      var photo = btn.getAttribute("data-photo") || "";
      var bioEl = btn.querySelector(".biofull");
      document.getElementById("bm-name").textContent = name;
      document.getElementById("bm-role").textContent = role;
      var emailEl = document.getElementById("bm-email");
      if (email) { emailEl.textContent = email; emailEl.href = "mailto:" + email; emailEl.style.display = ""; }
      else { emailEl.style.display = "none"; }
      var img = document.getElementById("bm-photo");
      img.src = photo; img.alt = name;
      document.getElementById("bm-bio").innerHTML = bioEl ? bioEl.innerHTML : "";
      modal.removeAttribute("hidden");
      document.body.style.overflow = "hidden";
    }
    function close() {
      modal.setAttribute("hidden", "");
      document.body.style.overflow = "";
    }
    document.addEventListener("click", function (e) {
      var closer = e.target.closest("[data-bm-close]");
      if (closer) { close(); return; }
      var btn = e.target.closest(".person");
      if (btn) { e.preventDefault(); open(btn); }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !modal.hasAttribute("hidden")) close();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
