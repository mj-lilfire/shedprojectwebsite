/**
 * Renders the full HTML for one individual product page. Consumed by
 * scripts/generate-products.js — see that file for how this is invoked,
 * and scripts/products-data.js for the data this reads.
 *
 * This is the *only* place individual product page markup is authored.
 * Adding a 25th product never means writing new HTML — it means adding a
 * data entry and re-running the generator.
 */

const FEATURE_ICONS = {
  pressureTreated: {
    label: "Pressure Treated",
    svg: '<svg viewBox="0 0 24 24" fill="none"><path d="M12 3.5c-3 4-6 7.5-6 11a6 6 0 0012 0c0-3.5-3-7-6-11z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" /></svg>',
  },
  madeInBritain: {
    label: "Made in Britain",
    svg: '<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="9" r="4.5" stroke="currentColor" stroke-width="1.7" /><path d="M9 12.8L7.3 20l4.7-2.8 4.7 2.8-1.7-7.2" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" /></svg>',
  },
  installation: {
    label: "Installation Available",
    svg: '<svg viewBox="0 0 24 24" fill="none"><path d="M14.7 6.3a4 4 0 00-5.4 5.4L4 17l3 3 5.3-5.3a4 4 0 005.4-5.4l-2.3 2.3-2-2z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" /></svg>',
  },
  customSizes: {
    label: "Custom Sizes",
    svg: '<svg viewBox="0 0 24 24" fill="none"><path d="M4 9V4h5M20 15v5h-5M4 4l6 6M20 20l-6-6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" /></svg>',
  },
  sustainableTimber: {
    label: "Sustainable Timber",
    svg: '<svg viewBox="0 0 24 24" fill="none"><path d="M5 19c8 0 14-6 14-14-8 0-14 6-14 14z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" /><path d="M5 19c2-6 6-10 12-12" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" /></svg>',
  },
  guarantee: {
    label: "10 Year Guarantee (placeholder)",
    svg: '<svg viewBox="0 0 24 24" fill="none"><path d="M12 3l7 3v6c0 5-3 8-7 9-4-1-7-4-7-9V6l7-3z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" /><path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" /></svg>',
  },
};

const COLOUR_HEX = {
  "Forest Green": "#1B4332",
  Charcoal: "#33362F",
  "Natural Timber": "#C79B6F",
  "Soft Grey": "#A9ADA3",
  "Warm Timber": "#A9754F",
};

function imgUrl(id, w, q) {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=${q || 80}`;
}

function imgSrcset(id, widths) {
  return widths.map((w) => `${imgUrl(id, w)} ${w}w`).join(",\n              ");
}

function escapeHtml(str) {
  return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** Rotates a 6-image category gallery pool into a distinct 4-image window per product index, so the 6 products in a category don't all show an identical gallery. */
function pickGalleryWindow(pool, index, count) {
  const window = [];
  for (let i = 0; i < count; i++) {
    window.push(pool[(index + i) % pool.length]);
  }
  return window;
}

function renderHead({ title, description, ogDescription }) {
  return `<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}" />

  <!-- Contact details and opening hours in the footer are still placeholders pending a future release, so this page is kept out of search results until they're finalised. -->
  <meta name="robots" content="noindex, nofollow" />

  <meta property="og:type" content="website" />
  <meta property="og:title" content="${escapeHtml(title)}" />
  <meta property="og:description" content="${escapeHtml(ogDescription)}" />

  <meta name="theme-color" content="#1B4332" />
  <link
    rel="icon"
    href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='7' fill='%231B4332'/%3E%3Cpath d='M6 16L16 8L26 16' stroke='%23FAF7F2' stroke-width='2.3' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M8.5 14V25H23.5V14' stroke='%23FAF7F2' stroke-width='2.3' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E"
  />

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link rel="preconnect" href="https://images.unsplash.com" />
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@500;600;700&display=swap"
    rel="stylesheet"
  />

  <link rel="stylesheet" href="../../css/variables.css" />
  <link rel="stylesheet" href="../../css/base.css" />
  <link rel="stylesheet" href="../../css/typography.css" />
  <link rel="stylesheet" href="../../css/layout.css" />
  <link rel="stylesheet" href="../../css/components/buttons.css" />
  <link rel="stylesheet" href="../../css/components/cards.css" />
  <link rel="stylesheet" href="../../css/components/announcement-bar.css" />
  <link rel="stylesheet" href="../../css/components/navigation.css" />
  <link rel="stylesheet" href="../../css/components/footer.css" />
  <link rel="stylesheet" href="../../css/components/sections.css" />
  <link rel="stylesheet" href="../../css/components/catalogue.css" />
  <link rel="stylesheet" href="../../css/components/product-page.css" />
  <link rel="stylesheet" href="../../css/animations.css" />

  <noscript>
    <style>
      .fade-in-on-scroll {
        opacity: 1 !important;
        transform: none !important;
      }
    </style>
  </noscript>
