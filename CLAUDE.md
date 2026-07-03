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
- Real photography is sourced from Unsplash's free tier (`images.unsplash.com`, never `plus.unsplash.com`, which is paid/licensed). Never guess or fabricate a photo URL — search for a real photo, then verify it with a `curl -I` (or equivalent) HTTP 200 check and a visual review before using it. All non-hero images use `loading="lazy" decoding="async"`; the hero/LCP image uses `loading="eager" fetchpriority="high"`.
- Contact details (address, phone, opening hours) remain explicit placeholders even though the surrounding marketing copy is now real — don't invent specific real-looking business facts for these.

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
