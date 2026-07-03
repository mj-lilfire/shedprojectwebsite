# Shed Project Website

The official website for **Hereford Patio & Sheds** — a premium outdoor living company building utility sheds, garden rooms, summer houses, and garden offices. (The repository name and internal docs still refer to the "Shed Project Website"; the live brand is Hereford Patio & Sheds.) The site also includes a customer-facing quote builder, planned for a future release.

## Governing Standard

All development in this repository is governed by **[docs/MASTER_DEVELOPMENT_STANDARD.md](docs/MASTER_DEVELOPMENT_STANDARD.md)**. It defines the project's architecture, workflow, coding standards, documentation requirements, governance model, and release process. Read it before making changes.

For instructions specific to working with Claude Code in this repository, see [CLAUDE.md](CLAUDE.md). For the version history, see [CHANGELOG.md](CHANGELOG.md). For how to clone, run, and deploy the site, see [docs/ACCESS_AND_DEPLOYMENT.md](docs/ACCESS_AND_DEPLOYMENT.md).

## Technology Stack

- HTML5
- CSS3
- Vanilla JavaScript

No frameworks or build tooling are used unless explicitly approved (see the Master Development Standard, Section 5).

## Repository Structure

```
shedprojectwebsite/
├── index.html                     Homepage (design system + layout framework)
├── README.md                      This file
├── CLAUDE.md                       Instructions for Claude Code sessions
├── CHANGELOG.md                    Versioned history of every release
├── assets/                         Static media (fonts, icons, images)
├── components/                      Canonical reusable HTML partials (navigation, footer)
├── css/
│   ├── variables.css                 Design tokens (colour, type, spacing, radius, shadow, breakpoints)
│   ├── base.css                      Reset and base element styles
│   ├── typography.css                Type scale
│   ├── layout.css                    Containers, grid/flex utilities, image placeholders
│   ├── animations.css                Scroll-reveal animation
│   └── components/                  buttons.css, cards.css, navigation.css, footer.css, sections.css
├── js/
│   ├── main.js                       Entry point
│   └── modules/                     navigation.js, animations.js
├── pages/                          Secondary HTML pages
├── products/                        Shed product catalogue content
├── quote-builder/                   The quote builder tool
└── docs/                           Project documentation
    ├── MASTER_DEVELOPMENT_STANDARD.md
    └── ACCESS_AND_DEPLOYMENT.md      Clone, local dev, git workflow, GitHub Pages, troubleshooting
```

See the Master Development Standard, Section 4, for the full explanation of each folder's purpose.

## Design System

The homepage design system (colour palette, typography, spacing, radius, shadows, transitions, breakpoints) is defined once as CSS custom properties in `css/variables.css` and consumed throughout `css/` — see Master Development Standard, Section 7. Reusable components (navigation, footer, buttons, cards, hero/CTA sections) live under `css/components/`; the navigation and footer markup is additionally kept as canonical source in `components/` for reuse on future pages.

## Local Development

1. Clone the repository.
2. Open the folder in VS Code.
3. Serve `index.html` with Live Server (or an equivalent static file server).
4. Test changes in the browser before committing.

This project has no build step — it is served as static files. For full step-by-step instructions (cloning, Live Server, the live GitHub Pages URL, the git release workflow, and troubleshooting), see [docs/ACCESS_AND_DEPLOYMENT.md](docs/ACCESS_AND_DEPLOYMENT.md).

## Live Website

The live site is published via GitHub Pages at **[mj-lilfire.github.io/shedprojectwebsite](https://mj-lilfire.github.io/shedprojectwebsite/)**, updated automatically on every push to `main`.

## Contributing

Every change should be scoped as a release with an **Objective, Governance, Scope, Deliverables, Acceptance Criteria, Documentation Updates,** and **Version Number**, per the Master Development Standard, Section 16. Documentation (`README.md`, `CLAUDE.md`, `CHANGELOG.md`, and the Master Development Standard where relevant) must be updated alongside any code change.

## Current Version

**v0.3.2** — Homepage Visual Identity, Branding & Content Refresh. See [CHANGELOG.md](CHANGELOG.md) for the full release history, including a note on this release's out-of-sequence version number.

1