/* refresh.js
 * ----------
 * Global events and dependances. */

function bindAllEvents() {
    /* Display resize */
    $(window).resize(function() {
        refreshBody();
    });

    /* DOM ready */
    $(document).ready(function () {
        $(window).trigger("resize");
    });
    
    /* Dependances */
    bindTopNavEvents();
}