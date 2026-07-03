# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Governing Standard

This repository is governed by **[docs/MASTER_DEVELOPMENT_STANDARD.md](docs/MASTER_DEVELOPMENT_STANDARD.md)**. Read it before making any change — it is the authoritative reference for architecture, workflow, coding standards, documentation requirements, governance, and release process. This file summarises the parts most relevant to day-to-day work; the Master Development Standard takes precedence if anything here is ambiguous or out of date.

For the practical, step-by-step version of cloning, running Live Server, the git release commands, and GitHub Pages — including the live site URL and troubleshooting — see **[docs/ACCESS_AND_DEPLOYMENT.md](docs/ACCESS_AND_DEPLOYMENT.md)**.

## Technology Stack

HTML5, CSS3, and vanilla JavaScript only. Do not introduce frameworks, CSS libraries, or build tooling (Bootstrap, Tailwind, React, Webpack, Vite, etc.) unless the user has explicitly approved an exception — see Master Development Standard, Section 5.

## Every Development Prompt Should Contain

Per Master Development Standard, Section 16, treat any development task as a scoped release with:

1. **Objective**
2. **Governance** — explicit constraints on what must not change
3. **Scope**
4. **Deliverables**
5. **Acceptance Criteria**
6. **Documentation Updates**
7. **Version Number**

If a request omits these and the work is non-trivial, ask for clarification on scope and governance before implementing, rather than guessing.

## Workflow

Follow the pipeline in Master Development Standard, Section 2:

```
GitHub → VS Code → Claude Code → Live Server → Browser Testing → Git Commit → Git Push → GitHub Pages
```

- Test changes with Live Server and in the browser before considering the work done.
- Avoid regressions: do not modify layout, pages, navigation, styling, or JavaScript functionality beyond what the current release's scope calls for.
- GitHub is the single source of truth; do not consider work complete until it is committed (and, when asked, pushed).

## Documentation Discipline

Every substantive change should update, as relevant:

- `README.md` — project overview and structure
- `CLAUDE.md` — this file, if working conventions change
- `CHANGELOG.md` — a new versioned entry (Version, Objective, Governance, Scope, Deliverables, Acceptance Criteria)
- `docs/MASTER_DEVELOPMENT_STANDARD.md` — if the change affects a defined standard
- `docs/ACCESS_AND_DEPLOYMENT.md` — if the change affects local dev setup, the git/release commands, or the GitHub Pages deployment process

Do not remove existing documentation; update it in place, and keep all documents consistent with one another.

## Coding Conventions

See Master Development Standard Sections 6–12 for design principles, CSS standards (variables, breakpoints, spacing scale), JavaScript standards (modular, minimal dependencies, logic separated from presentation), component reuse rules, accessibility (WCAG 2.1 AA), performance, and SEO requirements. Key points:

