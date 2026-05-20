document.addEventListener('DOMContentLoaded', function () {

    /**
     * Configura un off-canvas de Bootstrap para que se cierre al hacer clic fuera de sus elementos interactivos.
     * @param {string} offcanvasId - El ID del elemento off-canvas.
     * @param {string} toggleButtonSelector - El selector CSS para el botón que abre el off-canvas.
     * @param {string} interactiveElementsSelector - Un selector CSS para los elementos dentro del off-canvas que deben ser interactivos (no deben cerrar el menú).
     */
    function setupOffcanvasAutoClose(offcanvasId, toggleButtonSelector, interactiveElementsSelector) {
        const offcanvasElement = document.getElementById(offcanvasId);
        const toggleButton = document.querySelector(toggleButtonSelector);

        if (!offcanvasElement || !toggleButton) {
            console.warn(`No se pudieron encontrar los elementos para el off-canvas con ID: ${offcanvasId}`);
            return;
        }

        document.addEventListener('click', function (event) {
            const isOffcanvasVisible = offcanvasElement.classList.contains('show');
            if (!isOffcanvasVisible) {
                return;
            }

            const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasElement);
            if (!offcanvasInstance) {
                return;
            }

            const isClickOnToggleButton = toggleButton.contains(event.target);
            const isClickInsideOffcanvas = offcanvasElement.contains(event.target);

            if (isClickOnToggleButton) {
                return; // Bootstrap maneja el clic en el botón de apertura/cierre.
            }

            if (!isClickInsideOffcanvas) {
                offcanvasInstance.hide(); // Cierra si el clic es completamente fuera.
                return;
            }

            // Si el clic es dentro, verifica si fue en un elemento no interactivo.
            const interactiveElement = event.target.closest(interactiveElementsSelector);
            if (!interactiveElement) {
                offcanvasInstance.hide(); // Cierra si el clic fue en un "espacio en blanco" dentro.
            }
        });
    }

    // Configurar el off-canvas del menú principal
    setupOffcanvasAutoClose(
        'megaMenuOffcanvas',
        '[data-bs-target="#megaMenuOffcanvas"]',
        'a, button, [role="button"], input'
    );

    // Configurar el off-canvas del buscador
    setupOffcanvasAutoClose(
        'CVsearchOffcanvas',
        '[data-bs-target="#CVsearchOffcanvas"]',
        'input, button' // En el buscador, solo el input y botones son interactivos.
    );

});