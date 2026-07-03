/**
 * Mobile hamburger toggle, sticky header scroll state, and keyboard support
 * for the reusable site navigation (components/navigation.html).
 */
export function initNavigation() {
  const header = document.querySelector("[data-site-header]");
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.getElementById("primary-navigation");

  if (!toggle || !menu) {
    return;
  }

  const closeMenu = () => {
    toggle.setAttribute("aria-expanded", "false");
    menu.classList.remove("is-open");
    document.body.classList.remove("nav-open");
  };

  const openMenu = () => {
    toggle.setAttribute("aria-expanded", "true");
    menu.classList.add("is-open");
    document.body.classList.add("nav-open");
  };

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    isOpen ? closeMenu() : openMenu();
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menu.classList.contains("is-open")) {
      closeMenu();
      toggle.focus();
    }
  });

  if (header) {
    const setScrolledState = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    setScrolledState();
    window.addEventListener("scroll", setScrolledState, { passive: true });
  }
}
