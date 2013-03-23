/* dev.js
 * ------
 * Development JS tools. */

/* Header size setter */
function setHeaderHeight(i) {
    $("div#header").height(i);
    refreshBody();
}

/* Page mode switcher */
function switchPageDisposition() {
    if ($("body").hasClass("standard")) {
        $("body").removeClass("standard");
        $("body").addClass("homepage");
    } else {
        $("body").removeClass("homepage");
        $("body").addClass("standard");
    }
    refreshBody();
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
    refreshHeader();
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