/* layout.js
 * ---------
 * Global layout display functions. */

/* Body auto-resize */
function refreshBody() {
    /* Dimensions */
    $("div#body").realHeight(
        $(window).height() -
        $("div#header").outerHeight(true) -
        $("div#footer").outerHeight(true)
    );
    
    /* Dependances */
    refreshSliders();
}

/* Header auto-resize */
function refreshHeader() {
    /* Dependances */
    refreshBanner();
    refreshSubNavContentColumns();
}

/* Body auto-resize */
function refreshAll() {
    /* Dependances */
    refreshHeader();
    refreshBody();
}