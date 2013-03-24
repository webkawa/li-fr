/* layout.js
 * ---------
 * Global layout display functions. */

/* Header auto-resize */
function refreshHeader() {
    /* Dependances */
    refreshBanner();
}

/* Body auto-resize */
function refreshBody () {
    /* Resize */
    $("div#body").height(
            $(window).innerHeight() - 
            $("div#header").outerHeight(true) - 
            $("div#footer").outerHeight(true)   
    );
    
    /* Dependances */
    refreshHeader();
}