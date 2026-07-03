document.addEventListener("DOMContentLoaded", () => {
  // 1. Inisialisasi AOS (Animasi Scroll)
  AOS.init({ once: true, offset: 50 });

  // 2. Typing Effect (Typed.js)
  if (document.getElementById("typed-text")) {
    new Typed("#typed-text", {
      strings: [
        "Software Engineer",
        "Backend Developer",
        "Cloud Engineer",
        "AI Enthusiast",
      ],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 2000,
      loop: true,
      showCursor: true,
      cursorChar: "|",
    });
  }

  // 3. Dark Mode Logic
  const themeToggleBtn = document.getElementById("theme-toggle");
  const darkIcon = document.getElementById("theme-toggle-dark-icon");
  const lightIcon = document.getElementById("theme-toggle-light-icon");

  if (document.documentElement.classList.contains("dark")) {
    lightIcon.classList.remove("hidden");
  } else {
    darkIcon.classList.remove("hidden");
  }

  themeToggleBtn.addEventListener("click", function () {
    darkIcon.classList.toggle("hidden");
    lightIcon.classList.toggle("hidden");

    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  });

  // 4. Progress Bar & Back To Top
  window.addEventListener("scroll", () => {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;

    const progressBar = document.getElementById("progress-bar");
    if (progressBar) progressBar.style.width = scrolled + "%";

    const backToTopBtn = document.getElementById("back-to-top");
    if (backToTopBtn) {
      if (winScroll > 300) {
        backToTopBtn.classList.remove(
          "opacity-0",
          "pointer-events-none",
          "translate-y-4"
        );
        backToTopBtn.classList.add(
          "opacity-100",
          "pointer-events-auto",
          "translate-y-0"
        );
      } else {
        backToTopBtn.classList.add(
          "opacity-0",
          "pointer-events-none",
          "translate-y-4"
        );
        backToTopBtn.classList.remove(
          "opacity-100",
          "pointer-events-auto",
          "translate-y-0"
        );
      }
    }
  });

  const backToTopBtn = document.getElementById("back-to-top");
  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // 5. Spotlight Effect
  document.querySelectorAll(".spotlight-card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });
  });

  // 6. Magnetic Cursor
  const cursorDot = document.querySelector(".cursor-dot");
  const cursorOutline = document.querySelector(".cursor-outline");

  if (
    window.matchMedia("(pointer: fine)").matches &&
    cursorDot &&
    cursorOutline
  ) {
    window.addEventListener("mousemove", (e) => {
      const posX = e.clientX;
      const posY = e.clientY;

      cursorDot.style.left = `${posX}px`;
      cursorDot.style.top = `${posY}px`;

      cursorOutline.animate(
        { left: `${posX}px`, top: `${posY}px` },
        { duration: 500, fill: "forwards" }
      );
    });

    const interactables = document.querySelectorAll(
      "a, button, input, textarea"
    );
    interactables.forEach((el) => {
      el.addEventListener("mouseenter", () =>
        document.body.classList.add("cursor-hover")
      );
      el.addEventListener("mouseleave", () =>
        document.body.classList.remove("cursor-hover")
      );
    });
  }

  // ==========================================
  // 7. SECRET BACKDOOR LOGIN (HP & DESKTOP)
  // DENGAN KEAMANAN HASH / OBFUSCATION
  // ==========================================

  // A. Trigger Lewat Keyboard (Untuk Laptop)
  let secretKeys = ["i", "n", "v", "e", "s", "t"];
  let keyIndex = 0;

  window.addEventListener("keydown", (e) => {
    if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;

    if (e.key.toLowerCase() === secretKeys[keyIndex]) {
      keyIndex++;
      if (keyIndex === secretKeys.length) {
        triggerLogin();
        keyIndex = 0;
      }
    } else {
      keyIndex = 0;
    }
  });

  // B. Trigger Lewat Tombol Gembok (Untuk HP)
  const secretLoginBtn = document.getElementById("secret-login-btn");
  if (secretLoginBtn) {
    secretLoginBtn.addEventListener("click", triggerLogin);
  }

  // Fungsi Login Aman
  function triggerLogin() {
    setTimeout(() => {
      let password = prompt(
        "🚨 SYSTEM OVERRIDE 🚨\nEnter Master Password to Access Analytics DB:"
      );
      if (!password) return; // Jika ditekan Cancel

      // Mengamankan input: Mengubah teks jadi Base64 lalu dibalik (Reverse)
      const hashedInput = btoa(password).split("").reverse().join("");

      // KODE YANG DIPERBAIKI: "2IDMyEmck5WS" adalah sandi yang benar untuk "Indra2026"
      if (hashedInput === "2IDMyEmck5WS") {
        alert("Access Granted. Welcome back, Admin Indra.");
        window.location.href = "dashboard.html";
      } else {
        alert("Access Denied. Security Protocol Activated.");
      }
    }, 100);
  }
});
