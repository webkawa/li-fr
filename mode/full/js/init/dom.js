/*  dom.js
 *  ------
 *  Initial data loading & DOM manipulations. */

/* Top navigation loader */
function initLoadTopNav() {
    var buff;
    $(smap).find("l1").each(function () {
        buff =  '<li>' +
                $(this).find("title").text() +
                '</li>';
        $("div#topnav div.baseline div.nav ul.links").append(buff);
    });
    adjustFS($("div#topnav div.baseline div.nav ul.links"), $("div#topnav div.baseline div.nav"));
}

/* Banner */
function initLoadBanner() {
    var buff =  '<div class="' +
                navclass() +
                ' selected"></div>';
    $("div#banner").append(buff);
}