</head>`;
}

function renderAnnouncementBar() {
  return `  <div class="announcement-bar" role="region" aria-label="Promotions and announcements" data-announcement-bar>
    <div class="container announcement-bar-inner">
      <svg class="announcement-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M5 12.5l4.5 4.5L19 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      <p class="announcement-text" data-announcement-text>Free Local Delivery Within 30 Miles of Hereford</p>
    </div>
  </div>`;
}

function renderNav(categorySlug) {
  const items = [
    ["index", "All Products"],
    ["utility-sheds", "Utility Sheds"],
    ["garden-rooms", "Garden Rooms"],
    ["summer-houses", "Summer Houses"],
    ["garden-offices", "Garden Offices"],
  ];
  const dropdownLinks = items
    .map(([slug, label]) => {
      const href = slug === "index" ? "../index.html" : `../${slug}.html`;
      const current = slug === categorySlug ? ' aria-current="page"' : "";
      return `              <li><a href="${href}"${current}>${label}</a></li>`;
    })
    .join("\n");

  return `  <header class="site-header" data-site-header>
    <div class="container nav-container">
      <a href="../../index.html#top" class="logo" aria-label="Hereford Patio & Sheds — Home">
        <svg class="logo-mark" viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <path d="M4 15L16 5L28 15" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M7 13V27H25V13" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M13 27V19H19V27" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <span class="logo-text">Hereford Patio &amp; Sheds</span>
      </a>

      <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="primary-navigation" aria-label="Toggle navigation menu">
        <span class="nav-toggle-bar"></span>
        <span class="nav-toggle-bar"></span>
        <span class="nav-toggle-bar"></span>
      </button>

      <nav id="primary-navigation" class="primary-navigation" aria-label="Primary">
        <ul class="nav-menu">
          <li><a href="../../index.html#top">Home</a></li>
          <li class="nav-item-dropdown">
            <button type="button" class="nav-dropdown-trigger" aria-expanded="false" aria-controls="products-dropdown-menu">
              Products
              <svg class="nav-dropdown-caret" viewBox="0 0 12 8" fill="none" aria-hidden="true">
                <path d="M1 1l5 5 5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
            <ul id="products-dropdown-menu" class="nav-dropdown-menu">
