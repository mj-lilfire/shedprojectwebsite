/**
 * Product gallery: clicking a thumbnail swaps it into the lead image.
 *
 * The "expand" icon on each thumbnail (see .gallery-expand-icon in
 * css/components/product-page.css) is a lightbox *placeholder* — it hints
 * at a future full-screen viewer but doesn't open one yet. Swapping the
 * lead image is real, working behaviour; a genuine lightbox overlay is a
 * follow-up enhancement, not part of this release's scope.
 */
export function initProductGallery() {
  const lead = document.querySelector("[data-gallery-lead]");
  const thumbs = document.querySelectorAll("[data-gallery-thumb]");

  if (!lead || !thumbs.length) {
    return;
  }

  thumbs.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      const img = thumb.querySelector("img");
      if (!img) return;

      lead.src = img.currentSrc || img.src;
      lead.srcset = img.srcset || "";
      lead.alt = img.alt;

      thumbs.forEach((t) => t.setAttribute("aria-current", "false"));
      thumb.setAttribute("aria-current", "true");
    });
  });
}
