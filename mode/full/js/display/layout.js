/* layout.js
 * ---------
 * Global layout display functions. */

/* Body auto-resize */
function refreshBody() {
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