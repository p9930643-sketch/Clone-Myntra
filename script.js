document.addEventListener('DOMContentLoaded', () => {
    console.log('script.js is running');

    const megaOver = document.getElementById('megaOver');
    const megaMenu = document.getElementById('megaMenu');
    const items    = document.querySelectorAll('.nav-item');
    const panels   = document.querySelectorAll('.menu-panel');
    let closeTimer;

    function openMenu(key) {
        clearTimeout(closeTimer);
        megaOver.classList.add('active');
        items.forEach(i => i.classList.toggle('active', i.dataset.menu === key));
        panels.forEach(p => p.classList.toggle('active', p.dataset.panel === key));
    }

    function closeMenu() {
        megaOver.classList.remove('active');
        items.forEach(i => i.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
    }

    function scheduleClose() {
        clearTimeout(closeTimer);
        closeTimer = setTimeout(closeMenu, 200);
    }

    items.forEach(item => {
        item.addEventListener('mouseenter', () => openMenu(item.dataset.menu));
        item.addEventListener('click',      () => openMenu(item.dataset.menu));
        item.addEventListener('mouseleave', scheduleClose);
    });

    megaOver.addEventListener('mouseenter', () => clearTimeout(closeTimer));
    megaOver.addEventListener('mouseleave', scheduleClose);

    megaOver.addEventListener('click', e => {
        if (e.target === megaOver) closeMenu();
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeMenu();
    });
});