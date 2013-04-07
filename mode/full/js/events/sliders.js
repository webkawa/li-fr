/*  sliders.js
 *  ----------
 *  Slider related animations */

/* Slide switching */
function eventSwitchSlideBig(target) {
    var snav = $("div#bigslidernav");
    var sload = $(snav).children("div.loader");
    var sloadbg = $(sload).children("div.down");
    var slider = $("div#bigslider");
    var slides = $(slider).children("div.slide");
    var swidth = $(slides).filter(":first").outerWidth(true);
    var dir = $(target).attr("href") === "next";
    var dest = parseInt($(slider).css("left")) + (dir ? -swidth : swidth);

    /* Adding classes */
    switchStartBigSlider();

    /* Binding */
    bindLinksEvents();

    /* Restarting loader */
    $(sloadbg).stop();
    $(sloadbg).animate({
        width: "0%"
    }, {
        duration: cfgetint("body", "bigslider_switch_speed"),
        easing: cfget("body", "bigslider_switch_easing")
    });

    /* Launching */
    $(slider).animate({
        left: dest + "px"
    }, {
        duration: cfgetint("body", "bigslider_switch_speed"),
        easing: cfget("body", "bigslider_switch_easing"),
        complete: function() {
            switchEndBigSlider(dir);
            bindLinksEvents();
            $(sload).trigger("restart");
        }
    });
}
function eventSwitchSlide(target) {
    /* Big slider */
    if ($(target).parents("div#bigslidernav").is(":not(.switching)")) {
        eventSwitchSlideBig(target);
    }
}

/* Configure sliders events */
function bindSliderEvents() {
    /* Big sliders */
    if (ppget("type") === "bigslider") {
        /* Loader */
        var snav = $("div#bigslidernav");
        var snavli = $(snav).find("ul li");
        var sload = $(snav).children("div.loader");
        var sloadbg = $(sload).children("div.down");

        /* Launching */
        $(sload).unbind('restart');
        $(sload).on('restart', function() {
            $(sloadbg).animate({
                width: "100%"
            }, {
                duration: cfgetint("body", "bigslider_autochange_speed"),
                easing: cfget("body", "bigslider_autochange_easing"),
                complete: function() {
                    cfgetbool("body", "bigslider_autochange_direction") ?
                            $(snavli).children('a.sn[href="next"]').trigger("click") :
                            $(snavli).children('a.sn[href="back"]').trigger("click");
                }
            });
        });
        $(sload).trigger('restart');
    }
}