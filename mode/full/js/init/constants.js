/* constants.js
 * ------------
 * Executes and memorize a list of tests relative to the CSS constants. */

/* Constants definition */
var constants;
$(document).ready(function() {
    /* Open sub-navigation */
    switchTopNavigation("open");
    var subNavOpenBH = parseInt($("div#topnav div.subnav").css("height"));
    var subNavOpenOpacity = $("div#topnav div.subnav").css("opacity");
    switchTopNavigation("close");
    
    /* Attribution */
    constants = {
        bodyMinHeight       :   parseInt($("div#body").css("min-height")),
        topNavFS            :   parseInt($("div#topnav div.baseline div.nav ul.links").css("font-size")),
        subNavCloseBH       :   parseInt($("div#topnav div.subnav").css("height")),
        subNavCloseOpacity  :   $("div#topnav div.subnav").css("opacity"),
        subNavOpenBH        :   subNavOpenBH,
        subNavOpenOpacity   :   subNavOpenOpacity
    };
});