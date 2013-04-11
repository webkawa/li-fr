/*  editorial.js
 *  ------------
 *  Editorial-related events. */

/* Mouse scroll */
function eventTitleScroll(target) {
    console.log(target);
}
function eventMouseScroll(delta) {
    var gap = cfget("body", "editorial_scroller_distance");
    var multi = Math.pow(cfgetfloat("body", "editorial_scroller_multiplier"), gbl.msocc);
    var mmar = $("div#editorial div.content").outerHeight(false) - $("div#editorial").height();
    var dest = Math.max(Math.min(parseInt($("div#editorial div.content").css("margin-top")) + (multi * delta * gap), 0), -mmar);
    var slr = refreshEditorialScrollPositionSelector();

    /* Launching */
    switchStartEditorialScroll();
    $("div#editorial div.content").stop();
    $("div#editorial div.content").animate({
        "margin-top": dest + "px"
    }, {
        duration: cfgetint("body", "editorial_scroller_speed"),
        easing: cfget("body", "editorial_scroller_easing"),
        progress: function() {
            refreshEditorialScrollPosition(slr);
        },
        complete: function() {
            gbl.msocc = 0;
            switchEndEditorialScroll();
        }
    });
}

/* Configure editorial events */
function bindEditorialEvents() {
    var content = $("div#editorial div.content");
    var scroller = $("div#editorial div.scrollzone div.scrollbar div.scroller");
    var slr;

    /* Unbinding */
    $(content).unbind('mousewheel');

    /* Scroller events */
    $(scroller).draggable({
        start: function() {
            slr = refreshEditorialContentScrollSelector();
            switchStartEditorialScroll();
        },
        drag: function() {
            refreshEditorialContentScroll(slr);
        },
        stop: function() {
            switchEndEditorialScroll();
        }
    });

    $(content).mousewheel(function(event, delta) {
        if ($(content).hasClass("scrollable")) {
            if (cfgetint("body", "editorial_scroller_maxmulti") > gbl.msocc) {
                gbl.msocc++;
            };
            eventMouseScroll(delta);
        }
    });
}


