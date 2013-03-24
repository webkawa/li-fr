/* header.js
 * ---------
 * Header specific display functions. */

/* Banner auto-resize */
function refreshBanner() {
    var headerIH = $("div#header").innerHeight();
    
    /* Resize */
    $("div#banner").height(headerIH);
    $("div#banner div").height($("div#banner").innerHeight());
    $("div#banner div").width($("div#banner").innerWidth());
    
    /* Replace */
    $("div#banner").css(
            "top", 
            (headerIH - $("div#banner").outerHeight(true)) / 2 + "px"
    );
}