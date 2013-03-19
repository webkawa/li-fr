/* dev.js
 * ------
 * Development JS tools. */

/* Header size setter */
function setHeaderHeight(i) {
    $("div#header").height(i);
    refreshBody();
}