${dropdownLinks}
            </ul>
          </li>
          <li><a href="../../index.html#gallery-preview">Gallery</a></li>
          <li><a href="../../index.html#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <a href="#contact" class="btn btn-primary nav-cta">Get a Quote</a>
      </nav>
    </div>
  </header>`;
}

function renderFooter() {
  return `  <footer class="site-footer">
    <div class="container footer-top">
      <div class="footer-column footer-brand">
        <a href="../../index.html#top" class="logo" aria-label="Hereford Patio & Sheds — Home">
          <svg class="logo-mark" viewBox="0 0 32 32" fill="none" aria-hidden="true">
            <path d="M4 15L16 5L28 15" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M7 13V27H25V13" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M13 27V19H19V27" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <span class="logo-text">Hereford Patio &amp; Sheds</span>
        </a>
        <p class="footer-tagline">Premium garden rooms, summer houses and sheds — built to last.</p>
        <form class="newsletter-form" aria-label="Newsletter signup">
          <label for="newsletter-email" class="visually-hidden">Email address</label>
          <input type="email" id="newsletter-email" name="email" placeholder="Your email address" autocomplete="email" disabled />
          <button type="submit" class="btn btn-outline" disabled>Subscribe</button>
        </form>
        <p class="footer-note">Newsletter signup coming soon.</p>
      </div>

      <nav class="footer-column" aria-label="Company">
        <h3>Company</h3>
        <ul>
          <li><a href="../../index.html#about">About Us</a></li>
          <li><a href="../../index.html#why-choose-us">Why Choose Us</a></li>
          <li><a href="#">Careers</a></li>
        </ul>
      </nav>

      <nav class="footer-column" aria-label="Products">
        <h3>Products</h3>
        <ul>
          <li><a href="../utility-sheds.html">Utility Sheds</a></li>
          <li><a href="../garden-rooms.html">Garden Rooms</a></li>
          <li><a href="../summer-houses.html">Summer Houses</a></li>
          <li><a href="../garden-offices.html">Garden Offices</a></li>
        </ul>
      </nav>

      <nav class="footer-column" aria-label="Information">
        <h3>Information</h3>
        <ul>
          <li><a href="#">FAQs</a></li>
          <li><a href="#">Warranty</a></li>
          <li><a href="#">Delivery &amp; Installation</a></li>
        </ul>
      </nav>

      <div class="footer-column" id="contact" aria-label="Contact">
        <h3>Contact</h3>
        <ul class="footer-contact-list">
          <li>Placeholder Address Line 1</li>
          <li>Placeholder Town, Placeholder Postcode</li>
          <li><a href="tel:+440000000000">Placeholder Phone Number</a></li>
          <li><a href="mailto:hello@example.com">hello@example.com</a></li>
        </ul>
        <ul class="social-list" aria-label="Social media">
          <li><a href="#" class="social-icon" aria-label="Facebook (placeholder)">FB</a></li>
          <li><a href="#" class="social-icon" aria-label="Instagram (placeholder)">IG</a></li>
          <li><a href="#" class="social-icon" aria-label="Pinterest (placeholder)">PIN</a></li>
        </ul>
        <h3 class="footer-subheading">Opening Hours</h3>
        <ul class="footer-contact-list">
          <li>Mon–Fri: 8:30am–5pm (placeholder)</li>
          <li>Sat: 9am–1pm (placeholder)</li>
          <li>Sun: Closed</li>
        </ul>
      </div>
    </div>

    <div class="footer-bottom container">
      <p>&copy; <span data-current-year>2026</span> Hereford Patio &amp; Sheds. All rights reserved.</p>
      <ul class="footer-legal">
        <li><a href="#">Privacy Policy</a></li>
        <li><a href="#">Terms of Service</a></li>
      </ul>
    </div>
  </footer>

  <script type="module" src="../../js/main.js"></script>`;
}

function renderOptionGrid(items) {
  return `        <div class="option-grid">
${items.map((name) => `          <div class="option-card"><span class="option-name">${escapeHtml(name)}</span></div>`).join("\n")}
        </div>`;
}

function renderSizeGrid(sizes) {
  return `        <div class="option-grid">
${sizes
  .map(
    (s) => `          <div class="option-card">
            <span class="option-name">${escapeHtml(s.name)}</span>
            <span class="option-detail">${escapeHtml(s.dimensions)}</span>
          </div>`
  )
  .join("\n")}
        </div>`;
}

function renderColourGrid(colours) {
  return `        <div class="colour-grid">
${colours
  .map(
    (name) => `          <div class="colour-card">
            <span class="colour-swatch" style="background-color: ${COLOUR_HEX[name] || "#A9ADA3"};" aria-hidden="true"></span>
            <span>${escapeHtml(name)}</span>
          </div>`
  )
  .join("\n")}
        </div>`;
}

function renderFeatureIcons(keys) {
  return `        <div class="feature-icon-list">
${keys
  .map((key) => {
    const icon = FEATURE_ICONS[key];
    return `          <div class="feature-icon-item">
            <span class="icon-badge" aria-hidden="true">${icon.svg}</span>
            <span>${escapeHtml(icon.label)}</span>
          </div>`;
  })
  .join("\n")}
        </div>`;
}

function renderFaqs(faqs) {
  return `      <div class="faq-list">
