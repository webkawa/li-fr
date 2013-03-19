/* refresh.js
 * ----------
 * Display refresh relative functions and triggers. */

/* Display resize */
$(window).resize(function() {
    refreshBody();
});

/* DOM ready */
$(document).ready(function () {
    $(window).trigger("resize");
});