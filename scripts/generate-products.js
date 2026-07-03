#!/usr/bin/env node
/**
 * Generates every individual product page from scripts/products-data.js
 * using scripts/product-template.js.
 *
 * Usage (from the repository root, plain Node — no dependencies):
 *   node scripts/generate-products.js
 *
 * This writes products/<category-slug>/<product-slug>.html for every
 * product in every category. It is safe to re-run at any time — it always
 * overwrites its own output. It does NOT touch the category landing pages
 * (products/<category-slug>.html), the homepage, or anything else.
 */
const fs = require("fs");
const path = require("path");

const { categories, IMAGES, SHARED_FAQS, SHARED_OPTIONS, SHARED_SIZES, SHARED_CONSTRUCTION, SHARED_FEATURE_ICONS } = require("./products-data.js");
const { renderProductPage } = require("./product-template.js");

const sharedData = { SHARED_FAQS, SHARED_OPTIONS, SHARED_SIZES, SHARED_CONSTRUCTION, SHARED_FEATURE_ICONS };
const productsRoot = path.join(__dirname, "..", "products");

let written = 0;

for (const category of categories) {
  const categoryDir = path.join(productsRoot, category.slug);
  fs.mkdirSync(categoryDir, { recursive: true });

  for (const product of category.products) {
    const html = renderProductPage(product, category, categories, IMAGES, sharedData);
    const filePath = path.join(categoryDir, `${product.slug}.html`);
    fs.writeFileSync(filePath, html, "utf8");
    written++;
    console.log(`wrote products/${category.slug}/${product.slug}.html`);
  }
}

console.log(`\nDone — generated ${written} product pages across ${categories.length} categories.`);