${faqs
  .map(
    (f) => `        <details class="faq-item">
          <summary>${escapeHtml(f.q)}</summary>
          <p>${escapeHtml(f.a)}</p>
        </details>`
  )
  .join("\n")}
      </div>`;
}

function renderRelatedProducts(related, categorySlug) {
  return `        <div class="grid grid-3">
${related
  .map((p) => {
    const img = p.heroImageId;
    return `          <article class="card card-product fade-in-on-scroll">
            <div class="card-media">
              <img
                class="photo-cover"
                src="${imgUrl(img, 800)}"
                srcset="${imgSrcset(img, [400, 600, 900])}"
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                alt="${escapeHtml(p.heroAlt)}"
                width="800"
                height="600"
                loading="lazy"
                decoding="async"
              />
            </div>
            <h3>${escapeHtml(p.name)}</h3>
            <p>${escapeHtml(p.tagline)}</p>
            <a href="${p.slug}.html" class="btn btn-outline btn-sm">Learn More</a>
          </article>`;
  })
  .join("\n")}
        </div>`;
}

function renderGallery(windowKeys, images, heroAlt) {
  const heroId = images[windowKeys[0]].id;
  const thumbs = windowKeys
    .map((key, i) => {
      const img = images[key];
      return `        <button type="button" class="product-gallery-thumb" data-gallery-thumb aria-current="${i === 0 ? "true" : "false"}">
          <img
            class="photo-cover"
            src="${imgUrl(img.id, 400)}"
            srcset="${imgSrcset(img.id, [300, 450, 600])}"
            sizes="(min-width: 640px) 25vw, 50vw"
            alt="${escapeHtml(img.alt)}"
            width="400"
            height="400"
            loading="lazy"
            decoding="async"
          />
          <span class="gallery-expand-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none"><path d="M9 4H4v5M15 4h5v5M9 20H4v-5M15 20h5v-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /></svg>
          </span>
        </button>`;
    })
    .join("\n");

  return `      <div class="product-gallery-lead">
        <img
          class="photo-cover"
          data-gallery-lead
          src="${imgUrl(heroId, 1200)}"
          srcset="${imgSrcset(heroId, [640, 960, 1280])}"
          sizes="100vw"
          alt="${escapeHtml(heroAlt)}"
          width="1200"
          height="750"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div class="product-gallery-thumbs">
${thumbs}
      </div>`;
}

function renderProductPage(product, category, allCategories, images, sharedData) {
  const { SHARED_FAQS, SHARED_OPTIONS, SHARED_SIZES, SHARED_CONSTRUCTION, SHARED_FEATURE_ICONS } = sharedData;
  const productIndex = category.products.findIndex((p) => p.slug === product.slug);
  const galleryWindow = pickGalleryWindow(category.galleryPool, productIndex, 4);
  const heroImage = images[galleryWindow[0]];
  const lifestyleImage = images[category.lifestyleImageKey];
  const options = SHARED_OPTIONS[category.slug];
  const sizes = SHARED_SIZES[category.slug];
  const faqs = SHARED_FAQS[category.slug];
  const construction = SHARED_CONSTRUCTION[category.slug];

  const related = category.products
    .filter((p) => p.slug !== product.slug)
    .slice(0, 3)
    .map((p) => {
      const idx = category.products.findIndex((x) => x.slug === p.slug);
      const relatedWindow = pickGalleryWindow(category.galleryPool, idx, 1);
      return { ...p, heroImageId: images[relatedWindow[0]].id, heroAlt: images[relatedWindow[0]].alt };
    });

  const title = `${product.name} | ${category.label} | Hereford Patio & Sheds`;
  const description = `${product.tagline} ${product.overview}`.slice(0, 155);

  return `<!DOCTYPE html>
<!-- Auto-generated by scripts/generate-products.js from scripts/products-data.js — do not edit this file directly; edit the data or scripts/product-template.js and regenerate. -->
<html lang="en">
${renderHead({ title, description, ogDescription: product.overview })}
<body>
  <a class="skip-link" href="#main">Skip to main content</a>

${renderAnnouncementBar()}

