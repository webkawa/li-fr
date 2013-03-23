/* constants.js
 * ------------
 * Executes and memorize a list of tests relative to the CSS constants. */

var constants;

/* Todo : tests */
$(document).ready(function() {
    constants = {
        bodyMinHeight   :   parseInt($("div#body").css("min-height"))
    };
});