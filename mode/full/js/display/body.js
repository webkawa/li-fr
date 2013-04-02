/* header.js
 * ---------
 * Body specific display functions. */

/* Sliders management */
function refreshSliderBig() {
    var slider = $("div#body div.slider.big");
    var slides = $(slider).children("div.slide");
    var vheight = $(window).height() - $("div#header").outerHeight(true) - $("div#footer").outerHeight(true);
    var vwidth = $("div#body").width();
    
    /* Slider */
    $(slider).realHeight(vheight);
    $(slider).realWidth(vwidth * $(slides).length)
    
    /* Slides */
    $(slides).realHeight(vheight);
    $(slides).realWidth(vwidth);
    
    /* Containers */
    $(slides).each(function() {
        var ctr = $(this).children("div.container");
        $(ctr).css("margin-top", (($(this).height() - $(ctr).height()) / 2) + "px");
    });
}
function refreshSliders() {
    if ($("div#body div.slider.big").length > 0) {
        refreshSliderBig();
    }
}