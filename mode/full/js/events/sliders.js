/*  sliders.js
 *  ----------
 *  Slider related animations */

/* Slide switching */
function eventSwitchSlideBig(target) {
    var slider = $("div#body div.slider.big");
    var slides = $(slider).children("div.slide");
    var swidth = $(slides).filter(":first").outerWidth(true);
    var dir = $(target).attr("href") === "next";
    var dest = parseInt($(slider).css("left")) + (dir ? -swidth : swidth);

    /* Adding classes */
    switchStartBigSlider();

    /* Binding */
    bindLinksEvents();

    /* Launching */
    $(slider).animate({
        left: dest + "px"
    }, {
        duration: cfgetint("body", "bigslider_switch_speed"),
        easing: cfget("body", "bigslider_switch_easing"),
        complete: function() {
            switchEndBigSlider(dir);
            bindLinksEvents();
        }
    });
}
function eventSwitchSlide(target) {
    /* Big slider */
    if ($(target).parents("div.slidernav:not(.switching)").hasClass("big")) {
        eventSwitchSlideBig(target);
    }
}