/* ==========================================================================
   Portfolio — UI behaviour
   Each feature lives in its own function and is wired up at the bottom.
   ========================================================================== */

const MOBILE_MENU_QUERY = window.matchMedia("(max-width: 48em)");
const LANGUAGES = ["en", "pt"];
const LANGUAGE_STORAGE_KEY = "site-language";

/* ---------- Translation helper for strings set from JavaScript ---------- */
function t(key) {
    const lang = document.documentElement.lang;
    return TRANSLATIONS[lang]?.[key] ?? TRANSLATIONS.en[key] ?? key;
}

/* ---------- Language (EN / PT) ---------- */
function initLanguage() {
    const button = document.querySelector("[data-lang-toggle]");
    const root = document.documentElement;

    // Snapshot the English content from the markup so we can switch back to it
    const textNodes = [...document.querySelectorAll("[data-i18n]")].map((el) => ({
        el,
        key: el.dataset.i18n,
        en: el.textContent,
    }));

    // data-i18n-attr="attribute:key", e.g. "aria-label:socials.github"
    const attrNodes = [...document.querySelectorAll("[data-i18n-attr]")].map((el) => {
        const [attr, key] = el.dataset.i18nAttr.split(":");
        return { el, attr, key, en: el.getAttribute(attr) };
    });

    const apply = (lang) => {
        const strings = TRANSLATIONS[lang] ?? {};
        root.lang = lang;

        textNodes.forEach(({ el, key, en }) => {
            el.textContent = lang === "en" ? en : strings[key] ?? en;
        });
        attrNodes.forEach(({ el, attr, key, en }) => {
            el.setAttribute(attr, lang === "en" ? en : strings[key] ?? en);
        });

        // The button shows the language you would switch to
        if (button) {
            const other = lang === "en" ? "pt" : "en";
            button.textContent = other.toUpperCase();
            button.setAttribute("lang", other);
            button.setAttribute("aria-label", t("lang.switch"));
        }

        document.dispatchEvent(new CustomEvent("languagechange"));
    };

    const saved = (() => {
        try {
            return localStorage.getItem(LANGUAGE_STORAGE_KEY);
        } catch (error) {
            return null;
        }
    })();
    const browserLang = navigator.language?.toLowerCase().startsWith("pt") ? "pt" : "en";
    apply(LANGUAGES.includes(saved) ? saved : browserLang);

    button?.addEventListener("click", () => {
        const next = root.lang === "en" ? "pt" : "en";
        apply(next);
        try {
            localStorage.setItem(LANGUAGE_STORAGE_KEY, next);
        } catch (error) {
            // Storage unavailable: language still switches for this visit
        }
    });
}

/* ---------- Mobile navigation ---------- */
function initMobileNav() {
    const toggle = document.querySelector("[data-nav-toggle]");
    const menu = document.querySelector("[data-nav-menu]");
    if (!toggle || !menu) return;

    const isOpen = () => toggle.getAttribute("aria-expanded") === "true";
    const setOpen = (open) => {
        toggle.setAttribute("aria-expanded", String(open));
        toggle.setAttribute("aria-label", t(open ? "menu.close" : "menu.open"));
        menu.classList.toggle("is-open", open);
    };

    toggle.addEventListener("click", () => setOpen(!isOpen()));
    document.addEventListener("languagechange", () => setOpen(isOpen()));

    // Close after choosing a link, pressing Escape, or clicking outside
    menu.addEventListener("click", (event) => {
        if (event.target.closest("a")) setOpen(false);
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && isOpen()) {
            setOpen(false);
            toggle.focus();
        }
    });

    document.addEventListener("click", (event) => {
        if (isOpen() && !event.target.closest(".nav")) setOpen(false);
    });

    // Reset when resizing back to desktop
    MOBILE_MENU_QUERY.addEventListener("change", () => setOpen(false));
}

