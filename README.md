# Sarah Liu Portfolio Refactor

## Structure

- `index.html` is the entry page and contains only the shell, tabs, and panel containers.
- `styles/global.css` holds the reset, typography, desk surface, cardstock stack, and shared layout primitives.
- `styles/animations.css` isolates the peel, settle, and cursor animation logic.
- `styles/components.css` contains the tab styles, card layouts, project card styling, and red-ink treatments.
- `components/home.html`, `components/about.html`, `components/coding.html`, `components/design.html`, `components/leadership.html`, and `components/skills.html` hold the six core views as partials.
- `scripts/app.js` loads the partials, handles tab state, persists the active tab, and keeps arrow-key navigation working.

## Notes

- The site is designed to be served over a static HTTP server so the component partials can be loaded reliably.
- Project cards now use local fragment anchors such as `#project-foodwaster` instead of placeholder `#` links.
- The email footer uses a `mailto:` link you can replace in one place if needed.