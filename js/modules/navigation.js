/**
 * Mobile hamburger toggle, sticky header scroll state, Products dropdown,
 * and keyboard support for the reusable site navigation
 * (components/navigation.html).
 */
export function initNavigation() {
  const header = document.querySelector("[data-site-header]");
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.getElementById("primary-navigation");
  const dropdowns = document.querySelectorAll(".nav-item-dropdown");

  const closeDropdowns = () => {
    dropdowns.forEach((dropdown) => {
      dropdown.classList.remove("is-open");
      dropdown.querySelector(".nav-dropdown-trigger")?.setAttribute("aria-expanded", "false");
    });
  };

  if (toggle && menu) {
    const closeMenu = () => {
      toggle.setAttribute("aria-expanded", "false");
      menu.classList.remove("is-open");
      document.body.classList.remove("nav-open");
      closeDropdowns();
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
  }

  // Products dropdown: click-to-toggle (covers touch and keyboard); the
  // CSS also opens it on :hover/:focus-within for pointer/keyboard users
  // without needing JS at all. The two mechanisms don't conflict — both
  // just show the same panel.
  dropdowns.forEach((dropdown) => {
    const trigger = dropdown.querySelector(".nav-dropdown-trigger");
    if (!trigger) return;

    trigger.addEventListener("click", (event) => {
      event.stopPropagation();
      const isOpen = dropdown.classList.contains("is-open");
      closeDropdowns();
      if (!isOpen) {
        dropdown.classList.add("is-open");
        trigger.setAttribute("aria-expanded", "true");
      }
    });
  });

  document.addEventListener("click", (event) => {
    if (![...dropdowns].some((dropdown) => dropdown.contains(event.target))) {
      closeDropdowns();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeDropdowns();
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
