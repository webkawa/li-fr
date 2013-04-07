/* header.js
 * ---------
 * Header specific display functions. */

/* Banner auto-resize
 * ------------------
 *  s.header            > div#header
 *  s.banner            > div#banner    */
function refreshBanner(s) {
    var headerIH = $(s.header).innerHeight();
    
    /* Resize */
    $(s.banner).realHeight(headerIH);
    $(s.banner).children("div").realHeight($(s.banner).innerHeight());
    
    /* Replace */
    $(s.banner).css(
            "top", 
            (headerIH - $(s.banner).outerHeight(true)) / 2 + "px"
    );
}

/* Sub navigation columns auto-resize
 * ----------------------------------
 *  s.subnavctcols      > div#topnav div.baseline div.subnav div.content div.column         */
function refreshSubNavContentColumns(s) {
    $(s.subnavctcols).realHeight(constants.subNavOpenH);
}