/* header.js
 * ---------
 * Header specific display functions. */

/* Banner auto-resize */
function refreshBanner() {
    var banner = $("div#banner");
    var headerIH = $("div#header").innerHeight();
    
    /* Resize */
    $(banner).realHeight(headerIH);
    $(banner).children("div").realHeight($("div#banner").innerHeight());
    
    /* Replace */
    $(banner).css(
            "top", 
            (headerIH - $(banner).outerHeight(true)) / 2 + "px"
    );
}

/* Sub navigation columns auto-resize */
function refreshSubNavContentColumns() {
    $("div#topnav div.baseline div.subnav div.content div.column").realHeight(constants.subNavOpenH);
}