/* dev.js
 * ------
 * Development JS tools. */

/* Header size setter */
function setHeaderHeight(i) {
    $("div#header").height(i);
    refreshAll(refreshAllSelector());
}

/* Page mode switcher */
function switchPageDispo() {
    if ($("body").hasClass("normal")) {
        $("body").removeClass("normal");
        $("body").addClass("panoramic");
    } else {
        $("body").removeClass("panoramic");
        $("body").addClass("normal");
    }
    refreshAll(refreshAllSelector());
}

/* Nav mode switcher */
function switchNavDisposition() {
    if ($("div#topnav").hasClass("open")) {
        $("div#topnav").removeClass("open");
        $("div#topnav").addClass("close");
    } else {
        $("div#topnav").removeClass("close");
        $("div#topnav").addClass("open");
    }
    refreshHeader(refreshHeaderSelector());
}

/* Social tools mode switcher */
function switchSocialDisposition() {
    if ($("div#body div.social").hasClass("open")) {
        $("div#body div.social").removeClass("open");
        $("div#body div.social").addClass("close");
    } else {
        $("div#body div.social").removeClass("close");
        $("div#body div.social").addClass("open");
    }
}