/* ---------- Light / dark theme ---------- */
function initThemeToggle() {
    const button = document.querySelector("[data-theme-toggle]");
    if (!button) return;

    const root = document.documentElement;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

    const currentTheme = () => root.dataset.theme || (prefersDark.matches ? "dark" : "light");

    button.addEventListener("click", () => {
        const next = currentTheme() === "dark" ? "light" : "dark";
        root.dataset.theme = next;
        try {
            localStorage.setItem("theme", next);
        } catch (error) {
            // Storage unavailable (private mode, blocked cookies): theme still switches for this visit
        }
    });
}

/* ---------- Header border once the page is scrolled ---------- */
function initHeaderScroll() {
    const header = document.querySelector("[data-header]");
    if (!header) return;

    const update = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
    update();
    window.addEventListener("scroll", update, { passive: true });
}

/* ---------- Highlight the nav link of the section in view ---------- */
function initActiveNavLink() {
    const links = document.querySelectorAll(".nav__links a[href^='#']");
    // Includes the hero, which has no link, so nothing is highlighted at the top
    const sections = document.querySelectorAll("main section[id]");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                links.forEach((link) => {
                    const isActive = link.getAttribute("href") === `#${entry.target.id}`;
                    if (isActive) link.setAttribute("aria-current", "location");
                    else link.removeAttribute("aria-current");
                });
            });
        },
        // A thin band across the middle of the viewport decides the active section
        { rootMargin: "-45% 0px -50% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
}

/* ---------- Fade elements in as they enter the viewport ---------- */
function initScrollReveal() {
    const elements = document.querySelectorAll("[data-reveal]");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            });
        },
        { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    elements.forEach((element) => observer.observe(element));
}

/* ---------- Copy email to clipboard ---------- */
function initCopyButtons() {
    const status = document.querySelector("[data-copy-status]");

    document.querySelectorAll("[data-copy]").forEach((button) => {
        button.addEventListener("click", async () => {
            try {
                await navigator.clipboard.writeText(button.dataset.copy);
            } catch (error) {
                return; // Clipboard blocked: the mailto link is still there
            }

            button.classList.add("is-copied");
            if (status) status.textContent = t("copy.done");

            setTimeout(() => {
                button.classList.remove("is-copied");
                if (status) status.textContent = "";
            }, 2000);
        });
    });
}

/* ---------- Project demo videos (native <dialog>) ---------- */
function initVideoDialog() {
    const dialog = document.querySelector("[data-video-dialog]");
    if (!dialog || typeof dialog.showModal !== "function") return;

    const title = dialog.querySelector("[data-video-dialog-title]");
    const player = dialog.querySelector("[data-video-player]");

    document.querySelectorAll("[data-video]").forEach((button) => {
        button.addEventListener("click", () => {
            title.textContent = button.dataset.videoTitle || "";
            // Videos are large, so they're only loaded when someone asks for them
            player.src = button.dataset.video;
            dialog.showModal();
            player.play().catch(() => {
                // Autoplay blocked: the controls are there to start it manually
            });
        });
    });

    dialog.querySelector("[data-video-close]")?.addEventListener("click", () => dialog.close());

    // Clicking the dimmed backdrop (outside the dialog box) closes it
    dialog.addEventListener("click", (event) => {
        if (event.target === dialog) dialog.close();
    });

    // Runs for every way of closing, including the Escape key
    dialog.addEventListener("close", () => {
        player.pause();
        player.removeAttribute("src");
        player.load();
    });
}

/* ---------- Footer year ---------- */
function initCurrentYear() {
    const year = document.querySelector("[data-year]");
    if (year) year.textContent = new Date().getFullYear();
}

initMobileNav();
initLanguage(); // after initMobileNav so the menu button label gets translated too
initThemeToggle();
initHeaderScroll();
initActiveNavLink();
initScrollReveal();
initCopyButtons();
initVideoDialog();
initCurrentYear();
