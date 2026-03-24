function toggleMenu(forceState) {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  const container = document.querySelector(".hamburger-menu");
  if (!menu || !icon || !container) return;

  const isCurrentlyOpen = menu.classList.contains("open");
  const shouldOpen =
    typeof forceState === "boolean" ? forceState : !isCurrentlyOpen;

  menu.classList.toggle("open", shouldOpen);
  icon.classList.toggle("open", shouldOpen);
  container.setAttribute("aria-expanded", shouldOpen ? "true" : "false");
  // prevent background scroll when menu is open (mobile)
  document.documentElement.classList.toggle("menu-open", shouldOpen);
  document.body.classList.toggle("menu-open", shouldOpen);
  document.body.style.overflow = shouldOpen ? "hidden" : "";
}

// small helper: clone desktop nav links into mobile menu (keeps content in sync)
function populateMobileMenu() {
  const mobileMenu = document.getElementById("mobile-menu");
  const desktopLinks = document.querySelectorAll("#desktop-nav .nav-links li");
  if (!mobileMenu || mobileMenu.children.length) return; // already populated or absent

  desktopLinks.forEach((li) => {
    const clone = li.cloneNode(true);
    // close the menu after clicking a mobile link
    clone.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => toggleMenu(false));
    });
    mobileMenu.appendChild(clone);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // wire hamburger interactions
  const hamContainer = document.querySelector(".hamburger-menu");
  const hamIcon = document.querySelector(".hamburger-icon");
  const menu = document.querySelector(".menu-links");

  // icon click
  if (hamIcon) {
    hamIcon.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleMenu();
    });
  }

  // container click (but ignore clicks on language button)
  if (hamContainer) {
    hamContainer.addEventListener("click", (e) => {
      // don't toggle if clicked language button or a menu link
      if (e.target.closest(".lang-toggle") || e.target.closest(".menu-links"))
        return;
      // When clicking container outside language button/icon, toggle
      if (!e.target.closest(".hamburger-icon")) {
        toggleMenu();
      }
    });

    // keyboard support: Enter/Space toggles menu
    hamContainer.addEventListener("keydown", (e) => {
      const key = e.key || e.code;
      if (key === "Enter" || key === " " || key === "Spacebar") {
        e.preventDefault();
        toggleMenu();
      }
    });
  }

  // close the menu if you click outside it while open
  document.addEventListener("click", (e) => {
    if (!menu || !menu.classList.contains("open")) return;
    const container = document.querySelector(".hamburger-menu");
    if (container && !container.contains(e.target)) {
      toggleMenu(false);
    }
  });

  // populate mobile menu from desktop nav if needed
  populateMobileMenu();

  // ensure mobile links close menu when clicked (if populated dynamically)
  document.querySelectorAll(".menu-links a").forEach((a) => {
    a.addEventListener("click", () => toggleMenu(false));
  });

  // Smooth scroll helpers (respect prefers-reduced-motion)
  function safeScrollToPosition(top = 0, left = 0) {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const behavior = prefersReduced ? "auto" : "smooth";
    try {
      window.scrollTo({ top, left, behavior });
    } catch (e) {
      window.scrollTo(top, left);
    }
  }

  function safeScrollToElement(el) {
    if (!el) return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const behavior = prefersReduced ? "auto" : "smooth";
    try {
      el.scrollIntoView({ behavior, block: "start" });
    } catch (e) {
      const rect = el.getBoundingClientRect();
      safeScrollToPosition(window.pageYOffset + rect.top, 0);
    }
  }

  // Ensure page is at the top on refresh/load and when restored from bfcache
  try {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  } catch (e) {
    /* ignore if not allowed */
  }

  // Force top on initial load (respecting reduced-motion)
  safeScrollToPosition(0, 0);

  // For pages restored from bfcache (back/forward), ensure top as well
  window.addEventListener("pageshow", (ev) => {
    if (ev.persisted) safeScrollToPosition(0, 0);
  });

  // Try to move to top before unload to avoid some browsers restoring scroll
  window.addEventListener("beforeunload", () => {
    try {
      window.scrollTo(0, 0);
    } catch (e) {}
  });

  // Smooth anchor navigation for in-page links
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const hash = a.getAttribute("href");
      if (!hash || hash === "#") return;
      const target = document.querySelector(hash);
      if (target) {
        e.preventDefault();
        safeScrollToElement(target);
        // update URL without triggering another scroll
        history.pushState(null, "", hash);
        // ensure mobile menu closes when navigating
        toggleMenu(false);
      }
    });
  });

  // Simple i18n toggle (english <-> portuguese)
  (function () {
    const translations = {
      en: {
        "nav.about": "About",
        "nav.experience": "Experience",
        "nav.certifications": "Certifications",
        "nav.projects": "Projects",
        "nav.contact": "Contact",

        "profile.title": "Web Developer",
        downloadCV: "Download CV",
        contactInfo: "Contact Info",

        "about.title": "About Me",
        "experience.getToKnowMore": "Explore My",
        "experience.title": "Experience",
        "certifications.getToKnowMore": "My",
        "certifications.title": "Certifications",
        "about.experienceTitle": "Experience",
        "about.educationTitle": "Education",
        "about.educationType": "Professional Formation Course",
        "about.paragraph":
          "I'm a skilled Junior Web Developer from Portugal with a passion for creating clean, user-friendly, and impactful web applications. Armed with a strong foundation in <b>HTML</b>, <b>CSS</b>, <b>BOOTSTRAP</b>, <b>JavaScript</b>, <b>PHP</b>, and <b>MySQL</b>, I transform ideas into functional and visually stunning websites. Having recently completed my Professional Formation Course in Web Development, I'm eager to leverage my skills, continuously learn, and contribute to innovative projects. I excel in attention to detail, problem-solving, and crafting seamless user experiences. <br>Let's build something extraordinary together!",

        "projects.getToKnowMore": "Recent",
        "projects.title": "Projects",
        "contact.getInTouch": "Get in Touch",
        "contact.title": "Contact Me",
        "contact.emailLabel": "Email",
        "contact.linkedinLabel": "LinkedIn",

        "footer.copyright":
          "Copyright © 2025 Pedro Costa. All rights reserved.",

        "projects.p1.title": "Musical Artist",
        "projects.p1.desc":
          "The goal of this project is to create a complete website for a musical brand, combining visual presentation, e-commerce elements, and event promotion. It serves as a practical case study demonstrating web development skills with HTML, CSS, JavaScript and PHP integration.",

        "projects.p2.title": "Eventhive",
        "projects.p2.desc":
          "A full-stack event management system with user registration, login, CRUD for events, ticket purchasing, shopping cart, user and admin panel. Built using HTML, CSS, BOOTSTRAP, JavaScript, PHP and MySQL.",

        "projects.p3.title": "Wordpress",
        "projects.p3.desc":
          "The goal of this project is to re-create the Musical Artist website using WordPress (Gutenberg). It also combines visual presentation, e-commerce elements, and event promotion. Made for pure curiosity purposes and practice another technology.",

        "projects.p4.title": "Guess My Number!",
        "projects.p4.desc":
          "Guess My Number is a simple interactive web game developed using HTML, CSS, and JavaScript. The game generates a random number between 1 and 20, and the player must guess it correctly. The player starts with a score of 20 points, which decreases with each incorrect guess. The game provides real-time feedback indicating whether the guess is too high, too low, or correct. A high-score system stores the best result achieved during the session.",

        "projects.p5.title": "Modal Window",
        "projects.p5.desc":
          "A modal window interface built using HTML, CSS, and JavaScript. It allows users to open a modal dialog by clicking multiple buttons and close it through various interactions, a close button, clicking outside the modal, or pressing the Escape key. Demonstrates effective use of DOM manipulation, CSS class toggling, and event handling to control UI visibility and user interactions.",

        "projects.p6.title": "Pig-Game",
        "projects.p6.desc":
          "Two-player interactive dice game developed using HTML, CSS, and JavaScript. Players take turns rolling a dice to accumulate points, with the option to hold their current score or risk losing it by rolling a one. The project showcases strong use of JavaScript for game logic, state management, event handling, and dynamic DOM updates, along with polished UI styling and smooth user interaction.",

        "certifications.c1.title":
          "The Complete JavaScript Course 2025: From Zero to Expert!",
        "certifications.c1.desc":
          "Comprehensive JavaScript course covering fundamentals to advanced concepts including ES6+, asynchronous programming, DOM manipulation, and modern development practices. Completed with certification from Udemy.",
      },
      pt: {
        "nav.about": "Sobre",
        "nav.experience": "Experiência",
        "nav.certifications": "Certificações",
        "nav.projects": "Projetos",
        "nav.contact": "Contactos",

        "profile.title": "Web Developer",
        downloadCV: "Download CV",
        contactInfo: "Contactos",

        "about.title": "Sobre Mim",

        "experience.title": "Experiência",
        "certifications.getToKnowMore": "As minhas",
        "certifications.title": "Certificações",
        "about.experienceTitle": "Experiência",
        "about.educationTitle": "Formação",
        "about.educationType": "Curso de Formação Profissional",
        "about.paragraph":
          "Junior Web Developer de Portugal, apaixonado por criar aplicações web limpas, fáceis de usar e impactantes. Com uma base sólida em <b>HTML</b>, <b>CSS</b>, <b>BOOTSTRAP</b>, <b>JavaScript</b>, <b>PHP</b> e <b>MySQL</b>, e com conhecimentos em <b>WordPress</b>, transformo ideias em sites funcionais e visualmente impressionantes. Tendo recentemente concluído o meu Curso de Formação Profissional em Desenvolvimento Web, estou ansioso por aplicar as minhas competências, aprender continuamente e contribuir para projetos inovadores. Destaco-me pela atenção ao detalhe, pela resolução de problemas e pela criação de experiências de utilizador fluídas. <br>Vamos construir algo extraordinário juntos!",

        "projects.title": "Últimos Projetos",
        "contact.getInTouch": "Entrar em Contacto",
        "contact.title": "Contacte-me",
        "contact.emailLabel": "Email",
        "contact.linkedinLabel": "LinkedIn",

        "footer.copyright":
          "Copyright © 2025 Pedro Costa. Todos os direitos reservados.",

        "projects.p1.title": "Artista Musical",
        "projects.p1.desc":
          "Este projeto tem como objetivo criar um site completo para uma marca musical, combinando apresentação visual, elementos de comércio eletrónico e promoção de eventos. Serve como um estudo de caso prático que demonstra competências em HTML, CSS, JavaScript e integração com PHP.",

        "projects.p2.title": "Eventhive",
        "projects.p2.desc":
          "Um sistema completo de gestão de eventos com registo de utilizadores, login, CRUD de eventos, compra de bilhetes, carrinho de compras, painel de utilizador e administrador. Construído com HTML, CSS, BOOTSTRAP, JavaScript, PHP e MySQL.",

        "projects.p3.title": "WordPress",
        "projects.p3.desc":
          "O objetivo deste projeto é recriar o website de um Artista Musical utilizando WordPress (Gutenberg). Combina apresentação visual, elementos de comércio eletrónico e promoção de eventos. Foi desenvolvido por pura curiosidade e para prática.",

        "projects.p4.title": "Guess My Number!",
        "projects.p4.desc":
          "Guess My Number! é um jogo interativo simples desenvolvido com HTML, CSS e JavaScript. O jogo gera um número aleatório entre 1 e 20, e o jogador deve adivinhar o número correto. O jogador começa com uma pontuação de 20 pontos, que diminui a cada tentativa incorreta. O jogo fornece feedback em tempo real, indicando se a tentativa é demasiado alta, demasiado baixa ou correta. Um sistema de pontuação máxima guarda o melhor resultado alcançado durante a sessão.",

        "projects.p5.title": "Modal Window",
        "projects.p5.desc":
          "Uma interface de janela modal desenvolvida com HTML, CSS e JavaScript. Permite aos utilizadores abrir uma janela modal ao clicar em vários botões e fechá-la através de diferentes interações, como o botão de fechar, clicar fora da janela (overlay) ou pressionar a tecla Escape. Demonstra o uso eficaz da manipulação do DOM, alternância de classes CSS e gestão de eventos para controlar a visibilidade da interface e a interação do utilizador.",

        "projects.p6.title": "Pig-Game",
        "projects.p6.desc":
          "Jogo de dados interativo para dois jogadores desenvolvido com HTML, CSS e JavaScript. Os jogadores alternam turnos a lançar o dado para acumular pontos, tendo a opção de guardar a pontuação atual ou arriscar perdê-la ao lançar um 1. O projeto demonstra uma forte utilização de JavaScript para a lógica do jogo, gestão de estado, tratamento de eventos e atualizações dinâmicas do DOM, aliadas a um design de interface cuidado e uma interação fluida com o utilizador.",

        "certifications.c1.title":
          "The Complete JavaScript Course 2025: From Zero to Expert!",
        "certifications.c1.desc":
          "Curso abrangente de JavaScript que cobre conceitos fundamentais a avançados, incluindo ES6+, programação assíncrona, manipulação do DOM e práticas modernas de desenvolvimento. Concluído com certificação da Udemy.",
      },
    };

    // expose translations globally just for this extra module
    window.portfolioTranslations = translations;

    const STORAGE_KEY = "site-language";
    // default to English when no stored preference
    const defaultLang = localStorage.getItem(STORAGE_KEY) || "en";

    function applyLanguage(lang) {
      document.documentElement.lang = lang;

      // update translations (text/html)
      document.querySelectorAll("[data-i18n]").forEach((el) => {
        const key = el.getAttribute("data-i18n");
        if (translations[lang] && translations[lang][key] !== undefined) {
          el.textContent = translations[lang][key];
        }
      });
      // html nodes (contain markup)
      document.querySelectorAll("[data-i18n-html]").forEach((el) => {
        const key = el.getAttribute("data-i18n-html");
        if (translations[lang] && translations[lang][key] !== undefined) {
          el.innerHTML = translations[lang][key];
        }
      });

      // update CV anchor attributes
      const cvLink = document.getElementById("download-cv-btn");
      if (cvLink) {
        const cvMap = {
          en: "./assets/Pedro-Costa-CV-EN.pdf",
          pt: "./assets/Pedro-Costa-CV-PT.pdf",
        };
        const cvFilenameMap = {
          en: "Pedro-Costa-CV-EN.pdf",
          pt: "Pedro-Costa-CV-PT.pdf",
        };
        const cvUrl = cvMap[lang] || cvMap.en;
        const cvFilename = cvFilenameMap[lang] || cvFilenameMap.en;

        // set anchor attributes (open in new tab + suggest download)
        cvLink.href = cvUrl;
        cvLink.setAttribute("download", cvFilename);
        cvLink.target = "_blank";
        cvLink.rel = "noopener noreferrer";

        // set i18n text/aria
        if (translations[lang] && translations[lang]["downloadCV"]) {
          cvLink.textContent = translations[lang]["downloadCV"];
          cvLink.setAttribute("aria-label", translations[lang]["downloadCV"]);
        }
      }

      // update language toggle buttons to show the other language label (button shows target language to switch to)
      document.querySelectorAll(".lang-toggle").forEach((btn) => {
        btn.textContent = lang === "en" ? "PT" : "EN";
        btn.setAttribute("aria-pressed", lang !== "en");
      });

      localStorage.setItem(STORAGE_KEY, lang);
    }

    function toggleLanguage() {
      const current = localStorage.getItem(STORAGE_KEY) || defaultLang;
      const next = current === "en" ? "pt" : "en";
      applyLanguage(next);
      window.dispatchEvent(
        new CustomEvent("languageChanged", { detail: { lang: next } }),
      );
    }

    function applyTheme(theme) {
      const root = document.documentElement;
      const normalized = theme === "dark" ? "dark" : "light";
      if (normalized === "dark") {
        root.classList.add("dark-mode");
      } else {
        root.classList.remove("dark-mode");
      }
      const themeButtons = document.querySelectorAll(".theme-toggle");
      themeButtons.forEach((btn) => {
        btn.textContent = normalized === "dark" ? "☀️" : "🌙";
        btn.setAttribute(
          "aria-label",
          normalized === "dark"
            ? "Switch to light mode"
            : "Switch to dark mode",
        );
      });
      localStorage.setItem("site-theme", normalized);
    }

    function toggleTheme() {
      const currentTheme = localStorage.getItem("site-theme") || "light";
      applyTheme(currentTheme === "dark" ? "light" : "dark");
    }

    document.querySelectorAll(".lang-toggle").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleLanguage();
      });
    });

    document.querySelectorAll(".theme-toggle").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleTheme();
      });
    });

    applyLanguage(localStorage.getItem(STORAGE_KEY) || defaultLang);
    applyTheme(localStorage.getItem("site-theme") || "light");
  })();

  // Typing effect for about text
  (function () {
    const aboutTextElement = document.getElementById("about-text");
    if (!aboutTextElement) return;

    const translationsRef = window.portfolioTranslations || {};
    const getCurrentLang = () => localStorage.getItem("site-language") || "en";

    let index = 0;
    let isTyping = false;

    function getFullText() {
      const lang = getCurrentLang();
      const target = translationsRef[lang] || translationsRef.en || {};
      return target["about.paragraph"] || aboutTextElement.textContent;
    }

    function typeWriter() {
      const fullText = getFullText();
      if (index < fullText.length) {
        aboutTextElement.innerHTML =
          fullText.substring(0, index + 1) + '<span class="cursor">|</span>';
        index++;
        setTimeout(typeWriter, 30);
      } else {
        aboutTextElement.innerHTML = fullText;
        isTyping = false;
      }
    }

    function startTyping() {
      if (isTyping) return;
      isTyping = true;
      index = 0;
      typeWriter();
    }

    // Start typing when about section comes into view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startTyping();
          }
        });
      },
      { threshold: 0.5 },
    );

    observer.observe(document.getElementById("about"));

    // Update typing when language changes
    window.addEventListener("languageChanged", () => {
      startTyping();
    });
  })();

  // Scroll animations
  (function () {
    const sections = document.querySelectorAll("section");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 },
    );

    sections.forEach((section) => {
      observer.observe(section);
    });
  })();

  // Video modal handlers
  (function () {
    const videoModal = document.getElementById("video-modal");
    const videoIframe = document.getElementById("video-iframe");
    const modalCloseBtn = videoModal
      ? videoModal.querySelector(".video-modal__close")
      : null;
    let lastFocusedElement = null;

    let __currentVideoSrc = "";
    let __currentPosterSrc = "";
    const videoPoster = document.getElementById("video-poster");
    const videoPosterImg = document.getElementById("video-poster-img");
    const videoPlayBtn = document.getElementById("video-play");

    function _startVideo() {
      if (!videoIframe || !__currentVideoSrc) return;
      // set source and play
      videoIframe.src = __currentVideoSrc;
      videoIframe.setAttribute("playsinline", "");
      videoIframe.setAttribute("controls", "");
      videoIframe.load();
      videoIframe.play().catch(() => {});
      // hide poster
      if (videoPoster) videoPoster.classList.add("hidden");
      videoIframe.removeAttribute("aria-hidden");
      modalCloseBtn && modalCloseBtn.focus();
    }

    function openVideoModal(src, opener, poster) {
      if (!videoModal || !videoIframe) return;
      lastFocusedElement = opener || document.activeElement;
      __currentVideoSrc = src;
      __currentPosterSrc = poster || "";

      // If a poster URL is provided, show poster overlay and wait for explicit play
      const usePosterOnly = false;
      if (
        videoPoster &&
        __currentPosterSrc &&
        __currentPosterSrc.trim() !== "" &&
        usePosterOnly
      ) {
        videoPosterImg.src = __currentPosterSrc;
        videoPosterImg.alt = "Video Poster";
        videoPoster.classList.remove("hidden");
        // Keep video unloaded until user clicks play
        videoIframe.removeAttribute("src");
        videoIframe.setAttribute("aria-hidden", "true");
      } else {
        // no poster or we want autoplay
        if (
          videoIframe.tagName &&
          videoIframe.tagName.toLowerCase() === "iframe"
        ) {
          const sep = src.includes("?") ? "&" : "?";
          videoIframe.src = src + sep + "autoplay=1";
        } else {
          videoIframe.src = src;
          videoIframe.setAttribute("playsinline", "");
          videoIframe.setAttribute("controls", "");
          videoIframe.load();
          videoIframe.play().catch(() => {});
        }
      }

      videoModal.classList.remove("hidden");
      videoModal.setAttribute("aria-hidden", "false");
      modalCloseBtn && modalCloseBtn.focus();
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    }

    function closeVideoModal() {
      if (!videoModal || !videoIframe) return;
      videoModal.classList.add("hidden");
      videoModal.setAttribute("aria-hidden", "true");

      if (
        videoIframe.tagName &&
        videoIframe.tagName.toLowerCase() === "iframe"
      ) {
        videoIframe.src = "";
      } else {
        // pause and clear video source to free resources
        try {
          videoIframe.pause();
        } catch (e) {}
        videoIframe.removeAttribute("src");
        videoIframe.load();
      }

      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      if (
        lastFocusedElement &&
        typeof lastFocusedElement.focus === "function"
      ) {
        lastFocusedElement.focus();
      }

      if (videoIframe && videoIframe.tagName.toLowerCase() === "video") {
        videoIframe.addEventListener("click", () => {
          if (videoIframe.paused) {
            videoIframe.play();
          } else {
            videoIframe.pause();
          }
        });
      }
    }

    document.querySelectorAll(".demo-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const src = btn.getAttribute("data-video");
        const poster = btn.getAttribute("data-poster");
        if (!src || src.trim() === "" || src === "#") {
          alert("Video can not be loaded at the moment. Try again later.");
          return;
        }
        openVideoModal(src, btn, poster);
      });
    });

    // Play overlay handlers
    if (videoPlayBtn) {
      videoPlayBtn.addEventListener("click", _startVideo);
    }
    if (videoPoster) {
      videoPoster.addEventListener("click", (e) => {
        // allow clicking poster background or pressing Enter/Space
        _startVideo();
      });
      videoPoster.addEventListener("keypress", (e) => {
        if (e.key === "Enter" || e.key === " ") _startVideo();
      });
    }

    if (modalCloseBtn) {
      modalCloseBtn.addEventListener("click", closeVideoModal);
    }

    if (videoModal) {
      videoModal.addEventListener("click", (e) => {
        if (e.target === videoModal) closeVideoModal();
      });

      document.addEventListener("keypress", (e) => {
        if (e.key === "Escape" && !videoModal.classList.contains("hidden")) {
          closeVideoModal();
        }
      });
    }
  })();
});
