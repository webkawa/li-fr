/* layout.js
 * ---------
 * Global layout display functions. */

/* Banner auto-resize */
function refreshBanner() {
    /* Resize */
    $("div#banner").height($("div#header").height());
    
    /* Replace */
    $("div#banner").css(
            "top", 
            ($("div#header").height() - $("div#banner").height()) / 2 + "px"
    );
}

/* Body auto-resize */
function refreshBody () {
    /* Resize */
    $("div#body").height(
            $(window).height() - 
            $("div#header").height() - 
            $("div#footer").height()   
    );
    
    /* Dependances */
    refreshBanner();
}