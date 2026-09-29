# Portfolio

Personal portfolio of Pedro Costa, Web Developer. Built with plain HTML, CSS and JavaScript, with no build step.

## Features

- Responsive layout (mobile-first grids, accessible mobile menu)
- English / Portuguese (PT-PT) toggle, auto-detected from the browser and remembered
- Light / dark theme (follows the system preference, remembers the manual choice)
- Scroll-reveal animations that respect `prefers-reduced-motion`
- Active section highlighting in the navigation
- Project demo videos in an accessible dialog
- Copy-to-clipboard for the email address
- Accessible markup: semantic landmarks, skip link, keyboard-friendly controls

## Structure

```
index.html
css/
  base.css         design tokens (colors, spacing, type), reset, utilities
  components.css   header, navigation, buttons, cards, tags, badge
  sections.css     hero, about, skills, projects, contact, footer
js/
  i18n.js          Portuguese translations (English lives in index.html)
  main.js          one small function per UI feature
assets/
  favicon.svg
  images/          profile photos and project screenshots (800px JPEG)
  docs/            CV in English and Portuguese (PDF)
Video-Demos/       project demo videos (.mp4), loaded only when a Demo button is clicked
```

Icons are inline SVGs defined once in a sprite at the top of `index.html` and reused with `<use href="#icon-name">`.

## Adding a project

Copy an existing `<article class="card project-card">` block inside the `#projects` section, add an 800×800 screenshot to `assets/images/projects/`, and update the title, description, tags and link.

## Running locally

Open `index.html` in a browser, or serve the folder with any static server (for example the VS Code Live Server extension).

## Translations

English is written directly in `index.html`. Every translatable element has a key:

- `data-i18n="about.title"` translates the element's text
- `data-i18n-attr="aria-label:socials.github"` translates an attribute (`alt`, `aria-label`, `href`, ...)

To change or add a Portuguese string, edit the matching key in `js/i18n.js`. New elements need a key in the HTML and the Portuguese text under `pt` in `js/i18n.js`.

## Adding a demo video

Put the `.mp4` in `Video-Demos/` and add a button inside the project card:

```html
<button class="demo-btn" type="button" data-video="Video-Demos/My-Project.mp4" data-video-title="My Project">
    <svg class="icon" aria-hidden="true"><use href="#icon-play"/></svg>
    <span data-i18n="projects.demo">Watch demo</span>
</button>
```

Keep the path relative (no leading `/`): the site is served from `/Portfolio/` on GitHub Pages.
