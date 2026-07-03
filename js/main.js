import { initNavigation } from "./modules/navigation.js";
import { initScrollAnimations } from "./modules/animations.js";
import { initAnnouncementBar } from "./modules/announcementBar.js";

initNavigation();
initScrollAnimations();
initAnnouncementBar();

const yearEl = document.querySelector("[data-current-year]");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
