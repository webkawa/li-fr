/* header.js
 * ---------
 * Body specific display functions. */

/* Editorial management
 * --------------------
 *  s.body          > div#body
 *  s.editorial     > div#editorial
 *  s.content       > div#editorial div.content
 *  s.scrollzone    > div#editorial div.content div.scrollzone
 *  s.scrollbar     > div#editorial div.content div.scrollzone div.scrollbar
 *  s.scroller      > div#editorial div.content div.scrollzone div.scrollbar div.scroller */
function refreshEditorial(s) {
    var bodyH = $(s.body).height();
    
    /* Content */
    $(s.editorial).height(bodyH);
    
    /* Scroll zone and bar */
    $(s.scrollzone).realHeight(bodyH);
    $(s.scrollbar).realHeight($(s.scrollzone).height());
    
    /* Scroller */
    var div = Math.min($(s.editorial).height() / $(s.content).outerHeight(false), 1);
    $(s.scroller).realHeight($(s.scrollbar).height() * div);
}

/* Sliders management
 * ------------------
 *  s.header            > div#header
 *  s.body              > div#body
 *  s.bigsl             > div#bigslider
 *  s.bigslslides       > div#bigslider div.slides
 *  s.bigslsslide       > div#bigslider div.slides.selected
 *  s.footer            > div#footer                                    */
function refreshSliderBig(s) {
    var vheight = $(window).height() - $(s.header).outerHeight(true) - $(s.footer).outerHeight(true);
    var vwidth = $(s.body).width();
    
    /* Slider */
    $(s.bigsl).realHeight(vheight);
    $(s.bigsl).realWidth(vwidth * $(s.bigslslides).length);
    
    /* Slides */
    $(s.bigslslides).realHeight(vheight);
    $(s.bigslslides).realWidth(vwidth);
    
    /* Disposition */
    $(s.bigsl).css("left", -($(s.bigslsslide).prevAll().length * $(s.bigslslides).first().outerWidth(true)) + "px");
    
    /* Dependances */
    $(s.bigslslides).each(function() {
        var ctr = $(this).children("div.container");
        $(ctr).css("margin-top", (($(this).height() - $(ctr).height()) / 2) + "px");
    });
}

/* Global sliders refresh
 * ----------------------
 *  s.header            > div#header
 *  s.body              > div#body
 *  s.bigsl             > div#bigslider
 *  s.bigslslides       > div#bigslider div.slides
 *  s.bigslsslide       > div#bigslider div.slides.selected
 *  s.footer            > div#footer                                */
function refreshSliders(s) {
    if (ppget("type") === "bigslider") {
        refreshSliderBig(s);
    }
}