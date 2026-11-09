document.addEventListener("DOMContentLoaded", () => {
    const navItems = document.querySelectorAll(".nav-item");
    const megaOver = document.getElementById('megaOver');
    const megaMenu = document.getElementById('megaMenu');
    const panels=document.querySelectorAll('.menu-panel');
    const cards=document.querySelectorAll('.category-card');
    const searchInput=document.querySelector('.search-box input');
    const categories=document.getElementById("categories");
    const canHover = window.matchMedia("(hover: hover)").matches;
    let closeTimer = null;
    let activeMenu = null;
    let activeFilter = null;
    /* ---------- MEGA MENU ---------- */
    function openMenu(name) {
        clearTimeout(closeTimer);
        activeMenu = name;
        navItems.forEach((btn) =>
            btn.classList.toggle("active", btn.dataset.menu === name));
        panels.forEach((panel) =>
            panel.classList.toggle("active", panel.dataset.panel === name));
        megaOver.classList.add("active");
    }
    function closeMenu() {
        activeMenu = null;
        navItems.forEach((btn) => btn.classList.remove("active"));
        panels.forEach((panel) => panel.classList.remove("active"));
        megaOver.classList.remove("active");
    }
     function scheduleClose() {
        clearTimeout(closeTimer);
        closeTimer = setTimeout(closeMenu, 150);
    }

    navItems.forEach((btn) => {
        const name = btn.dataset.menu;

    if (canHover) {
      // desktop: hover opens, click filters the category cards
      btn.addEventListener("mouseenter", () => openMenu(name));
      btn.addEventListener("mouseleave", scheduleClose);
      btn.addEventListener("click", () => filterCards(name));
    } else {
        // touch: tap toggles the menu
        btn.addEventListener("click", () =>
        activeMenu === name ? closeMenu() : openMenu(name));
      }
    });
    // keep open while the mouse is over the menu, close when it leaves
    megaMenu.addEventListener("mouseenter", () => clearTimeout(closeTimer));
    megaMenu.addEventListener("mouseleave", scheduleClose);

    // click on the dark backdrop closes the menu
    megaOver.addEventListener("click", (e) => {
        if (e.target === megaOver) closeMenu();
    });
    // Esc closes the menu
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeMenu();
  });
    // menu links use href="#": stop the jump to top and close the menu
    megaOver.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            closeMenu();
        });
    });
    /* ---------- CATEGORY FILTER ---------- */
    function matchesFilter(card, filter) {
        const tag = card.dataset.filter || "";
        if (filter === "Home") return tag.includes("Home");
        return tag.split("&").map((t) => t.trim()).includes(filter);
    }
    function filterCards(name) {
      // clicking the same nav item again clears the filter
      activeFilter = activeFilter === name ? null : name;
      cards.forEach((card) => {
        const show = !activeFilter || matchesFilter(card, activeFilter);
        card.style.display = show ? "" : "none";
      });

    if (searchInput) searchInput.value = "";
    if (categories) categories.scrollIntoView({ behavior: "smooth" });
    }
     /* ---------- SEARCH ---------- */
    if (searchInput) {
        searchInput.addEventListener("input", () => {
            const q = searchInput.value.trim().toLowerCase();
            activeFilter = null;
            cards.forEach((card) => {
                const name = card.querySelector("span")?.textContent || "";
                const alt = card.querySelector("img")?.alt || "";
                const text = (name + " " + alt).toLowerCase();
                card.style.display = text.includes(q) ? "" : "none";
            });
        });
        searchInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter" && categories) {
                categories.scrollIntoView({ behavior: "smooth" });
            }
        });
    }
    /* ---------- CARD + HEADER BUTTON CLICKS ---------- */
    cards.forEach((card) => {
        card.addEventListener("click", () => {
            const title = card.querySelector("span")?.textContent;
            console.log("Selected category:", title);
            // later: window.location.href = "products.html?cat=" + encodeURIComponent(title);
        });
    });
    document.querySelectorAll(".user-action button").forEach((btn) => {
        btn.addEventListener("click", () => {
            console.log(btn.getAttribute("aria-label") + " clicked");
        });
    });
});