${renderNav(category.slug)}

  <main id="main">
    <nav class="breadcrumb container" aria-label="Breadcrumb">
      <ol>
        <li><a href="../../index.html#top">Home</a></li>
        <li><a href="../index.html">Products</a></li>
        <li><a href="../${category.slug}.html">${escapeHtml(category.label)}</a></li>
        <li aria-current="page">${escapeHtml(product.name)}</li>
      </ol>
    </nav>

    <!-- Hero -->
    <section class="hero fade-in-on-scroll" id="top">
      <div class="container hero-grid">
        <div class="hero-content">
          <p class="eyebrow">${escapeHtml(category.label)}</p>
          <h1>${escapeHtml(product.name)}</h1>
          <p class="lead">${escapeHtml(product.tagline)}</p>
          <div class="hero-actions">
            <a href="#contact" class="btn btn-primary">Request Your Free Quote</a>
            <a href="#cta-banner" class="btn btn-outline">Enquire Now</a>
          </div>
        </div>
        <div class="hero-media">
          <img
            class="photo-cover"
            src="${imgUrl(heroImage.id, 1200)}"
            srcset="${imgSrcset(heroImage.id, [640, 960, 1280])}"
            sizes="(min-width: 768px) 50vw, 100vw"
            alt="${escapeHtml(heroImage.alt)}"
            width="1200"
            height="900"
            loading="eager"
            fetchpriority="high"
          />
        </div>
      </div>
    </section>

    <!-- Gallery -->
    <section class="section" aria-labelledby="gallery-heading">
      <div class="container">
        <div class="section-header center fade-in-on-scroll">
          <p class="eyebrow">Gallery</p>
          <h2 id="gallery-heading">${escapeHtml(product.name)}, In Detail</h2>
        </div>
${renderGallery(galleryWindow, images, heroImage.alt)}
      </div>
    </section>

    <!-- Overview -->
    <section class="section" aria-labelledby="overview-heading">
      <div class="container" style="max-width: 44rem; margin-inline: auto; text-align: center;">
        <p class="eyebrow">Overview</p>
        <h2 id="overview-heading">${escapeHtml(product.name)}</h2>
        <p class="lead">${escapeHtml(product.overview)}</p>
      </div>
    </section>

    <!-- Lifestyle Introduction -->
    <section class="section" aria-labelledby="lifestyle-heading">
      <div class="container split-content">
        <div class="split-media">
          <img
            class="photo-cover"
            src="${imgUrl(lifestyleImage.id, 1000)}"
            srcset="${imgSrcset(lifestyleImage.id, [500, 800, 1100])}"
            sizes="(min-width: 768px) 50vw, 100vw"
            alt="${escapeHtml(lifestyleImage.alt)}"
            width="1000"
            height="750"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div class="split-text">
          <p class="eyebrow">Living With It</p>
          <h2 id="lifestyle-heading">Made for the Way You'll Actually Use It</h2>
          <p>${escapeHtml(product.tagline)} ${escapeHtml(product.name)} is designed around how you'll really spend time in it, not just how it looks from the garden — a space you'll want to use, not just admire.</p>
          <p>Every detail, from the layout to the light, is considered with everyday life in mind — because a building you love using is worth so much more than one you simply own.</p>
        </div>
      </div>
    </section>

    <!-- Key Features -->
    <section class="section" aria-labelledby="features-heading">
      <div class="container">
        <div class="section-header center fade-in-on-scroll">
          <p class="eyebrow">Key Features</p>
          <h2 id="features-heading">What's Included</h2>
        </div>
${renderFeatureIcons(SHARED_FEATURE_ICONS)}
      </div>
    </section>

    <!-- Construction Details -->
    <section class="section" aria-labelledby="construction-heading">
      <div class="container" style="max-width: 44rem; margin-inline: auto; text-align: center;">
        <p class="eyebrow">Construction</p>
        <h2 id="construction-heading">Built to Last</h2>
        <p class="lead">${escapeHtml(construction)}</p>
      </div>
    </section>

    <!-- Available Sizes -->
    <section class="section" aria-labelledby="sizes-heading">
      <div class="container">
        <div class="section-header center fade-in-on-scroll">
          <p class="eyebrow">Configure Your Building</p>
          <h2 id="sizes-heading">Available Sizes</h2>
        </div>
