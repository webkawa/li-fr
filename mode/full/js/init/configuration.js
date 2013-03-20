/* configuration.js
 * ----------------
 * Loads the configuration file. */

var cfgreq = jQuery.ajax({
    type: "GET",
    dataType: "xml",
    url: "js/params.xml",
    async: false
});
var cfg = jQuery.parseXML(cfgreq.responseText);