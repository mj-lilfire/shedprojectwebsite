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
├── components/                      Canonical reusable HTML partials (announcement bar, navigation, footer)
├── css/
│   ├── variables.css                 Design tokens (colour, type, spacing, radius, shadow, breakpoints)
│   ├── base.css                      Reset and base element styles
│   ├── typography.css                Type scale
│   ├── layout.css                    Containers, grid/flex utilities, image placeholders
│   ├── animations.css                Scroll-reveal animation
│   └── components/                  announcement-bar.css, buttons.css, cards.css, navigation.css, footer.css, sections.css
├── js/
│   ├── main.js                       Entry point
│   └── modules/                     navigation.js, animations.js, announcementBar.js
├── pages/                          Secondary HTML pages
├── products/                        Product catalogue pages
│   ├── index.html                    Products landing page (catalogue hub)
│   ├── utility-sheds.html             Category landing page
│   ├── garden-rooms.html
│   ├── summer-houses.html
│   ├── garden-offices.html
│   ├── utility-sheds/                 6 generated individual product pages
│   ├── garden-rooms/                  6 generated individual product pages
│   ├── summer-houses/                 6 generated individual product pages
│   └── garden-offices/                6 generated individual product pages
├── scripts/                        Author-time tooling — see Product Catalogue below
│   ├── products-data.js              Centralised product data (the single source of truth)
│   ├── product-template.js           Renders one product page from a product + category
│   └── generate-products.js          Writes products/<category>/<slug>.html from the two files above
├── quote-builder/                   The quote builder tool
└── docs/                           Project documentation
    ├── MASTER_DEVELOPMENT_STANDARD.md
    └── ACCESS_AND_DEPLOYMENT.md      Clone, local dev, git workflow, GitHub Pages, troubleshooting
```

See the Master Development Standard, Section 4, for the full explanation of each folder's purpose.

## Design System

The homepage design system (colour palette, typography, spacing, radius, shadows, transitions, breakpoints) is defined once as CSS custom properties in `css/variables.css` and consumed throughout `css/` — see Master Development Standard, Section 7. Reusable components (announcement bar, navigation, footer, buttons, cards, hero/CTA sections) live under `css/components/`; the announcement bar, navigation, and footer markup is additionally kept as canonical source in `components/` for reuse on future pages.

### Announcement Bar

A slim, full-width bar above the main navigation that rotates through short promotional messages (e.g. "Free Local Delivery Within 30 Miles of Hereford"). It's a genuinely global component — the same markup (`components/announcement-bar.html`) belongs on every page, not just the homepage.

- **To change the messages:** edit the `ANNOUNCEMENT_MESSAGES` array at the top of `js/modules/announcementBar.js`. It's a plain list of strings — no HTML, no build step, no other file to touch. The comment above the array explains the format.
- **Behaviour:** fades between messages roughly every 5.5 seconds, pauses while hovered, and skips rotation entirely (showing only the first message) if the visitor's system has `prefers-reduced-motion` enabled.
- **Styling:** uses the existing `--color-primary` / `--color-text-inverse` tokens — no new design tokens were introduced for this component.

### Product Catalogue

`products/index.html` is the catalogue hub, linking out to four category pages (`utility-sheds.html`, `garden-rooms.html`, `summer-houses.html`, `garden-offices.html`) — all one folder deep, so every internal link and asset path in those files is prefixed `../` relative to the repository root. Each category page also links to its own **Product Ranges** section, listing that category's six individual products.

All four category pages share one structural template — breadcrumb, hero, visual-only filter bar, introduction, feature highlights, product ranges, gallery preview, compare table, testimonials, FAQs, related products (cross-category), CTA banner — with only the content, imagery, and copy differing per category.

**Individual product pages are generated, not hand-written.** All 24 pages under `products/<category>/<slug>.html` are rendered from `scripts/products-data.js` (the data) via `scripts/product-template.js` (the template), written by `scripts/generate-products.js`. This is deliberate: adding a 25th product is a new entry in the data file and one command, not a new HTML file to author and keep in sync by hand.

**To add or edit a product:**
1. Edit the relevant category's `products` array in `scripts/products-data.js` (copy an existing entry as a starting point).
2. Run `node scripts/generate-products.js` from the repository root (plain Node, no dependencies to install).
3. Commit the regenerated files under `products/<category>/`.

Never hand-edit a file under `products/<category>/*.html` — every one carries a header comment saying so, and direct edits are silently overwritten the next time the generator runs. To change the *layout* shared by every product page, edit `scripts/product-template.js` and regenerate; to change one product's *content*, edit its entry in `scripts/products-data.js` and regenerate.

This tooling runs only when a maintainer adds or edits a product — it has no bearing on how the site is served. The output is ordinary static HTML/CSS/JS; GitHub Pages and Live Server compatibility are unaffected. See the Master Development Standard, Section 5, for how this fits the project's "no build tooling" rule.

The filter bar and comparison table (`css/components/catalogue.css`, `css/components/product-page.css`) are intentionally non-interactive previews; wire up real controls there when that functionality is implemented.

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

**v0.6.0** — Complete Product Experience & Sales Journey. See [CHANGELOG.md](CHANGELOG.md) for the full release history.