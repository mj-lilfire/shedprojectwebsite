/**
 * Announcement Bar — rotates through a configurable list of short
 * promotional messages displayed above the main navigation.
 *
 * TO ADD, REMOVE, OR EDIT A MESSAGE: edit the ANNOUNCEMENT_MESSAGES array
 * below. Each entry is plain text (no HTML) shown after the tick icon.
 * Order is preserved, and rotation loops back to the first message after
 * the last one. Keep entries short — this bar is a single line at ~44px.
 */
const ANNOUNCEMENT_MESSAGES = [
  "Free Local Delivery Within 30 Miles of Hereford",
  "Free Design Consultation",
  "Family Run Business",
  "Professional Delivery & Installation",
];

const ROTATION_INTERVAL_MS = 5500;
const FADE_DURATION_MS = 400;

export function initAnnouncementBar() {
  const bar = document.querySelector("[data-announcement-bar]");
  const textEl = document.querySelector("[data-announcement-text]");

  if (!bar || !textEl || ANNOUNCEMENT_MESSAGES.length <= 1) {
    return;
  }

  // The bar's static HTML shows the first message as a no-JS fallback.
  // Re-sync to ANNOUNCEMENT_MESSAGES[0] here so the array stays the single
  // source of truth even if that fallback text drifts out of date.
  let index = 0;
  textEl.textContent = ANNOUNCEMENT_MESSAGES[index];

  // Respect reduced-motion preferences by not rotating at all, rather than
  // swapping the transition for an instant cut — the fade is the point.
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  let timer = null;

  const showNext = () => {
    textEl.classList.add("is-fading");
    setTimeout(() => {
      index = (index + 1) % ANNOUNCEMENT_MESSAGES.length;
      textEl.textContent = ANNOUNCEMENT_MESSAGES[index];
      textEl.classList.remove("is-fading");
    }, FADE_DURATION_MS);
  };

  const start = () => {
    if (timer) return;
    timer = setInterval(showNext, ROTATION_INTERVAL_MS);
  };

  const stop = () => {
    clearInterval(timer);
    timer = null;
  };

  start();
  bar.addEventListener("mouseenter", stop);
  bar.addEventListener("mouseleave", start);
}
