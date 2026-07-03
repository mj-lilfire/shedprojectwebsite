# Shed Project Website — Master Development Standard

**Version:** 0.2.0
**Status:** Authoritative
**Applies to:** The entire Shed Project Website repository

This document is the governing standard for all development carried out in this repository. It defines the project's philosophy, workflow, architecture, coding standards, documentation requirements, governance model, and release process. Every future piece of work — whether performed by a human contributor or by Claude Code — shall be consistent with this standard.

Where any other document in this repository (README, CLAUDE.md, code comments, prior conventions) conflicts with this standard, this document takes precedence unless it is formally updated.

---

## 1. Project Purpose

The Shed Project Website exists to present the Shed Project's products and services with a premium, modern, trustworthy online presence, and — through the quote builder — to let customers configure and price a shed without needing to contact the business first.

The guiding philosophy:

- **Simplicity over complexity.** The site is built from first principles (HTML5, CSS3, vanilla JavaScript) rather than frameworks, so it stays easy to reason about, cheap to host, and simple to maintain long after any single contributor has moved on.
- **Documentation as a first-class deliverable.** Code and documentation change together. A feature is not "done" until the relevant docs reflect it.
- **Small, reviewable increments.** Every release has a stated objective, scope, and acceptance criteria. Work that has not been scoped this way should not be merged.
- **Longevity.** The site should be easy to migrate, re-host, or rebuild on top of in future without a ground-up rewrite.

## 2. Development Workflow

All development follows this pipeline:

```
GitHub
   ↓
VS Code
   ↓
Claude Code
   ↓
Live Server
   ↓
Browser Testing
   ↓
Git Commit
   ↓
Git Push
   ↓
GitHub Pages
```

