import { initNavigation } from "./modules/navigation.js";
import { initScrollAnimations } from "./modules/animations.js";
import { initAnnouncementBar } from "./modules/announcementBar.js";
import { initProductGallery } from "./modules/productGallery.js";

initNavigation();
initScrollAnimations();
initAnnouncementBar();
initProductGallery();

const yearEl = document.querySelector("[data-current-year]");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
