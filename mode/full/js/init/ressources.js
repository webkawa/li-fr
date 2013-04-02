/* ressources.js
 * -------------
 * Loads the configuration & sitemap files. */

/* Configuration loading */
var cfgreq = jQuery.ajax({
    type: "GET",
    dataType: "xml",
    url: "js/params.xml",
    async: false,
    cache: cfgetbool("options", "cache")
});
var cfg = jQuery.parseXML(cfgreq.responseText);

/* Sitemap loading */
var smapreq = jQuery.ajax({
    type: "GET",
    dataType: "xml",
    url: "../../data/sitemap.xml",
    async: false,
    cache: cfgetbool("options", "cache")
});
var smap = jQuery.parseXML(smapreq.responseText);