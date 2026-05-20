/*-------------AUTO CLOSE OFFCANVAS------------------*/

document.addEventListener('click', function (event) {

    /* =========================
       MENU
    ========================= */

    const isMenuOpen = menuCanvas.classList.contains('show');

    if (isMenuOpen) {

        const clickedInsideMenu = menuCanvas.contains(event.target);

        const clickedMenuBtn = menuBtn.contains(event.target);

        /* SI EL CLICK FUE EN EL BTN */
        if (clickedMenuBtn) return;

        /* SI EL CLICK FUE FUERA */
        if (!clickedInsideMenu) {

            menuInstance.hide();

            return;
        }

        /* ELEMENTOS INTERACTIVOS */
        const interactiveMenuElement = event.target.closest(
            'a, button, input, [role="button"]'
        );

        /* SI NO FUE INTERACTIVO */
        if (!interactiveMenuElement) {

            menuInstance.hide();

            return;
        }
    }


    /* =========================
       SEARCH
    ========================= */

    const isSearchOpen = searchCanvas.classList.contains('show');

    if (isSearchOpen) {

        const clickedInsideSearch = searchCanvas.contains(event.target);

        const clickedSearchBtn = searchBtn.contains(event.target);

        const clickedMenuBtn = menuBtn.contains(event.target);

        /* IGNORAR BOTONES */
        if (clickedSearchBtn || clickedMenuBtn) return;

        /* CLICK FUERA */
        if (!clickedInsideSearch) {

            searchInstance.hide();

            return;
        }

        /* ELEMENTOS INTERACTIVOS */
        const interactiveSearchElement = event.target.closest(
            'input, button, a'
        );

        /* SI NO FUE INTERACTIVO */
        if (!interactiveSearchElement) {

            searchInstance.hide();

            return;
        }
    }

});

/*-------------Animacion close menu------------------*/
document.addEventListener('DOMContentLoaded', () => {

    const offcanvasEl = document.getElementById('megaMenuOffcanvas');
    const bsOffcanvas = bootstrap.Offcanvas.getOrCreateInstance(offcanvasEl);

    let isClosing = false;

    document.querySelector('.CVnavbar-cerrar').addEventListener('click', (e) => {

        e.preventDefault();

        if (isClosing) return;

        isClosing = true;

        // Fade out
        offcanvasEl.classList.add('closing');

        setTimeout(() => {

            // Cerrar offcanvas
            bsOffcanvas.hide();

        }, 260);

    });

    // Cuando termina de cerrarse
    offcanvasEl.addEventListener('hidden.bs.offcanvas', () => {

        offcanvasEl.classList.remove('closing');

        isClosing = false;

    });

});


/*-------------Animacion close buscador------------------*/
document.addEventListener('DOMContentLoaded', () => {

    const searchOffcanvasEl = document.getElementById('CVsearchOffcanvas');

    const searchOffcanvas =
        bootstrap.Offcanvas.getOrCreateInstance(searchOffcanvasEl);

    let isClosing = false;

    document.querySelector('.CVsearch-close')
        .addEventListener('click', (e) => {

            e.preventDefault();

            if (isClosing) return;

            isClosing = true;

            searchOffcanvasEl.classList.add('closing');

            setTimeout(() => {

                searchOffcanvas.hide();

            }, 180);

        });

    searchOffcanvasEl.addEventListener('hidden.bs.offcanvas', () => {

        searchOffcanvasEl.classList.remove('closing');

        isClosing = false;

    });

});


/*-------------Btn dinamico de buscador y menu------------------*/
/*-------------ELEMENTOS------------------*/

const menuCanvas = document.getElementById('megaMenuOffcanvas');
const searchCanvas = document.getElementById('CVsearchOffcanvas');

const menuBtn = document.getElementById('menuToggleBtn');
const searchBtn = document.querySelector('.CVbtn-search-trigger');

const menuInstance = bootstrap.Offcanvas.getOrCreateInstance(menuCanvas);
const searchInstance = bootstrap.Offcanvas.getOrCreateInstance(searchCanvas);


/* =========================
   MENU EVENTS
========================= */

menuCanvas.addEventListener('show.bs.offcanvas', () => {

    menuBtn.classList.add('is-open');

    menuBtn.setAttribute('data-mode', 'menu');

});

menuCanvas.addEventListener('hidden.bs.offcanvas', () => {

    /* SOLO LIMPIAR SI SEARCH NO ESTA ABIERTO */
    if (!searchCanvas.classList.contains('show')) {

        menuBtn.classList.remove('is-open');

        menuBtn.removeAttribute('data-mode');

    }

});


/* =========================
   SEARCH EVENTS
========================= */

searchCanvas.addEventListener('show.bs.offcanvas', () => {

    menuBtn.classList.add('is-open');

    menuBtn.setAttribute('data-mode', 'search');

});

searchCanvas.addEventListener('hidden.bs.offcanvas', () => {

    /* SOLO LIMPIAR SI MENU NO ESTA ABIERTO */
    if (!menuCanvas.classList.contains('show')) {

        menuBtn.classList.remove('is-open');

        menuBtn.removeAttribute('data-mode');

    }

});


/* =========================
   BOTON BUSCADOR
========================= */

searchBtn.addEventListener('click', (e) => {

    e.preventDefault();

    const mode = menuBtn.getAttribute('data-mode');

    /* SI MENU ESTA ABIERTO */

    if (mode === 'menu') {

        menuCanvas.addEventListener('hidden.bs.offcanvas', function handler() {

            searchInstance.show();

            menuCanvas.removeEventListener('hidden.bs.offcanvas', handler);

        });

        menuInstance.hide();

        return;

    }

    /* SI SEARCH YA ESTA ABIERTO */

    if (mode === 'search') {

        searchInstance.hide();

        return;

    }

    /* SI NADA ESTA ABIERTO */

    searchInstance.show();

});


/* =========================
   BOTON MENU / CLOSE
========================= */

menuBtn.addEventListener('click', (e) => {

    e.preventDefault();

    const mode = menuBtn.getAttribute('data-mode');

    /* SI MENU ESTA ABIERTO */

    if (mode === 'menu') {

        menuInstance.hide();

        return;

    }

    /* SI SEARCH ESTA ABIERTO */

    if (mode === 'search') {

        searchInstance.hide();

        return;

    }

    /* SI NADA ESTA ABIERTO */

    menuInstance.show();

});