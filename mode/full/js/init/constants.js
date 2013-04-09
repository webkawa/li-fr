/* constants.js
 * ------------
 * Executes and memorize a list of tests relative to the CSS constants. */

/* Global vars */
var gbl = {
    msocc: 0
}

/* Constants definition */
var constants;
$(document).ready(function() {
    /* Open header */
    var bak = $("body").attr("class");
    switchPageDisposition("panoramic");
    var headerPanoramicH = $("div#header").height();
    switchPageDisposition("normal");
    var headerNormalH = $("div#header").height();
    switchPageDisposition(bak);
    
    /* Open sub-navigation */
    switchTopNavigation("open");
    var subNavOpenH = $("div#topnav div.subnav").height();
    var subNavOpenOpacity = $("div#topnav div.subnav").css("opacity");
    switchTopNavigation("close");
    
    /* Attribution */
    constants = {
        headerNormalH       :   headerNormalH,
        headerPanoramicH    :   headerPanoramicH,
        topNavFS            :   parseInt($("div#topnav div.baseline div.nav ul.links").css("font-size")),
        subNavCloseH        :   $("div#topnav div.subnav").height(),
        subNavCloseOpacity  :   $("div#topnav div.subnav").css("opacity"),
        subNavOpenH         :   subNavOpenH,
        subNavOpenOpacity   :   subNavOpenOpacity,
        skinsKW             :   cfget("options", "skins_keyword"),
        scrollUp            :   0
    };
});