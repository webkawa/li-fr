/* header.js
 * ---------
 * Body specific display functions. */

/* Editorial content scroll management
 * -----------------------------------
 *  s.editorial     > div#editorial
 *  s.content       > div#editorial div.content
 *  s.scrollbar     > div#editorial div.scrollzone div.scrollbar
 *  s.scroller      > div#editorial div.scrollzone div.scrollbar div.scroller */
function refreshEditorialContentScrollSelector() {
    var s = {
        editorial: $("div#editorial"),
        content: $("div#editorial div.content"),
        scrollbar: $("div#editorial div.scrollzone div.scrollbar"),
        scroller: $("div#editorial div.scrollzone div.scrollbar div.scroller")
    };
    return s;
}
function refreshEditorialContentScroll(s) {
    var editorialH = $(s.editorial).height();
    var contentOH = $(s.content).outerHeight(false);
    var contentMM = editorialH - contentOH;
    var scrollbarH = $(s.scrollbar).height();
    var scrollerOH = $(s.scroller).outerHeight(true);
    var scrollerT = parseInt($(s.scroller).css("top"));
    var scrollerMT = scrollbarH - scrollerOH;
    var ratio = scrollerT / scrollerMT;

    /* Positionning */
    $(s.content).css("margin-top", (contentMM * ratio) + "px");
}

/* Scroller position management
 * ----------------------------
 *  s.editorial     > div#editorial
 *  s.content       > div#editorial div.content
 *  s.scrollbar     > div#editorial div.scrollzone div.scrollbar
 *  s.scroller      > div#editorial div.scrollzone div.scrollbar div.scroller */
function refreshEditorialScrollPositionSelector() {
    var s = {
        editorial: $("div#editorial"),
        content: $("div#editorial div.content"),
        scrollbar: $("div#editorial div.scrollzone div.scrollbar"),
        scroller: $("div#editorial div.scrollzone div.scrollbar div.scroller")
    };
    return s;
}
function refreshEditorialScrollPosition(s) {
    var editorialH = $(s.editorial).height();
    var contentOH = $(s.content).outerHeight(false);
    var contentMM = editorialH - contentOH;
    var contentMT = parseInt($(s.content).css("margin-top"));
    var scrollbarH = $(s.scrollbar).height();
    var scrollerOH = $(s.scroller).outerHeight(true);
    var scrollerMT = scrollbarH - scrollerOH;
    var ratio = contentMT / contentMM;

    /* Positionning */
    $(s.scroller).css("top", (scrollerMT * ratio) + "px");
}

/* Editorial management
 * --------------------
 *  s.header        > div#header
 *  s.banner        > div#banner
 *  s.body          > div#body
 *  s.editorial     > div#editorial
 *  s.latnav        > div#latnav
 *  s.content       > div#editorial div.content
 *  s.scrollzone    > div#editorial div.content div.scrollzone
 *  s.scrollbar     > div#editorial div.content div.scrollzone div.scrollbar
 *  s.scroller      > div#editorial div.content div.scrollzone div.scrollbar div.scroller */
function refreshEditorial(s) {
    var bodyH = $(s.body).height();

    /* Preparing */
    $(s.content).removeClass("scrollable");

    /* Editorial height */
    $(s.editorial).height(bodyH);

    var editorialH = $(s.editorial).height();
    var contentOH = $(s.content).outerHeight(false);
    var contentM = -(parseInt($(s.content).css("margin-top")));
    var contentMM = contentOH - editorialH;

    /* Content positionning */
    if (contentOH > editorialH) {
        /* Initializing */
        $(s.content).addClass("scrollable");
        $(s.scrollzone).removeAttr("style");
        
        /* Margin depassement */
        if (contentM < 0) {
            $(s.content).css("margin-top", "0px");
        }
        if (contentM > contentMM) {
            $(s.content).css("margin-top", -contentMM + "px");
        }
        
        /* Showing scrollzone */
        $(s.scrollzone).realHeight(bodyH);
        $(s.scrollbar).realHeight($(s.scrollzone).height());

        /* Scroller */
        var div = Math.min($(s.editorial).height() / $(s.content).outerHeight(false), 1);
        $(s.scroller).realHeight($(s.scrollbar).height() * div);
        refreshEditorialScrollPosition(s);
    } else {
        /* Initializing */
        $(s.scrollzone).css("display", "none");
        
        /* Margin */
        $(s.content).css("margin-top", (editorialH - contentOH) / 2 + "px");
    }
    
    /* Left navigation */
    var navup = $(s.header).height() - 
                $(s.banner).outerHeight(false) + 
                parseInt($(s.banner).children("div").css("margin-bottom"));
    $(s.latnav).css({
       "top": -navup + "px",
       "padding-top": navup + "px" 
    });
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