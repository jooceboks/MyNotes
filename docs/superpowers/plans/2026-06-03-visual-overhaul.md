# Portfolio Visual Overhaul — Senior Designer Review

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Elevate the portfolio from "well-written README" to a visually compelling, recruiter-stopping personal site while preserving the index card / typewriter identity.

**Architecture:** Pure HTML/CSS/JS — no framework change. All changes are CSS additions, HTML restructuring within existing components, and a few new image assets. The tab-based routing and fetch-partial architecture stays untouched.

**Tech Stack:** HTML, CSS (custom properties), vanilla JS, Google Fonts

---

## Designer's Brief

The concept is strong. The index card metaphor, Courier Prime type, tape element, red ink accents — that's a real identity. Most student sites are Vercel templates with Inter and a gradient. This isn't. The problem isn't the concept, it's that the execution is 90% text with no visual rhythm. Every tab looks the same: heading, paragraph, repeat. A recruiter spends 6-8 seconds on a portfolio. Right now nothing stops their scroll.

Here's what I'd change, organized by impact:

---

## Task 1: Hero/Header — Add a photo and tighten the intro

**Why:** The first thing a recruiter sees is a wall of monospace text. No face, no warmth. Adding a small photo humanizes you immediately and breaks the text monotony.

**Files:**
- Modify: `index.html:16-26` (header area inside `.note`)
- Modify: `styles/components.css` (add `.hero` styles)
- Create: `assets/headshot.jpg` (USER must provide — ~400x400, casual/professional)

**What changes:**
- Add a circular headshot (tape-on-desk aesthetic — slightly rotated, optional paper border) next to the title
- Layout becomes a flex row: photo left, text right
- On mobile, photo stacks above text and shrinks

- [ ] **Step 1:** User provides headshot image, save as `assets/headshot.jpg`

- [ ] **Step 2:** Update `index.html` header to include photo

```html
<header class="hero">
  <div class="hero-photo">
    <img src="assets/headshot.jpg" alt="Sarah Liu" />
  </div>
  <div class="hero-text">
    <h1 class="title">Hey there<span class="ink-red">_</span> — It's&nbsp;Sarah Liu :D</h1>
    <p class="subline">Developer <span class="sep">|</span> Designer <span class="sep">|</span> Athlete <span class="sep">|</span> And More! <span class="cursor" aria-hidden="true"></span></p>
    <p class="header-comment">/* It's nice to meet you! */</p>
  </div>
</header>
```

- [ ] **Step 3:** Add CSS for `.hero` layout

```css
.hero {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 16px;
}

.hero-photo {
  flex-shrink: 0;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid var(--rule);
  transform: rotate(2deg);
  box-shadow: 2px 3px 0 rgba(0,0,0,.08);
}

.hero-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-text {
  flex: 1;
  min-width: 0;
}
```

- [ ] **Step 4:** Add mobile override

```css
@media (max-width: 680px) {
  .hero { flex-direction: column; gap: 12px; text-align: center; }
  .hero-photo { width: 80px; height: 80px; }
}
```

- [ ] **Step 5:** Verify in browser at desktop and mobile widths

---

## Task 2: Project Cards — Add screenshot thumbnails

**Why:** The Coding tab is 5 identical text blocks stacked vertically. A recruiter won't read all 5. Thumbnails let them visually scan and pick what interests them. This is the single highest-impact change.

**Files:**
- Modify: `components/coding.html` (add `<img>` to each project)
- Modify: `styles/components.css` (`.proj` layout changes)
- Create: `assets/proj-oat.png` (screenshot of OatPlanner — USER provides or we capture)
- Create: `assets/proj-iso.png` (screenshot or poster crop)
- Create: `assets/proj-foodwaster.png` (screenshot of foodwaster.app)
- Create: `assets/proj-fuwten26.png` (screenshot of the 3D scene)
- Create: `assets/proj-imcookin.png` (mockup or app screenshot)

**What changes:**
- Each `.proj` becomes a horizontal card: thumbnail left (200px wide), text right
- On mobile, thumbnail stacks on top at full width
- If no screenshot exists for a project, show a styled placeholder with the project initials

