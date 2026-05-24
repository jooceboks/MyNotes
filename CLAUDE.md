# PersonalSite — Sarah Liu Portfolio

Static HTML personal site styled as a stack of index cards on a desk. Monospace typewriter aesthetic using Courier Prime.

## Stack
- **Pure HTML/CSS/JS** — no build tools, no framework
- Must be served over HTTP (not `file://`) because `app.js` uses `fetch()` to load tab partials
- Local dev: `python3 -m http.server 8080`

## File Structure
```
index.html              # Shell: header, tabs, panel containers, footer
components/
  home.html             # Welcome + "Currently" list
  about.html            # Bio, meta table (school/GPA/athletics), work philosophy
  coding.html           # 4 project cards: FoodWaster, Oat, Project Iso, ImCookin
  design.html           # Design creds (2x2 grid), principles checklist
  leadership.html       # D1 captaincy, TA/coaching, cross-functional coordination
  skills.html           # 2-column grid: SWE skills vs. Creative/Brand skills
styles/
  global.css            # CSS vars, reset, desk/cardstock/tape visuals, responsive breakpoints
  components.css        # All component styles (stamp, tabs, panels, projects, skills, footer, responsive overrides)
  animations.css        # Panel peel/settle transitions, cursor blink, prefers-reduced-motion
scripts/
  app.js                # Tab routing, fetch-based partial loading, localStorage persistence, keyboard nav
```

## Design System
- CSS variables in `:root` — `--paper`, `--ink`, `--red` (#B22222), `--desk`, `--rule`
- Font: Courier Prime (Google Fonts), monospace fallback
- Accent: red ink (`--red`) for highlights, comments, callouts
- Decorative: tape element, stacked card pseudo-elements, ruled-line background

## Key Patterns
- **Tab content** is loaded via `fetch()` from `components/*.html` — panels are empty `<section>` elements with `data-src` attributes
- **Tab state** persisted to `localStorage` key `sjl-tab` and synced with URL hash
- **Panel transitions**: "peel off" animation (620ms) + "settle" (380ms), with `prefers-reduced-motion` support
- **Tab numbers** (`01`, `02`, etc.) hidden on mobile via `.tab .n{display:none}`

## Responsive Breakpoints
- **> 680px (desktop):** Full card with stacked-paper pseudo-elements, 6 tabs in one row, 2-column grids
- **<= 680px (mobile):** Tabs become 3-column x 2-row grid, grids (skills, design-cred, meta) collapse to 1 column, reduced padding/font sizes, decorative card layers hidden
- **<= 380px (tiny):** Further padding and font reduction

## CSS Architecture Note
- `global.css` loads first — has base styles and some responsive rules
- `components.css` loads second — has component styles AND responsive overrides for `.tabs`, `.skills`, `.design-cred`, `.meta` (these MUST live in components.css to win the cascade)

## Footer Links
- Resume PDF: `uploads/ResumeEdit.pdf` (directory does not currently exist)
- GitHub: jooceboks
- LinkedIn: sarah-liu0
- Email: mailto placeholder

## Git
- Remote: `https://github.com/jooceboks/MyNotes.git` (branch: main)
