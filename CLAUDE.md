# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Governing Standard

This repository is governed by **[docs/MASTER_DEVELOPMENT_STANDARD.md](docs/MASTER_DEVELOPMENT_STANDARD.md)**. Read it before making any change — it is the authoritative reference for architecture, workflow, coding standards, documentation requirements, governance, and release process. This file summarises the parts most relevant to day-to-day work; the Master Development Standard takes precedence if anything here is ambiguous or out of date.

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

Do not remove existing documentation; update it in place, and keep all documents consistent with one another.

## Coding Conventions

See Master Development Standard Sections 6–12 for design principles, CSS standards (variables, breakpoints, spacing scale), JavaScript standards (modular, minimal dependencies, logic separated from presentation), component reuse rules, accessibility (WCAG 2.1 AA), performance, and SEO requirements. Key points:

- Mobile-first, responsive CSS using shared variables/breakpoints — no hard-coded one-off values.
- Reusable components (nav, footer, buttons, cards, gallery, forms, hero, testimonials) are built once under `components/`/`css/`/`js/` and reused — never duplicated per page.
- Semantic HTML5 throughout; accessible by default.

## Versioning and Releases

Semantic versioning (`MAJOR.MINOR.PATCH`) per Master Development Standard, Section 3. Confirm the target version number with the user (or infer it from their prompt) before updating `CHANGELOG.md`.
