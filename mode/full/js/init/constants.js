/* constants.js
 * ------------
 * Executes and memorize a list of tests relative to the CSS constants. */

var constants;
$(document).ready(function() {
    constants = {
        bodyMinHeight   :   parseInt($("div#body").css("min-height")),
        topNavFS        :   parseInt($("div#topnav div.baseline div.nav ul.links").css("font-size"))
    };
});