- **GitHub** is the single source of truth for the codebase, issues, and history. No code is considered "real" until it is pushed to GitHub.
- **VS Code** is the primary editor.
- **Claude Code** is used to implement changes against a documented objective (see [Section 16, Governance](#16-governance)).
- **Live Server** (or an equivalent static file server) is used for local preview during development.
- **Browser Testing** is performed manually before every commit — visually and functionally, across at least one desktop and one mobile viewport.
- **Git Commit** captures a reviewed, working increment (see [Section 14, Git Workflow](#14-git-workflow)).
- **Git Push** publishes the change to GitHub.
- **GitHub Pages** automatically serves the latest `main` branch to the public.

No step in this pipeline should be skipped. In particular, changes must be browser-tested before being committed, and committed before being pushed.

## 3. Versioning Standard

The project uses [Semantic Versioning](https://semver.org/): `MAJOR.MINOR.PATCH`.

- **MAJOR** — incompatible structural changes (e.g. site architecture rewrite, breaking repository reorganisation).
- **MINOR** — new functionality or documentation additions that don't break existing structure (e.g. a new page, a new component, this standard itself).
- **PATCH** — backwards-compatible fixes (e.g. copy corrections, bug fixes, small styling fixes).

While the project remains pre-1.0.0, MINOR releases may include foundational changes as the site takes shape; PATCH releases remain reserved for fixes.

**Every release, regardless of size, shall be documented with:**

1. **Version** — the semantic version being released.
2. **Objective** — what the release is for, in one or two sentences.
3. **Governance** — explicit constraints on what the release must not do.
4. **Scope** — what is and is not included.
5. **Deliverables** — the concrete artefacts produced.
6. **Acceptance Criteria** — how completion is verified.

This structure is recorded in `CHANGELOG.md` for every release and should be used as the template for any development prompt given to Claude Code (see [Section 16](#16-governance)).

## 4. Repository Structure

```
shedprojectwebsite/
├── index.html            Site entry point / homepage
├── README.md             Project overview and quick start
├── CLAUDE.md              Instructions for Claude Code sessions
├── CHANGELOG.md           Versioned history of every release
├── .gitignore             Ignored files and folders
├── assets/                Static media
│   ├── fonts/              Web font files
│   ├── icons/               Icon assets (SVG/PNG)
│   └── images/               Photographs and graphics
├── components/             Reusable HTML/JS component partials (nav, footer, cards, etc.)
├── css/                    Stylesheets
├── js/                     Vanilla JavaScript modules
├── pages/                  Secondary HTML pages beyond the homepage
├── products/                Shed product catalogue content/pages
├── quote-builder/           The quote builder tool
└── docs/                   Project documentation
    └── MASTER_DEVELOPMENT_STANDARD.md   This document
```

Rules for repository structure:

- New static media always goes under `assets/`, in the appropriate subfolder.
- New reusable, cross-page UI pieces go under `components/`; page-specific one-off markup stays in the page itself.
- New standalone pages go under `pages/`; the homepage (`index.html`) stays at the repository root, since that is what GitHub Pages serves by default.
- Product content lives under `products/`; the quote builder is self-contained under `quote-builder/`.
- Documentation lives under `docs/`, except for the four root-level files (`README.md`, `CLAUDE.md`, `CHANGELOG.md`, and this standard's parent folder), which must remain discoverable at the repository root.
- No new top-level folders should be introduced without updating this document.

## 5. Technology Stack

**Primary technologies:**

- **HTML5** — semantic markup for all pages.
- **CSS3** — including custom properties (variables), Flexbox, and Grid.
- **Vanilla JavaScript (ES6+)** — no compiled/transpiled JS, no bundler required to run the site.

**Explicitly avoided unless separately approved:**

- CSS/JS frameworks (Bootstrap, Tailwind, React, Vue, etc.)
- Build tooling that changes how the site is served (Webpack, Vite, etc.)
- Server-side languages/runtimes (PHP, Node backend, etc.) — the site is static

Any exception must be proposed and approved explicitly, with the rationale and impact recorded in `CHANGELOG.md` and this document.

## 6. Design Principles

Every page and component shall be designed to be:

- **Premium in appearance** — considered typography, spacing, and imagery; no default/unstyled browser appearance.
- **Modern in layout** — current, clean layout conventions (Grid/Flexbox-based, generous whitespace).
- **Mobile-first** — styles are written for small screens first, then progressively enhanced for larger viewports via `min-width` media queries.
- **Responsive** — no fixed-width layouts; content reflows correctly across the breakpoints in [Section 7](#7-css-standards).
- **Accessible** — meets the requirements in [Section 10](#10-accessibility).
- **Performant** — meets the requirements in [Section 11](#11-performance).
- **Maintainable** — consistent naming, no duplicated components, styles and behaviour kept separate from content.

## 7. CSS Standards

- **CSS variables**: global design tokens (colour palette, spacing scale, typography scale, breakpoints) are defined once as custom properties, ideally in a single `css/variables.css` (or equivalent `:root` block), and consumed everywhere else. Values are not hard-coded ad hoc in component styles.
- **Typography**: a limited, defined type scale (e.g. a small set of heading sizes plus body text), with a primary typeface and a fallback stack declared as variables.
- **Colour palette**: a small, named set of colours (e.g. primary, secondary, accent, neutral tones, feedback colours) defined as variables. New colours are not introduced ad hoc in individual components.
- **Layout spacing**: a consistent spacing scale (e.g. a multiple of a base unit) used for margin/padding/gap, expressed as variables rather than arbitrary pixel values.
- **Responsive breakpoints**: a shared, documented set of breakpoints (e.g. small ≈ 480px, tablet ≈ 768px, desktop ≈ 1024px, wide ≈ 1440px), defined once and reused consistently across stylesheets. Mobile-first: base styles target the smallest viewport, with `min-width` queries layering on enhancements.
- **Shared components**: styling for reusable UI (buttons, cards, forms, etc.) lives in shared stylesheets scoped to that component, not duplicated per page.

## 8. JavaScript Standards

- **Modular JavaScript**: functionality is organised into small, focused modules (ES modules where practical) rather than a single monolithic script.
- **Reusable functions**: common behaviour (e.g. form validation, navigation toggling) is written once as a reusable function/module and imported where needed, not copy-pasted.
- **Minimal dependencies**: no third-party JavaScript libraries unless explicitly approved and documented in [Section 5](#5-technology-stack).
- **Separation of logic and presentation**: JavaScript manipulates behaviour and state; it does not hard-code styling or content that belongs in CSS/HTML. DOM structure for a feature belongs in HTML/components, not string-templated from JS unless the content is genuinely dynamic.

## 9. Component Standards

Reusable UI is built once and shared, not duplicated per page. Known/expected shared components include:

- Navigation
- Footer
- Buttons
- Cards
- Gallery
- Forms
- Hero
- Testimonials

Rules:

- **No duplicate components.** If two pages need the same piece of UI, it is extracted into `components/` and reused, not copy-pasted.
- Each component's markup, styling, and behaviour should be easy to locate as a set (e.g. co-located naming across `components/`, `css/`, and `js/`).
- A component's public behaviour (its expected markup/classes/hooks) should stay stable — changing it means updating every page that uses it.

## 10. Accessibility

- Semantic HTML5 elements are used for their intended purpose (`<nav>`, `<header>`, `<main>`, `<footer>`, `<button>`, etc.) rather than generic `<div>`/`<span>` with scripted behaviour.
- All images carry meaningful `alt` text (or empty `alt=""` for purely decorative images).
- Colour is never the sole means of conveying information; colour contrast meets **WCAG 2.1 AA** at minimum.
- All interactive elements are reachable and operable via keyboard, with visible focus states.
- Forms have associated `<label>` elements and clear error messaging.
- Heading levels are structured logically (single `<h1>` per page, no skipped levels).
- ARIA attributes are used only to supplement semantic HTML, not to replace it.

## 11. Performance

- Images are appropriately sized and compressed for their display context, using modern formats (e.g. WebP/AVIF) where practical.
- CSS and JavaScript are kept lean; unused code is removed rather than left in place "just in case."
- Render-blocking resources are minimised (e.g. deferring non-critical JavaScript).
- Fonts are loaded efficiently (subset where practical, with sensible fallbacks to avoid layout shift).
- Pages should aim for good Core Web Vitals scores (LCP, CLS, INP) on both mobile and desktop.

## 12. SEO

- **Metadata**: every page has an accurate `<title>` and meta description.
- **Semantic HTML**: content structure uses appropriate landmark and heading elements so it is legible to search engines and assistive technology alike.
- **Structured headings**: a single, logical heading hierarchy per page.
- **Open Graph support**: key pages carry Open Graph tags (title, description, image, type) for link previews on social platforms.
- **Sitemap**: the site maintains a `sitemap.xml` at the root, kept up to date as pages are added or removed.
- **robots.txt**: the site maintains a `robots.txt` at the root, reflecting current crawl policy.

## 13. Documentation Standard

Every implementation shall update, as relevant:

- **`README.md`** — project overview, structure, and quick start, kept accurate for a new contributor.
- **`CLAUDE.md`** — instructions for how Claude Code should operate in this repository.
- **`CHANGELOG.md`** — a versioned entry for the release, following the structure in [Section 3](#3-versioning-standard).
- **`docs/MASTER_DEVELOPMENT_STANDARD.md`** — updated if the release changes any standard defined here.

Documentation shall remain synchronised with the codebase: a change that isn't reflected in documentation is considered incomplete.

## 14. Git Workflow

- **`main`** — always deployable; this is the branch GitHub Pages serves. Direct commits should be limited to small, low-risk documentation or scaffold changes; substantive work should land via a reviewed branch merge.
- **`develop`** — integration branch for work in progress, merged into `main` when a release is ready to ship.
- **`feature/*`** — one branch per feature or fix (e.g. `feature/quote-builder-pricing`), branched from `develop`, merged back into `develop` via pull request.

**Release process:** feature branches merge into `develop`; when `develop` is stable and documentation is updated, `develop` merges into `main`, `main` is tagged with the semantic version, and GitHub Pages redeploys automatically.

**Commit standards:** commit messages are written in the imperative mood and prefixed by type, e.g.:

```
feat: add hero component to homepage
fix: correct quote builder pricing rounding
docs: update Master Development Standard section 7
chore: reorganise assets folder
```

Each commit should represent one coherent, working change. Avoid bundling unrelated changes into a single commit.

## 15. GitHub Pages Deployment

```
Development
   ↓
Testing
   ↓
Commit
   ↓
Push
   ↓
Automatic GitHub Pages Deployment
```

GitHub Pages is configured to deploy from the `main` branch. Because the site is static HTML/CSS/JS with no build step, a push to `main` is the deployment — there is no separate build/publish action required. Confirm the Pages source branch in the repository settings whenever the deployment branch strategy changes.

## 16. Governance

Every future Claude Code development prompt shall contain:

1. **Objective**
2. **Governance** (explicit constraints — what must *not* change)
3. **Scope**
4. **Deliverables**
5. **Acceptance Criteria**
6. **Documentation Updates**
7. **Version Number**

This ensures every change is bounded, reviewable, and traceable to a specific version. Prompts that omit these elements should be clarified before implementation begins.

**Avoid regressions.** Any change must preserve existing working functionality, layout, and content unless the release's stated objective and scope explicitly call for changing them.

## 17. Future Compatibility

The website shall remain:

- **Hosting agnostic** — no dependency on GitHub Pages–specific behaviour beyond static file serving; the site should run unmodified on any static host.
- **CMS agnostic** — content is plain HTML/data, not coupled to a specific content management system, so a CMS could be introduced later without a rewrite.
- **Standards compliant** — valid, semantic HTML5 and CSS3, with no reliance on non-standard or deprecated browser behaviour.

Future migration (to a different host, framework, or CMS) should be an additive process, not a rebuild — a direct consequence of following Sections 4–12 of this standard.

## 18. Development Philosophy

- **Readability over cleverness** — code should be easy for the next contributor (human or Claude Code) to understand at a glance.
- **Consistency over novelty** — follow existing patterns in this repository rather than introducing a new approach for the same problem.
- **Maintainability over shortcuts** — a slightly slower, well-structured solution beats a fast hack that creates future cleanup work.
- **Performance first** — performance is a design constraint from the outset, not an optimisation pass done later.
- **Documentation first** — the relevant documentation is updated as part of the change, not deferred.
- **Reusable components** — build shared components once; do not duplicate UI across pages.
- **Premium user experience** — every visible change should uphold the premium, modern feel described in [Section 6](#6-design-principles).

---

*This document is versioned alongside the project. Any change to the standards defined here must be accompanied by a corresponding entry in `CHANGELOG.md` and a version bump per [Section 3](#3-versioning-standard).*
