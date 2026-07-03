# Changelog

All notable changes to this project are documented in this file. Every entry follows the release structure defined in [docs/MASTER_DEVELOPMENT_STANDARD.md](docs/MASTER_DEVELOPMENT_STANDARD.md), Section 3: Version, Objective, Governance, Scope, Deliverables, Acceptance Criteria.

This project adheres to [Semantic Versioning](https://semver.org/).

## [0.6.0] — 2026-07-03 — Complete Product Experience & Sales Journey

**Objective:** Complete the customer browsing journey from homepage through to individual products — a full demonstration catalogue of 24 products across the four existing categories, each with its own premium page, generated from a single reusable template and centralised data structure rather than hand-coded.

**Governance:** Product experience release only. No ecommerce, shopping basket, checkout, customer accounts, Quote Builder backend, contact form backend, finance functionality, blog, or AI assistant were introduced. Every "Request a Quote" / "Enquire Now" / "Contact Us" CTA continues to point to the existing footer contact placeholder (`#contact`); the product filter bar and comparison table remain visual-only. All 24 products are explicitly demonstration content showcasing the site's architecture, not a real catalogue.

**Scope:** A centralised, data-driven architecture for individual product pages (`scripts/products-data.js` + `scripts/product-template.js` + `scripts/generate-products.js`); 24 generated product pages (6 per category); enhancements to all 4 category landing pages (breadcrumb, Product Ranges, Compare, Testimonials, FAQ); a new reusable product-gallery component with a working thumbnail-swap and a lightbox-*placeholder* zoom affordance; new CSS components for specification tables, size/option/colour cards, and FAQ disclosures.

**Deliverables:**
- `scripts/products-data.js` — the single source of truth for every product: name, tagline, overview, sizes, roof/door/window/extras options, colours, and category-level FAQs/construction copy/feature-icon set. Adding a 25th product means adding one data entry, not writing HTML.
- `scripts/product-template.js` — the one template that renders every individual product page (hero, gallery, overview, lifestyle introduction, key features, construction details, available sizes, roof/door/window options, optional extras, available colours, specification table, FAQs, related products within the same category, CTA with a brochure-placeholder link and enquiry button).
- `scripts/generate-products.js` — a zero-dependency Node script (standard library only, no `package.json`) that writes all 24 pages from the two files above; safe to re-run at any time. This is author-time tooling only — it has no bearing on how the site is served (see `docs/MASTER_DEVELOPMENT_STANDARD.md`, Section 5).
- `products/<category>/<slug>.html` × 24 — Compact Store, Apex Utility, Pent Workshop, Heavy Duty Store, Garden Store Plus, Premium Workshop (Utility Sheds); The Studio, The Retreat, The Cedar, The Oak, The Contemporary, The Pavilion (Garden Rooms); Classic Summer House, Corner Retreat, Garden Pavilion, Heritage Summer House, Contemporary Retreat, Family Summer House (Summer Houses); Executive Office, Compact Office, Professional Studio, Garden Workspace, Executive Plus, Signature Office (Garden Offices).
- `products/utility-sheds.html`, `garden-rooms.html`, `summer-houses.html`, `garden-offices.html` — each gained a breadcrumb, a "Product Ranges" section linking to its 6 individual product pages, a visual-only "Compare the Range" table, a testimonials section, and an FAQ section.
- `css/components/product-page.css` — breadcrumb, product gallery (lead image + thumbnails with a lightbox-*placeholder* zoom icon), size/option/colour cards, specification table, native `<details>`/`<summary>` FAQ styling, and the comparison table preview.
- `js/modules/productGallery.js` — clicking a gallery thumbnail swaps it into the lead image (real, working behaviour); the "expand" icon hints at a future full-screen lightbox but doesn't open one yet, matching the brief's explicit "Image Lightbox placeholder" wording.
- 4 new verified, licence-checked Unsplash photographs (timber interiors and construction-detail close-ups) added to the shared image pool used across product galleries; the pool is deliberately reused and rotated across products rather than sourcing ~100 unique images for a demonstration catalogue.

**Acceptance Criteria:**
- All 30 pages (homepage, 5 catalogue/hub pages, 24 product pages) checked programmatically: zero horizontal overflow, zero console errors, zero duplicate element IDs, and all 33 unique internal link targets resolve to HTTP 200.
- Gallery thumbnail-swap and FAQ accordion both verified to actually work (not just visually) via headless browser interaction.
- A grammar bug in the shared template (doubled article — "About the The Studio" — affecting the 6 "The ___"-named Garden Rooms products) was caught during review, fixed once in `scripts/product-template.js`, and corrected across all 24 pages by re-running the generator — demonstrating the exact maintainability benefit this architecture is for.
- No individual product introduces ecommerce, accounts, or functional forms; every enquiry path leads to the existing placeholder contact section.

**Notes:**
- Marketing copy uses category-level shared content (lifestyle framing, construction details, FAQs, option lists) combined with per-product specifics (name, tagline, overview, gallery selection) rather than 24 fully bespoke essays — appropriate and disclosed for a demonstration catalogue whose purpose is to showcase the architecture, per the brief.
- Testimonials on both category and product-adjacent pages remain explicitly illustrative example copy, consistent with prior releases.

## [0.5.0] — 2026-07-03 — Product Catalogue Framework

**Objective:** Establish the reusable architecture for browsing the Hereford Patio & Sheds range — a Products landing page and four premium category pages — focused on browsing experience rather than individual product specifications.

**Governance:** Catalogue framework release only. No individual product specification pages, online purchasing, shopping basket, checkout, customer accounts, Quote Builder functionality, contact form backend, finance, or search were implemented. All "Request a Quote"/"Contact Us" CTAs point to the existing footer contact placeholder (`#contact`); the product filter bar is a visual-only preview with no functional filtering.

**Scope:** A "Products" dropdown in the main navigation (desktop hover/click, mobile accordion); a Products landing page (`products/index.html`); four category pages (`products/utility-sheds.html`, `garden-rooms.html`, `summer-houses.html`, `garden-offices.html`); a reusable feature-icon-list component; a visual-only filter bar; new photography.

**Deliverables:**
- `components/navigation.html`, `index.html`, and all 5 new pages — nav restructured from 8 flat top-level items down to Home / **Products (dropdown)** / Gallery / About / Contact, freeing up room in the nav and reducing prior overflow risk. The dropdown is a hybrid: CSS `:hover`/`:focus-within` reveals it for pointer/keyboard users with no JS at all, and `js/modules/navigation.js` adds click-to-toggle for touch devices (which have no real hover) plus outside-click/Escape-to-close.
- `products/index.html` — catalogue hub: hero, introduction, a combined category-navigation/featured-collections grid (avoiding two near-identical sections), a benefits strip (reusing the homepage trust indicators), and a closing CTA.
- `products/utility-sheds.html`, `garden-rooms.html`, `summer-houses.html`, `garden-offices.html` — each with a premium hero, a visual-only filter bar (`css/components/catalogue.css`), category-specific marketing copy and photography, a 6-item feature-icon list (Pressure Treated, Made in Britain, Installation Available, Custom Sizes, Sustainable Timber, 10 Year Guarantee (placeholder)), a 3-image gallery preview, a related-products section (reusing `.card-product`, cross-linking the other three categories), and a CTA banner.
- `css/components/catalogue.css` — new stylesheet for the feature-icon list and filter bar, used only on the 5 catalogue pages (not the homepage).
- `css/components/navigation.css`, `js/modules/navigation.js` — dropdown styling and toggle/outside-click/Escape logic.
- 5 new verified, licence-checked Unsplash photographs (Products landing hero + one lifestyle image per category); all other imagery reuses the existing verified pool from v0.3.2–v0.4.0.
- Existing homepage Collection card CTAs and footer Products links now point to the real category pages instead of `#` placeholders — a direct, expected consequence of these pages now existing.

**Acceptance Criteria:**
- Every internal link across all 6 pages (30+ hrefs) verified to resolve with HTTP 200 — no dead links.
- Products dropdown verified programmatically (not just visually): reveals on desktop hover, toggles on click, and correctly navigates to each category page; mobile accordion opens on tap and the whole mobile menu closes after navigating.
- Re-verified across 375/768/1440px on all 6 pages: no horizontal overflow, no console errors.
- No individual product specification pages, purchasing, or search exist — the architecture supports adding them later without restructuring.
- Filter bar is clearly non-interactive (plain `<span>` pills, not disabled-looking buttons or fake links) with a "coming soon" caption, avoiding a false affordance.

**Notes:** The four category pages share one structural template (hero → filters → intro → feature highlights → gallery → related products → CTA) with only content, images, and copy differing — this is the intended pattern for adding a fifth category later.

## [0.4.1] — 2026-07-03 — Global Announcement Bar & Header Enhancement

**Objective:** Introduce a premium, reusable global announcement bar above the main navigation that rotates through short promotional messages, to improve customer confidence and give the business an easy way to surface key selling points (and, later, promotions) without touching the rest of the site.

**Governance:** Announcement bar release only. No new pages, no homepage layout changes, no changes to existing CSS variables/tokens, no backend, no Quote Builder or ecommerce functionality, and no changes to existing navigation links. The bar sits in normal document flow above the existing sticky header — it was not made sticky itself, so no other component's positioning changed.

**Scope:** A new, globally reusable announcement bar component: rotating text with a tick icon, fade-only transitions, pause-on-hover, and a single configurable message list.

**Deliverables:**
- `components/announcement-bar.html` — canonical source markup (mirrored inline in `index.html`, same convention as the nav/footer partials).
- `css/components/announcement-bar.css` — new component stylesheet; ~44px bar using the existing `--color-primary` background and `--color-text-inverse` text (no new tokens added), with a `prefers-reduced-motion` override.
- `js/modules/announcementBar.js` — new module owning rotation. The message list is a single `ANNOUNCEMENT_MESSAGES` array at the top of the file with an inline comment explaining how to add, remove, or reorder messages; rotation is `setInterval`-driven (~5.5s), fades via a CSS class rather than a JS animation loop, pauses on `mouseenter`/resumes on `mouseleave`, and is skipped entirely (static first message only) under `prefers-reduced-motion`.
- `js/main.js` — now also calls `initAnnouncementBar()`.
- Initial message set: "Free Local Delivery Within 30 Miles of Hereford", "Free Design Consultation", "Family Run Business", "Professional Delivery & Installation".

**Acceptance Criteria:**
- Bar rotates automatically through all four messages with a fade-only transition and no layout shift; verified in a headless browser (message changes confirmed at each ~5.5s interval).
- Hovering the bar pauses rotation; moving the pointer away resumes it — both verified directly (not just visually).
- Responsive at 320–1440px: the longest message stays on one line from 375px up; at 320px it wraps to two lines rather than clipping or overflowing (bar grows from ~44px to ~56px to accommodate this) — no horizontal overflow at any width tested.
- Accessible: semantic `role="region"` with `aria-label`, tick icon is `aria-hidden`, sufficient colour contrast (warm white on deep forest green, the same combination already used and reviewed for the CTA banner), no interactive elements so no keyboard traps. `aria-live` was deliberately *not* added — an auto-rotating live region would interrupt screen reader users every ~5.5 seconds, which is worse than reading whichever message happens to be present.
- No console errors and no regressions to any other component, verified across the same breakpoint matrix used in prior releases.

**Notes:** The message list is intentionally plain strings in a JS array (not HTML) so future edits (e.g. "Summer Sale Now On", "Finance Available") are a one-line change with no markup risk — see the comment block at the top of `js/modules/announcementBar.js`.

## [0.4.0] — 2026-07-03 — Premium Homepage Experience

**Objective:** Elevate the Hereford Patio & Sheds homepage into a premium, benchmark-quality landing page — refined hero messaging, a "Why Choose Us" section, a four-step customer journey, and responsive/performance polish — establishing the standard for all future pages.

**Governance:** Homepage content and refinement release only. No product detail pages, Quote Builder functionality, ecommerce, customer accounts, search, finance, blog, dedicated gallery page, or contact form backend were introduced — all new CTAs use placeholder anchors/links. The v0.3.0 design system and v0.3.2 branding were extended, not replaced.

**Scope:** Refresh hero headline/copy/buttons; refresh Trust Indicators copy and add a new icon; add a new "Why Choose Us" split section with a new photograph; add a new four-step "Customer Journey" section; rename the collection heading; refresh the closing CTA copy; add `srcset`/`sizes` responsive images across every photograph on the page; light navigation polish (spacing, hover, sticky-scroll shadow).

**Deliverables:**
- `index.html`, `components/footer.html` — new hero headline ("Beautiful Outdoor Buildings Built Around Your Lifestyle") and CTAs ("Explore Our Buildings" / "Request a Quote"); refreshed Trust Indicators (Quality Craftsmanship, Made to Measure, Professional Installation, Family Business — one new hand-authored SVG icon); new "Why Choose Us" section (`#why-choose-us`, reusing the reversed `.split-content` pattern with a new verified photograph); new "Customer Journey" section (`#journey`, four numbered steps reusing `.card-feature` plus a new `.step-number` treatment); Collection section retitled "Explore Our Collection"; CTA banner retitled "Ready to Transform Your Garden?" with a "Get Your Free Quote" button; footer's Company column links to the new Why Choose Us section.
- One new verified, licence-checked Unsplash photograph (craftsmanship/build-in-progress) for the Why Choose Us section.
- `css/components/navigation.css` — larger mobile tap targets, a slightly stronger scrolled-state shadow/blur, smoother hover colour transitions.
- `css/components/cards.css` — `.step-number` styling for the Customer Journey cards.
- Every photograph on the homepage (14 in total) now ships a `srcset`/`sizes` pair sized to its actual layout context, in addition to the `loading="lazy"`/`loading="eager"` split already in place from v0.3.2.

**Acceptance Criteria:**
- Homepage includes professional branding, premium hero, trust indicators, featured collections, Why Choose Us, customer journey, testimonials, and a strong closing CTA, per the brief.
- No regressions: re-verified in a headless browser at 375/390/768/900/1024/1440px — no horizontal overflow, no console errors, and all 14 images (including new `srcset` variants) resolve successfully after a full-page scroll.
- No new pages, functionality, or business-critical integrations were introduced; all new links are placeholder anchors.

**Notes:** This release also corrects a pre-existing documentation bug: the entry below for the documentation release was mislabelled `[0.4.0]` in this file even though it was actually tagged and committed as `v0.3.1`. It's renamed to `[0.3.1]` here to match the real git history (`v0.3.0` → `v0.3.1` → `v0.3.2` → this `v0.4.0`), and the outdated "versioning exception" note that no longer reflects reality has been removed.

## [0.3.2] — 2026-07-03 — Homepage Visual Identity, Branding & Content Refresh

**Objective:** Transform the website foundation into a premium marketing homepage for **Hereford Patio & Sheds**, a family-run outdoor living company specialising in utility sheds, garden rooms, summer houses, and garden offices — replacing all placeholder branding, copy, and imagery.

**Governance:** Homepage content, branding, and photography release only. No ecommerce, customer login, Quote Builder functionality, contact form backend, blog functionality, finance, search, or AI assistant were introduced. The v0.3.0 design system (tokens, breakpoints, component CSS) was extended, not replaced or duplicated. No new pages were created — all navigation targets are anchors within the existing homepage.

**Scope:** Replace the temporary brand identity with Hereford Patio & Sheds (logo, name, colours unchanged); redesign the hero as a split copy/photograph layout; add a trust bar, refreshed "About" section, a 4-item collection section (replacing "Featured Products"), real photography throughout, professional marketing copy sitewide, an expanded 8-item navigation, and an expanded footer (Opening Hours placeholder alongside Contact).

**Deliverables:**
- `index.html`, `components/navigation.html`, `components/footer.html` — full copy and branding refresh; temporary shed-outline SVG logo; 8-item navigation (Home, Sheds, Garden Rooms, Summer Houses, Garden Offices, Gallery, About, Contact) plus a "Get a Quote" button; footer Opening Hours block added alongside Contact.
- 10 real, licence-verified photographs from Unsplash (free tier) replacing every `image-placeholder` div on the homepage — hero, About, all 4 collection cards, and all 4 gallery-preview cards. Each URL was checked for an HTTP 200 response and visually reviewed before use.
- Hand-authored inline SVG icons: the logo mark and four trust-bar icons (Quality Materials, Expert Craftsmanship, Made to Suit You, Delivery & Installation) — no icon library dependency.
- `css/components/sections.css` — new split hero (`.hero-grid`) with a soft gradient seam between copy and photograph, and a `.trust-bar` strip.
- `css/components/navigation.css` — logo mark resized for an SVG icon; desktop menu gap/type-size tightened to fit 8 items + CTA at the existing 1024px breakpoint with no overflow.
- `css/components/cards.css`, `css/layout.css` — `.photo-cover` / `.split-media` / `.card-media` updated to host real `<img>` elements (lazy-loaded, sized, `decoding="async"`) in place of placeholder divs; the `.image-placeholder` utility itself is untouched and still available for future placeholder needs.

**Acceptance Criteria:**
- Homepage reads as a premium outdoor living brand, not a timber merchant; no placeholder marketing copy remains.
- Branding consistently reads "Hereford Patio & Sheds" in the nav, footer, and page metadata.
- Hero, trust bar, collection cards, gallery, testimonials, CTA banner, and footer all use real copy and real photography.
- Verified in a headless browser at 375/390/768/900/1024/1440px: no horizontal overflow, no console errors, all images resolve successfully (confirmed after a full-page scroll to trigger lazy loading).
- No regressions to the v0.3.0 design system, GitHub Pages compatibility, or Live Server compatibility.

**Notes:**
- Address, phone number, and opening hours in the footer remain explicit placeholders (as the brief required) pending real business details; `<meta name="robots" content="noindex, nofollow">` is kept for the same reason.
- Testimonials are clearly labelled as illustrative example copy, not real customer quotes, since the business has no real customers yet.
- All 10 photographs are Unsplash free-tier images (not `plus.unsplash.com` premium/licensed content), usable without attribution under the Unsplash License — but photo URLs are only as durable as Unsplash keeps them live; a future release should consider downloading and self-hosting under `assets/images/` for long-term stability.

## [0.3.1] — 2026-07-03 — Development & Deployment Documentation

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