- [ ] **Step 1:** Capture/obtain screenshots for each project (minimum: OatPlanner, FUWTEN26, FoodWaster since they're live)

- [ ] **Step 2:** Update `.proj` CSS for horizontal thumbnail layout

```css
.proj {
  border: 1px solid var(--rule);
  padding: 0;
  background: rgba(255,255,255,.3);
  display: flex;
  overflow: hidden;
}

.proj-thumb {
  flex-shrink: 0;
  width: 200px;
  background: var(--paper-shade);
  border-right: 1px solid var(--rule);
  overflow: hidden;
}

.proj-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.proj-body {
  padding: 12px 14px;
  flex: 1;
  min-width: 0;
}
```

- [ ] **Step 3:** Update each project card HTML to wrap content in `.proj-body` and add `.proj-thumb`

```html
<div class="proj" id="project-oat">
  <div class="proj-thumb">
    <img src="assets/proj-oat.png" alt="OatPlanner screenshot" loading="lazy" />
  </div>
  <div class="proj-body">
    <div class="hd">
      <span class="name">OatPlanner — Productivity & Planning WebApp</span>
      <span class="tag">role: sole engineer · full-stack</span>
    </div>
    <p>...</p>
    <div class="stack-tags">...</div>
    <a class="proj-link" href="...">↳ View OatPlanner</a>
  </div>
</div>
```

- [ ] **Step 4:** Add mobile override to stack thumbnail on top

```css
@media (max-width: 680px) {
  .proj { flex-direction: column; }
  .proj-thumb { width: 100%; height: 160px; border-right: none; border-bottom: 1px solid var(--rule); }
}
```

- [ ] **Step 5:** Verify all 5 cards render correctly at desktop and mobile widths

---

## Task 3: Creatives Tab — Inline image previews instead of bare links

**Why:** You say you're a designer but the Creatives tab has zero visuals. "View Edits" as a text link is asking the recruiter to do homework. Show the work inline.

**Files:**
- Modify: `components/creatives.html`
- Modify: `styles/components.css`
- Create: `assets/creative-photoshop.jpg` (best 1-2 Photoshop pieces as a collage/grid preview)
- Create: `assets/creative-illustrator.jpg` (best 1-2 Illustrator pieces)
- Existing: `case-studies/oat-assets/` (already have OatPlanner screenshots)

**What changes:**
- Case study card gets an inline preview image (reuse existing oat-assets screenshots)
- Portfolio cards (Photoshop, Illustrator) get a thumbnail preview strip
- The "Coming Soon" card stays as-is but gets a subtle dashed border treatment to signal WIP

- [ ] **Step 1:** Add a preview image to the OatPlanner case study card

```html
<div class="case-card">
  <div class="case-preview">
    <img src="case-studies/oat-assets/week-view.png" alt="OatPlanner week view" loading="lazy" />
  </div>
  <div class="case-body">
    <span class="case-tag">Case Study</span>
    <span class="case-title">Oat Planner</span>
    <p class="case-desc">...</p>
    <div class="case-tags">...</div>
    <a class="portfolio-cta" href="case-studies/oatplanner.html">↳ View Case Study</a>
  </div>
</div>
```

- [ ] **Step 2:** Add CSS for `.case-preview`

```css
.case-preview {
  width: 100%;
  aspect-ratio: 16/9;
  overflow: hidden;
  border-bottom: 1px solid var(--rule);
  background: var(--paper-shade);
}

.case-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.case-body {
  padding: 14px 16px;
}
```

- [ ] **Step 3:** Update case-card to remove internal padding (now handled by `.case-body`)

```css
.case-card {
  border: 1px solid var(--rule);
  border-radius: 6px;
  padding: 0;
  background: rgba(255,255,255,.3);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
```

- [ ] **Step 4:** Add thumbnail previews to the Photoshop and Illustrator portfolio cards — same pattern (`.portfolio-preview` div with `<img>`)

- [ ] **Step 5:** Style the "Coming Soon" card with a dashed border

```css
.case-card.wip {
  border-style: dashed;
  opacity: 0.7;
}
```

- [ ] **Step 6:** Make case-studies grid full-width (1 column) since cards now have images and need breathing room

```css
.case-studies {
  grid-template-columns: 1fr;
  gap: 16px;
}
```

- [ ] **Step 7:** Verify in browser

---

## Task 4: Color and Visual Rhythm — Add a second accent + section dividers

**Why:** Right now it's beige and black with red that only appears in tiny details. The page has no visual "moments" that break up the scroll. Adding a warm secondary accent and subtle section separators creates rhythm.

**Files:**
- Modify: `styles/global.css` (add new CSS variable)
- Modify: `styles/components.css` (section dividers, stat-tag colors)

**What changes:**
- Add `--accent-warm: #C4883A` (warm amber/gold) as a secondary accent for tags, highlights, and stat badges
- Add subtle horizontal dividers between major sections within long tabs (About, Creatives)
- Give `.stat-tag` badges a filled background instead of just a border
- Add a subtle left-border accent to the `.proj` cards on hover

- [ ] **Step 1:** Add the new variable to `:root` in `global.css`

```css
--accent-warm: #C4883A;
```

- [ ] **Step 2:** Update `.stat-tag` to use a filled style

```css
.stat-tag {
  display: inline-block;
  margin-top: 8px;
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: .06em;
  text-transform: uppercase;
  color: var(--paper);
  background: var(--red);
  border: 1px solid var(--red);
  padding: 2px 7px;
}
```

- [ ] **Step 3:** Add hover accent to project cards

```css
.proj {
  transition: border-left-color 120ms ease;
  border-left: 3px solid transparent;
}

.proj:hover {
  border-left-color: var(--red);
}
```

- [ ] **Step 4:** Add a section divider utility class

```css
.section-break {
  border: none;
  border-top: 1px dashed var(--ink-soft);
  margin: 24px 0;
  opacity: 0.4;
}
```

- [ ] **Step 5:** Add `<hr class="section-break">` between major sections in About and Creatives tabs

- [ ] **Step 6:** Verify the visual rhythm improvement in browser

---

## Task 5: Skills Tab — Visual upgrade from grocery list to grouped chips

**Why:** Listing "Python, Java, JavaScript..." in a paragraph is the weakest way to present skills. Chips/tags with visual grouping make it scannable and look more polished.

**Files:**
- Modify: `components/skills.html`
- Modify: `styles/components.css`

**What changes:**
- Replace paragraph lists with flex-wrapped chip/tag elements (reuse the `.stack-tags` pattern from project cards)
- Add a small colored dot or icon before each category heading
- Keep the 2-column SWE / UI/UX split

- [ ] **Step 1:** Update skills HTML to use chip markup

```html
<div class="col">
  <p class="col-title"><span class="red">//</span> Software Engineering</p>

  <h3>Languages</h3>
  <div class="skill-chips">
    <span>Python</span><span>Java</span><span>JavaScript</span><span>TypeScript</span>
    <span>Swift</span><span>SQL</span><span>C</span><span>C++</span><span>HTML/CSS</span>
  </div>

  <h3>Frameworks & DB</h3>
  <div class="skill-chips">
    <span>React</span><span>Next.js 14</span><span>Node</span><span>Express</span>
    <span>MongoDB</span><span>PostgreSQL</span><span>Supabase</span><span>SwiftUI</span><span>Tailwind</span>
  </div>

  <!-- repeat for Infrastructure, AI-assisted dev -->
</div>
```

- [ ] **Step 2:** Add `.skill-chips` CSS

```css
.skill-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin: 0 0 12px;
}

.skill-chips span {
  display: inline-block;
  padding: 3px 8px;
  border: 1px solid var(--rule);
  background: var(--paper);
  font-size: 11.5px;
  font-weight: 700;
  color: var(--ink);
  letter-spacing: .02em;
}
```

- [ ] **Step 3:** Keep certifications as linked list items (they need URLs), but style them cleaner

- [ ] **Step 4:** Verify at desktop and mobile

---

## Task 6: Home Tab — Make it less empty

**Why:** The Home tab is the landing view and it's sparse. Three bullet points and a "flip to next card" link. This is your elevator pitch and it needs to earn the next click.

**Files:**
- Modify: `components/home.html`
- Modify: `styles/components.css`

**What changes:**
- Add a "quick stats" row below the Currently section: 3 small stat boxes in a row (e.g., "5 shipped projects", "D1 Athlete", "3.80 GPA") that act as visual anchors
- These link to the relevant tabs

- [ ] **Step 1:** Add quick-stats markup after the Currently list

```html
<div class="quick-stats">
  <a href="#coding" class="quick-stat">
    <span class="qs-number">5</span>
    <span class="qs-label">Shipped Projects</span>
  </a>
  <a href="#impact" class="quick-stat">
    <span class="qs-number">D1</span>
    <span class="qs-label">NCAA Athlete</span>
  </a>
  <a href="#about" class="quick-stat">
    <span class="qs-number">3.80</span>
    <span class="qs-label">GPA · Summa</span>
  </a>
</div>
```

- [ ] **Step 2:** Add CSS

```css
.quick-stats {
  display: flex;
  gap: 10px;
  margin: 18px 0 14px;
}

.quick-stat {
  flex: 1;
  text-align: center;
  padding: 14px 10px;
  border: 1px solid var(--rule);
  background: rgba(0,0,0,.03);
  text-decoration: none;
  color: inherit;
  transition: border-color 120ms;
}

.quick-stat:hover {
  border-color: var(--red);
}

.qs-number {
  display: block;
  font-size: 22px;
  font-weight: 700;
  color: var(--red);
  letter-spacing: .02em;
  line-height: 1.1;
}

.qs-label {
  display: block;
  font-size: 10.5px;
  text-transform: uppercase;
  letter-spacing: .08em;
  color: var(--ink-soft);
  font-weight: 700;
  margin-top: 4px;
}
```

- [ ] **Step 3:** Mobile: stack to 1 row of 3 but smaller, or collapse to a single column

```css
@media (max-width: 680px) {
  .quick-stats { gap: 6px; }
  .qs-number { font-size: 18px; }
  .qs-label { font-size: 9px; }
  .quick-stat { padding: 10px 6px; }
}
```

- [ ] **Step 4:** Verify the links navigate to correct tabs

---

## Task 7: Micro-interactions — Hover states and subtle polish

**Why:** Right now almost nothing responds to interaction. Hover states signal clickability and add life. Small things, big difference.

**Files:**
- Modify: `styles/components.css`

**What changes:**
- Tab hover: subtle underline slide or background shift (already has background change, but add a bottom-border accent)
- Project cards: slight lift on hover (translateY + shadow)
- Stat cards: same lift treatment
- Footer links: red color shift on hover (already exists, just verify)

- [ ] **Step 1:** Add hover lift to project and stat cards

```css
.proj {
  transition: transform 120ms ease, box-shadow 120ms ease, border-left-color 120ms ease;
}

.proj:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,.08);
  border-left-color: var(--red);
}

.stat-card {
  transition: transform 120ms ease, box-shadow 120ms ease;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,.08);
}
```

- [ ] **Step 2:** Add active tab bottom accent

```css
.tab[aria-selected="true"] {
  background: var(--ink);
  color: var(--paper);
  border-bottom: 2px solid var(--red);
}
```

- [ ] **Step 3:** Verify interactions feel snappy and don't conflict with the peel animation

---

## Priority Order

If you want to do these in phases:

1. **Task 2** (project thumbnails) — highest visual impact
2. **Task 1** (headshot) — humanizes the site immediately
3. **Task 5** (skills chips) — easiest win, pure CSS/HTML
4. **Task 6** (home quick-stats) — makes the landing sticky
5. **Task 4** (color rhythm) — ties everything together
6. **Task 3** (creatives previews) — depends on having image assets
7. **Task 7** (micro-interactions) — polish layer, do last

## What This Plan Does NOT Change

- The index card metaphor, Courier Prime font, tape element, stacked paper effect
- The tab-based navigation and fetch-partial architecture
- The BOLDER framework section or About page content
- The footer structure (it's fine, just small)
- Any JavaScript logic

## What You'll Need to Provide

- **Headshot photo** (Task 1) — casual but professional, square crop preferred
- **Project screenshots** (Task 2) — at minimum: OatPlanner, FUWTEN26, FoodWaster (these are live, I can capture them)
- **Creative work samples** (Task 3) — 1-2 best Photoshop edits, 1-2 best Illustrator pieces as JPGs
