/*  build.js
 *  --------
 *  Pure DOM manipulation functions. */

/* Top navigation mode switching */
function switchTopNavigation(mode) {
    var topnav = $("div#topnav");
    $(topnav).removeClass("open opening close closing");
    $(topnav).addClass(mode);
}
