/*  dom.js
 *  ------
 *  Initial data loading & DOM manipulations. */

/* Layout */
function initLayout() {
    switchPageDisposition($(page()).find("mode").text());
}

/* Top navigation loader */
function initLoadTopNav() {
    /* Cosmetic */
    $("div#topnav div.baseline div.subnav").css("opacity", 0);
    
    /* Links */
    var buff;
    $(nav.tn).find("nav topnav rubric").each(function () {
        buff =  '<li>' +
                '<a href="' + $(this).attr("id") + '" class="tnl1">' +
                $(this).attr("text") +
                '</a>' +
                '</li>';
        $("div#topnav div.baseline div.nav ul.links").append(buff);
    });
    adjustFS($("div#topnav div.baseline div.nav ul.links"), $("div#topnav div.baseline div.nav"));
}

/* Banner */
function initLoadBanner() {
    var buff =  '<div class="' +
                navClass() +
                ' selected"></div>';
    $("div#banner").append(buff);
}

/* Page content */
function initBody() {
    /* Load data */
    buildBody();
    
    /* Remove initial hiding */
    $("div#body > div").removeAttr("style");
}