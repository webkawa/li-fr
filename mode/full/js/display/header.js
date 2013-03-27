/* header.js
 * ---------
 * Header specific display functions. */

/* Banner auto-resize */
function refreshBanner() {
    var headerIH = $("div#header").innerHeight();
    
    /* Resize */
    $("div#banner").realHeight(headerIH);
    $("div#banner div").realHeight($("div#banner").innerHeight());
    $("div#banner div").width($("div#banner").innerWidth());
    
    /* Replace */
    $("div#banner").css(
            "top", 
            (headerIH - $("div#banner").outerHeight(true)) / 2 + "px"
    );
}

/* Sub navigation columns auto-resize */
function refreshSubNavContentColumns() {
    $("div#topnav div.baseline div.subnav div.content div.column").realHeight(constants.subNavOpenH);
}