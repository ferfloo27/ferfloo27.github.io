/* =========================================================
   Portafolio — Fernando Calle Gonzales
   JavaScript puro, sin dependencias.  Tema: speedcubing.
   ========================================================= */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Año del footer ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Tema claro / oscuro ---------- */
  var themeToggle = document.getElementById("themeToggle");
  var root = document.documentElement;

  try {
    var saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") root.setAttribute("data-theme", saved);
  } catch (e) {}

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      var current = root.getAttribute("data-theme");
      if (!current) current = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      var next = current === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
    });
  }

  /* ---------- Menú móvil ---------- */
  var navToggle = document.getElementById("navToggle");
  var navMenu = document.getElementById("navMenu");

  function closeMenu() {
    if (!navMenu) return;
    navMenu.classList.remove("is-open");
    if (navToggle) navToggle.setAttribute("aria-expanded", "false");
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      var open = navMenu.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    navMenu.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", closeMenu); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeMenu(); });
  }

  /* =========================================================
     CUBO DE RUBIK
     ========================================================= */
  var CUBE_COLORS = {
    white:  "#f3f3f3", yellow: "#ffd500", red: "#c41e3a",
    orange: "#ff5800", blue:   "#0051ba", green: "#009e60"
  };
  // Color "resuelto" de cada cara
  var FACE_COLORS = {
    front: "green", back: "blue", right: "red",
    left:  "orange", top: "white", bottom: "yellow"
  };
  var COLOR_NAMES = Object.keys(CUBE_COLORS);

  // Crea 9 stickers por cara y guarda su color resuelto
  function buildCube(cubeEl) {
    if (!cubeEl) return [];
    var stickers = [];
    cubeEl.querySelectorAll(".cube__face").forEach(function (face) {
      var solved = CUBE_COLORS[FACE_COLORS[face.getAttribute("data-face")]];
      for (var i = 0; i < 9; i++) {
        var s = document.createElement("span");
        s.className = "sticker";
        s.dataset.solved = solved;
        s.style.background = solved;
        face.appendChild(s);
        stickers.push(s);
      }
    });
    return stickers;
  }

  /* ---------- Cubo mini que gira con el scroll ---------- */
  var miniScene = document.getElementById("miniCube");
  var miniCube = miniScene ? miniScene.querySelector(".cube") : null;
  buildCube(miniCube);

  /* =========================================================
     NOMBRE QUE SE "RESUELVE" (como un cubo al cargar)
     ========================================================= */
  var heroName = document.getElementById("heroName");
  if (heroName) {
    var fullName = heroName.textContent.trim();
    heroName.setAttribute("aria-label", fullName);
    heroName.textContent = "";

    var words = fullName.split(" ");
    words.forEach(function (word, wi) {
      var wspan = document.createElement("span");
      wspan.className = "hero-word";
      word.split("").forEach(function (ch) {
        var l = document.createElement("span");
        l.className = "hero-letter";
        l.setAttribute("aria-hidden", "true");
        l.textContent = ch;
        if (!reduceMotion) {
          var rx = (Math.random() * 180 - 90) | 0;
          var ry = (Math.random() * 180 - 90) | 0;
          var ty = (Math.random() * 44 - 22) | 0;
          l.style.transform = "perspective(600px) rotateX(" + rx + "deg) rotateY(" + ry + "deg) translateY(" + ty + "px)";
          l.style.opacity = "0";
        }
        wspan.appendChild(l);
      });
      heroName.appendChild(wspan);
      if (wi < words.length - 1) heroName.appendChild(document.createTextNode(" "));
    });

    if (!reduceMotion) {
      var letters = heroName.querySelectorAll(".hero-letter");
      letters.forEach(function (l, i) { l.style.transitionDelay = (0.3 + i * 0.07) + "s"; });
      // Dispara la "resolución" en el siguiente frame
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          letters.forEach(function (l) { l.style.transform = ""; l.style.opacity = ""; });
        });
      });
      // Al terminar, limpia los delays para que el hover responda al instante
      var totalMs = (0.3 + letters.length * 0.07 + 1.0) * 1000;
      setTimeout(function () {
        letters.forEach(function (l) { l.style.transitionDelay = ""; l.style.willChange = "auto"; });
      }, totalMs);
    }
  }

  /* =========================================================
     FONDO INTERCALADO POR SECCIÓN (halos + notaciones)
     ========================================================= */
  var SCRAMBLE_LINES = [
    "R U R' U R U2 R'", "F R U' R' U' R U R' F'", "R U2 R' U' R U' R'",
    "M2 U M2 U2 M2 U M2", "x R2 F R F' R U2 r'", "U R U' L' U R' U' L",
    "R' U R U2 L' R U' R'", "F R U R' U' F' U F"
  ];
  var GLOW_SETS = [
    ["green", "blue", "red"],
    ["blue", "red", "green"],
    ["red", "green", "blue"]
  ];

  document.querySelectorAll(".section--scramble").forEach(function (sec, idx) {
    var fx = document.createElement("div");
    fx.className = "section-fx";
    fx.setAttribute("aria-hidden", "true");

    GLOW_SETS[idx % GLOW_SETS.length].forEach(function (c) {
      var g = document.createElement("span");
      g.className = "glow glow--" + c;
      fx.appendChild(g);
    });

    var scr = document.createElement("div");
    scr.className = "hero__scramble" + (idx % 2 === 1 ? " hero__scramble--left" : "");
    SCRAMBLE_LINES.forEach(function (t) {
      var s = document.createElement("span");
      s.className = "scr-line";
      s.textContent = t;
      scr.appendChild(s);
    });
    fx.appendChild(scr);

    sec.insertBefore(fx, sec.firstChild);
  });

  /* ---------- Animaciones de entrada (reveal) ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add("is-visible"); io.unobserve(entry.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Enlace activo según la sección visible ---------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav__menu a[href^="#"]'));
  var sections = navLinks
    .map(function (link) { return document.querySelector(link.getAttribute("href")); })
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute("id");
          navLinks.forEach(function (link) {
            link.classList.toggle("is-active", link.getAttribute("href") === "#" + id);
          });
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- Scroll: botón arriba + giro del cubo mini ---------- */
  var toTop = document.getElementById("toTop");
  var ticking = false;

  function onScroll() {
    var y = window.scrollY;
    var show = y > 500;
    if (toTop) toTop.classList.toggle("is-visible", show);
    if (miniScene) miniScene.classList.toggle("is-visible", show);
    if (miniCube && !reduceMotion) {
      miniCube.style.transform = "rotateX(" + (-24 - y * 0.12) + "deg) rotateY(" + (-28 + y * 0.28) + "deg)";
    }
    ticking = false;
  }

  window.addEventListener("scroll", function () {
    if (!ticking) { window.requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });

  if (toTop) {
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
  }
})();
