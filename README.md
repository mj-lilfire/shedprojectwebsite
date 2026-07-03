# Shed Project Website

The official website for the Shed Project, including a customer-facing quote builder.

## Governing Standard

All development in this repository is governed by **[docs/MASTER_DEVELOPMENT_STANDARD.md](docs/MASTER_DEVELOPMENT_STANDARD.md)**. It defines the project's architecture, workflow, coding standards, documentation requirements, governance model, and release process. Read it before making changes.

For instructions specific to working with Claude Code in this repository, see [CLAUDE.md](CLAUDE.md). For the version history, see [CHANGELOG.md](CHANGELOG.md).

## Technology Stack

- HTML5
- CSS3
- Vanilla JavaScript

No frameworks or build tooling are used unless explicitly approved (see the Master Development Standard, Section 5).

## Repository Structure

```
shedprojectwebsite/
├── index.html            Site entry point / homepage
├── README.md             This file
├── CLAUDE.md              Instructions for Claude Code sessions
├── CHANGELOG.md           Versioned history of every release
├── assets/                Static media (fonts, icons, images)
├── components/             Reusable HTML/JS component partials
├── css/                    Stylesheets
├── js/                     Vanilla JavaScript modules
├── pages/                  Secondary HTML pages
├── products/                Shed product catalogue content
├── quote-builder/           The quote builder tool
└── docs/                   Project documentation
    └── MASTER_DEVELOPMENT_STANDARD.md
```

See the Master Development Standard, Section 4, for the full explanation of each folder's purpose.

## Local Development

1. Clone the repository.
2. Open the folder in VS Code.
3. Serve `index.html` with Live Server (or an equivalent static file server).
4. Test changes in the browser before committing.

This project has no build step — it is served as static files.

## Contributing

Every change should be scoped as a release with an **Objective, Governance, Scope, Deliverables, Acceptance Criteria, Documentation Updates,** and **Version Number**, per the Master Development Standard, Section 16. Documentation (`README.md`, `CLAUDE.md`, `CHANGELOG.md`, and the Master Development Standard where relevant) must be updated alongside any code change.

## Current Version

**v0.2.0** — Master Development Standard. See [CHANGELOG.md](CHANGELOG.md) for full release history.
