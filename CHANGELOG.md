# Changelog

All notable changes to this project are documented in this file. Every entry follows the release structure defined in [docs/MASTER_DEVELOPMENT_STANDARD.md](docs/MASTER_DEVELOPMENT_STANDARD.md), Section 3: Version, Objective, Governance, Scope, Deliverables, Acceptance Criteria.

This project adheres to [Semantic Versioning](https://semver.org/).

## [0.4.0] — 2026-07-03 — Access & Deployment Documentation

**Objective:** Document how to access, develop, test, and publish the Shed Project Website, so a new developer can clone, run, and deploy the site with no prior knowledge of the setup.

**Governance:** Documentation-only release. No website layout, pages, business content, UI components, navigation, styling, or JavaScript functionality were modified.

**Scope:** Add `docs/ACCESS_AND_DEPLOYMENT.md`; update `README.md` and `CLAUDE.md` to reference it.

**Deliverables:**
- `docs/ACCESS_AND_DEPLOYMENT.md` — local development setup, the live GitHub Pages URL, the standard development workflow, the git release command sequence (with an explanation of each command), GitHub Pages configuration, troubleshooting, and a placeholder section for future GitHub Actions automation.
- `README.md` — added a "Live Website" section and links to the new document.
- `CLAUDE.md` — added a reference to the new document and a documentation-discipline entry for it.

**Acceptance Criteria:**
- `docs/ACCESS_AND_DEPLOYMENT.md` exists and covers local development, live website access, git workflow, deployment process, troubleshooting, and future deployment automation.
- `README.md` and `CLAUDE.md` link to the new document.
- No website functionality or visual design was modified.
- Documentation is suitable for a new developer joining the project with no prior knowledge.

## [0.3.0] — 2026-07-03 — Website Foundation & Design System

**Objective:** Establish the complete visual and technical foundation for the Shed Project Website — global design system, reusable components, responsive layout, navigation, footer, and homepage framework — as the base for all future pages and features.

**Governance:** Website Foundation release only. No product catalogue, individual product pages, quote builder, contact form functionality, blog, gallery feature, finance, customer portal, AI assistant, search, or e-commerce were implemented. No real business content was added — all copy, imagery, pricing, and contact details are explicit placeholders.

**Scope:** Global CSS design tokens; reusable navigation and footer; homepage framework (hero, introduction, why choose us, featured products, gallery preview, testimonials, CTA banner, latest news); reusable button, card, and section components; subtle scroll/hover animations; responsive layout across mobile, tablet, and desktop; accessibility and performance foundations.

**Deliverables:**
- `css/variables.css` — design tokens: colour palette, typography scale, spacing, radius, shadows, transitions, containers.
- `css/base.css`, `css/typography.css`, `css/layout.css`, `css/animations.css` — reset, type scale, layout/grid utilities, scroll-reveal animation.
- `css/components/buttons.css`, `cards.css`, `navigation.css`, `footer.css`, `sections.css` — reusable component styles.
- `js/main.js`, `js/modules/navigation.js`, `js/modules/animations.js` — mobile nav toggle, sticky header state, keyboard support, IntersectionObserver scroll reveal.
- `components/navigation.html`, `components/footer.html` — canonical source markup for the reusable nav and footer (mirrored inline in `index.html`; copy verbatim into any future page).
- `index.html` — rebuilt as the homepage framework with placeholder content only.

**Acceptance Criteria:**
- Complete responsive layout with no horizontal scrolling at mobile, tablet, or desktop widths (verified at 375/390/480/768/800/1024/1440px).
- Design system, typography system, navigation, footer, homepage framework, and reusable components (buttons, cards, sections) are all in place.
- Mobile-first, accessible markup: semantic HTML5, visible focus states, keyboard-operable navigation (including Escape-to-close), correct heading hierarchy, and accessible placeholder imagery (`role="img"` + `aria-label`).
- No business content present — all copy, pricing, contact details, and social links are explicit placeholders.
- Verified in a headless browser across breakpoints with no console errors.

**Notes:** SEO deliverables named in the Master Development Standard, Section 12 (`sitemap.xml`, `robots.txt`) are intentionally deferred to a later, content-focused release — this page currently ships `<meta name="robots" content="noindex, nofollow">` since it contains placeholder content only.

## [0.2.0] — 2026-07-03 — Master Development Standard

**Objective:** Establish the governing development standard for the Shed Project Website — architecture, workflow, coding standards, documentation requirements, governance, and release process — as the authoritative reference for all future development.

**Governance:** Documentation and governance release only. No website layout, pages, business content, UI components, navigation, styling, or JavaScript functionality were modified.

**Scope:** Add `docs/MASTER_DEVELOPMENT_STANDARD.md`; update `README.md`, `CLAUDE.md`, and `CHANGELOG.md` to reference it.

**Deliverables:**
- `docs/MASTER_DEVELOPMENT_STANDARD.md` — the full governing standard (18 sections).
- `README.md` — populated with project overview, structure, and links to governing documents.
- `CLAUDE.md` — populated with Claude Code working conventions referencing the Master Development Standard.
- `CHANGELOG.md` — this file, established with the versioned release structure.

**Acceptance Criteria:**
- `docs/MASTER_DEVELOPMENT_STANDARD.md` exists and covers all required sections.
- `README.md`, `CLAUDE.md`, and `CHANGELOG.md` are populated and cross-reference one another and the Master Development Standard.
- No website functionality or visual design was modified.

## [0.1.0] — 2026-07-03 — Initial Project Scaffold

**Objective:** Establish the initial repository scaffold for the Shed Project Website.

**Governance:** Scaffold only; no functional or design work.

**Scope:** Create the base repository structure and empty root documentation files.

**Deliverables:** `.gitignore`, `README.md`, `CLAUDE.md`, `CHANGELOG.md`, and the initial folder structure (`assets/`, `components/`, `css/`, `docs/`, `js/`, `pages/`, `products/`, `quote-builder/`).

**Acceptance Criteria:** Repository initialised on GitHub with the agreed folder structure in place.
