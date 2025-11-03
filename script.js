function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");

    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

// Simple i18n toggle (english <-> portuguese)
(function () {
  const translations = {
    en: {
      "nav.about": "About",
      "nav.experience": "Experience",
      "nav.projects": "Projects",
      "nav.contact": "Contact",

      "profile.hello": "Hello, I'm",
      "profile.title": "Web Developer",
      "downloadCV": "Download CV",
      "contactInfo": "Contact Info",

      "about.getToKnowMore": "Get To Know More",
      "about.title": "About Me",
      "about.experienceTitle": "Experience",
      "about.educationTitle": "Education",
      "about.educationType": "Professional Formation Course",
      "about.paragraph": "Junior Web Developer from Portugal, passionate about building clean, user-friendly and impactful web applications. With a solid foundation in <b>HTML</b>, <b>CSS</b>, <b>BOOTSTRAP</b>, <b>JavaScript</b>, <b>PHP</b> and <b>MySQL</b>, I enjoy turning ideas into functional and visually appealing websites. Recently finished my Professional Formation Course in Web Development, I eager to apply my skills, learn continuously and contribute to innovative projects. I thrive on detail, problem-solving and creating seamless user experiences. <br>Let's build something amazing together!",

      "contact.getInTouch": "Get in Touch",
      "contact.title": "Contact Me",
      "contact.emailLabel": "Email",
      "contact.linkedinLabel": "LinkedIn",

      "footer.copyright": "Copyright © 2025 Pedro Costa. All rights reserved.",

      "projects.p1.title": "Website for a music artist",
      "projects.p1.desc": "The goal of this project is to create a complete website for a musical brand, combining visual presentation, e-commerce elements, and event promotion. It serves as a practical case study demonstrating web development skills with HTML, CSS, JavaScript and PHP integration.",

      "projects.p2.title": "Eventhive",
      "projects.p2.desc": "A full-stack event management system with user registration, login, CRUD for events, ticket purchasing, shopping cart, user and admin panel. Built using HTML, CSS, BOOTSTRAP, JavaScript, PHP and MySQL.",

      "projects.p3.title": "Website for a music artist (WordPress)",
      "projects.p3.desc": "The goal of this project was to recreate the same website for a musical artist using WordPress, made only using Gutenberg."
    },
    pt: {
      "nav.about": "Sobre",
      "nav.experience": "Experiência",
      "nav.projects": "Projetos",
      "nav.contact": "Contacto",

      "profile.hello": "Olá, sou",
      "profile.title": "Web Developer",
      "downloadCV": "Download CV",
      "contactInfo": "Contacto",

      "about.getToKnowMore": "Saiba Mais",
      "about.title": "Sobre Mim",
      "about.experienceTitle": "Experiência",
      "about.educationTitle": "Formação",
      "about.educationType": "Curso de Formação Profissional",
      "about.paragraph": "Júnior Web Developer de Portugal, apaixonado por criar aplicações web limpas, fáceis de usar e impactantes. Com uma base sólida em <b>HTML</b>, <b>CSS</b>, <b>BOOTSTRAP</b>, <b>JavaScript</b>, <b>PHP</b>, <b>MySQL</b> e com conhecimentos em <b>WordPress</b>, gosto de transformar ideias em sites funcionais e visualmente apelativos. Recentemente concluí o Curso Profissional de Formação em Desenvolvimento Web e estou ansioso por aplicar as minhas competências, aprender continuamente e contribuir para projetos inovadores. Destaco-me pela atenção ao detalhe, pela resolução de problemas e pela criação de experiências de utilizador fluídas. <br>Vamos construir algo incrível juntos!",

      "contact.getInTouch": "Entrar em Contacto",
      "contact.title": "Contacte-me",
      "contact.emailLabel": "Email",
      "contact.linkedinLabel": "LinkedIn",

      "footer.copyright": "Copyright © 2025 Pedro Costa. Todos os direitos reservados.",

      "projects.p1.title": "Site para artista musical",
      "projects.p1.desc": "Este projeto tem como objetivo criar um site completo para uma marca musical, combinando apresentação visual, elementos de comércio eletrónico e promoção de eventos. Serve como um estudo de caso prático que demonstra competências em HTML, CSS, JavaScript e integração com PHP.",

      "projects.p2.title": "Eventhive",
      "projects.p2.desc": "Um sistema completo de gestão de eventos com registo de utilizadores, login, CRUD de eventos, compra de bilhetes, carrinho de compras, painel de utilizador e administrador. Construído com HTML, CSS, BOOTSTRAP, JavaScript, PHP e MySQL.",

      "projects.p3.title": "Site para artista musical (WordPress)",
      "projects.p3.desc": "O objetivo deste projeto foi recriar o mesmo site para um artista musical utilizando WordPress, feito apenas com Gutenberg."
    }
  };

  const STORAGE_KEY = "site-language";
  const defaultLang = localStorage.getItem(STORAGE_KEY) || (navigator.language && navigator.language.startsWith("pt") ? "pt" : "en");

  function applyLanguage(lang) {
    document.documentElement.lang = lang;
    // text-only nodes
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      if (translations[lang] && translations[lang][key] !== undefined) {
        el.textContent = translations[lang][key];
      }
    });
    // html nodes (contain markup)
    document.querySelectorAll("[data-i18n-html]").forEach(el => {
      const key = el.getAttribute("data-i18n-html");
      if (translations[lang] && translations[lang][key] !== undefined) {
        el.innerHTML = translations[lang][key];
      }
    });

    // update language toggle buttons to show the other language label (button shows target language to switch to)
    document.querySelectorAll(".lang-toggle").forEach(btn => {
      btn.textContent = (lang === "en") ? "PT" : "EN";
      btn.setAttribute("aria-pressed", lang !== "en");
    });

    // update CV button to open the correct language file
    const cvBtn = document.getElementById("download-cv-btn");
    if (cvBtn) {
      const cvMap = {
        en: "./assets/Pedro-Costa-CV-EN.pdf",
        pt: "./assets/Pedro-Costa-CV-PT.pdf"
      };
      const cvUrl = cvMap[lang] || cvMap.en;
      // remove previous handlers and set new click behavior
      cvBtn.onclick = () => window.open(cvUrl, "_blank");
      // update aria-label if translation exists
      if (translations[lang] && translations[lang]["downloadCV"]) {
        cvBtn.setAttribute("aria-label", translations[lang]["downloadCV"]);
      }
    }

    localStorage.setItem(STORAGE_KEY, lang);
  }

  function toggleLanguage() {
    const current = localStorage.getItem(STORAGE_KEY) || defaultLang;
    const next = current === "en" ? "pt" : "en";
    applyLanguage(next);
  }

  document.addEventListener("DOMContentLoaded", () => {
    // wire buttons
    document.querySelectorAll(".lang-toggle").forEach(btn => {
      btn.addEventListener("click", toggleLanguage);
    });
    applyLanguage(localStorage.getItem(STORAGE_KEY) || defaultLang);
  });

})();