- Mobile-first, responsive CSS using shared variables/breakpoints — no hard-coded one-off values.
- Reusable components (nav, footer, buttons, cards, gallery, forms, hero, testimonials) are built once under `components/`/`css/`/`js/` and reused — never duplicated per page.
- Semantic HTML5 throughout; accessible by default.
- Watch for CSS grid/flex "blowout": an unbreakable string (e.g. an email address) in a grid item can force its track wider than its `fr` share and cause horizontal overflow. Grid items get `min-width: 0` (see `.grid > *` in `css/layout.css`) and long placeholder strings get `overflow-wrap: anywhere`.
- The site has no templating/build step, so `components/navigation.html` and `components/footer.html` are canonical *source* markup, not includes — copy them verbatim into any new page rather than re-authoring the nav/footer.
- Before calling a UI change done, browser-test it at mobile, tablet, and desktop widths and check for console errors and horizontal scroll — see the Implementation Checklist below.
- The live brand is **Hereford Patio & Sheds** (set in v0.3.2), a family-run premium outdoor living company. The logo is a temporary hand-authored inline SVG (shed outline, `stroke="currentColor"` so it inherits `.logo`'s colour in both header and footer) — expect it to be swapped for a professional mark later; don't invest further design effort in it beyond incremental fixes.
- Real photography is sourced from Unsplash's free tier (`images.unsplash.com`, never `plus.unsplash.com`, which is paid/licensed). Never guess or fabricate a photo URL — search for a real photo, then verify it with a `curl -I` (or equivalent) HTTP 200 check and a visual review before using it. All non-hero images use `loading="lazy" decoding="async"`; the hero/LCP image uses `loading="eager" fetchpriority="high"`. Every photograph also carries a `srcset`/`sizes` pair (widths matched to where it actually renders — full-width hero vs. a quarter-width grid card) rather than a single fixed-width source (v0.4.0).
- Two additional reusable section patterns exist beyond the original set: a *reversed* split section (`.split-content.reverse`, image right/text left at desktop) for a second image+copy section further down the page, and a numbered process-step card (`.card-feature` + `.step-number`) for step-by-step "how it works" content. Reuse both rather than inventing new layout patterns for similar content.
- Contact details (address, phone, opening hours) remain explicit placeholders even though the surrounding marketing copy is now real — don't invent specific real-looking business facts for these.
- The announcement bar (`components/announcement-bar.html`, `css/components/announcement-bar.css`, `js/modules/announcementBar.js`, v0.4.1) is a genuinely global, page-agnostic component — it belongs above the header on every page, not just the homepage. Its rotating messages live in the `ANNOUNCEMENT_MESSAGES` array at the top of `announcementBar.js`; edit that array (and only that array) to add, remove, or reorder messages — never hardcode a new message directly into the HTML fallback without also updating the array, or the two will drift out of sync.
- Auto-rotating content (like the announcement bar) should pause on hover, respect `prefers-reduced-motion` (skip the rotation, not just the transition), and deliberately avoid `aria-live` unless a message actually needs to interrupt the user — a live region that fires every few seconds is a worse screen-reader experience than a static one.
- `products/*.html` (v0.5.0) live one folder deep from the repository root: every relative path to `css/`, `js/`, `index.html`, or `index.html#anchor` needs a `../` prefix; links between category pages themselves (`utility-sheds.html` etc.) don't. When copying the nav/footer partials into a page under `products/` or `pages/`, re-check every href for this rather than pasting the root-relative version verbatim.
- The four category pages are one structural template with different content — copy the closest existing category page for a new one, don't rebuild the section order from scratch.
- The "Products" nav item is a dropdown (`.nav-item-dropdown`, `css/components/navigation.css`, `js/modules/navigation.js`): CSS `:hover`/`:focus-within` opens it for pointer/keyboard users with zero JS involved; the JS only adds click-to-toggle (for touch) and outside-click/Escape-to-close. Keep both mechanisms if this pattern is reused elsewhere — removing the JS half would break it for touch devices, removing the CSS half would break it for mouse users before JS finishes loading.
- Visual-only "coming soon" UI (like the filter bar, `.filter-pill`) should be built from non-interactive elements (`<span>`, not `<button>`/`<a>`/`disabled` inputs) so it can't be mistaken for a control that silently does nothing when clicked — pair it with a short visible caption saying it's not live yet.

## Versioning and Releases

Semantic versioning (`MAJOR.MINOR.PATCH`) per Master Development Standard, Section 3. Confirm the target version number with the user (or infer it from their prompt) before updating `CHANGELOG.md`.

## Implementation Checklist

Every delivery in this repository (and, per the user's stated preference, other Claude Code projects too) should close with this checklist, ticked off against what was actually done:

```
Implementation Checklist

□ Review existing code before making changes.
□ Reuse existing components wherever possible.
□ Avoid regressions.
□ Keep the code modular and maintainable.
□ Update documentation.
□ Update version references.
□ Verify Live Server compatibility.
□ Verify GitHub Pages compatibility.
□ Prepare a Git commit recommendation.
□ Prepare GitHub release notes.
□ Summarise all files modified at completion.
```
