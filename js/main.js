import { initNavigation } from "./modules/navigation.js";
import { initScrollAnimations } from "./modules/animations.js";

initNavigation();
initScrollAnimations();

const yearEl = document.querySelector("[data-current-year]");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