${renderSizeGrid(sizes)}
      </div>
    </section>

    <!-- Roof Options -->
    <section class="section" aria-labelledby="roof-heading">
      <div class="container">
        <div class="section-header center fade-in-on-scroll">
          <h2 id="roof-heading">Roof Options</h2>
        </div>
${renderOptionGrid(options.roof)}
      </div>
    </section>

    <!-- Door Options -->
    <section class="section" aria-labelledby="doors-heading">
      <div class="container">
        <div class="section-header center fade-in-on-scroll">
          <h2 id="doors-heading">Door Options</h2>
        </div>
${renderOptionGrid(options.doors)}
      </div>
    </section>

    <!-- Window Options -->
    <section class="section" aria-labelledby="windows-heading">
      <div class="container">
        <div class="section-header center fade-in-on-scroll">
          <h2 id="windows-heading">Window Options</h2>
        </div>
${renderOptionGrid(options.windows)}
      </div>
    </section>

    <!-- Optional Extras -->
    <section class="section" aria-labelledby="extras-heading">
      <div class="container">
        <div class="section-header center fade-in-on-scroll">
          <h2 id="extras-heading">Optional Extras</h2>
        </div>
${renderOptionGrid(options.extras)}
      </div>
    </section>

    <!-- Available Colours -->
    <section class="section" aria-labelledby="colours-heading">
      <div class="container">
        <div class="section-header center fade-in-on-scroll">
          <h2 id="colours-heading">Available Colours</h2>
        </div>
${renderColourGrid(options.colours)}
      </div>
    </section>

    <!-- Specification Table -->
    <section class="section" aria-labelledby="spec-heading">
      <div class="container" style="max-width: 40rem; margin-inline: auto;">
        <div class="section-header center fade-in-on-scroll">
          <p class="eyebrow">The Details</p>
          <h2 id="spec-heading">Specification</h2>
        </div>
        <table class="spec-table">
          <tbody>
            <tr><th scope="row">Available Sizes</th><td>${sizes.map((s) => s.dimensions).join(", ")}</td></tr>
            <tr><th scope="row">Roof Options</th><td>${options.roof.join(", ")}</td></tr>
            <tr><th scope="row">Cladding</th><td>Pressure-treated timber, finished to order</td></tr>
            <tr><th scope="row">Base Requirement</th><td>Level concrete or paved base recommended</td></tr>
            <tr><th scope="row">Guarantee</th><td>10 Year Guarantee (placeholder)</td></tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- FAQs -->
    <section class="section" aria-labelledby="faq-heading">
      <div class="container">
        <div class="section-header center fade-in-on-scroll">
          <p class="eyebrow">Frequently Asked Questions</p>
          <h2 id="faq-heading">Common Questions About ${escapeHtml(product.name)}</h2>
        </div>
${renderFaqs(faqs)}
      </div>
    </section>

    <!-- Related Products -->
    <section class="section" aria-labelledby="related-heading">
      <div class="container">
        <div class="section-header center fade-in-on-scroll">
          <p class="eyebrow">You Might Also Like</p>
          <h2 id="related-heading">More From Our ${escapeHtml(category.label)} Range</h2>
        </div>
${renderRelatedProducts(related, category.slug)}
      </div>
    </section>

    <!-- Call To Action -->
    <section class="cta-banner fade-in-on-scroll" id="cta-banner" aria-labelledby="cta-heading">
      <div class="container">
        <h2 id="cta-heading">Ready to Talk About ${escapeHtml(product.name)}?</h2>
        <p class="lead">Request a free, no-obligation quote or arrange a design consultation with our team.</p>
        <div class="hero-actions flex-center">
          <a href="#contact" class="btn btn-secondary">Request Your Free Quote</a>
          <a href="#contact" class="btn btn-outline-inverse">Arrange a Design Consultation</a>
          <a href="#" class="btn btn-outline-inverse">Download Brochure (PDF placeholder)</a>
        </div>
      </div>
    </section>
  </main>

${renderFooter()}
</body>
</html>
`;
}

module.exports = { renderProductPage, imgUrl, imgSrcset, pickGalleryWindow };
