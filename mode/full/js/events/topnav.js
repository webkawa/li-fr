/*  topnav.js
 *  ---------
 *  Top navigation related events. */

/* Sub navigation opening */
function eventOpenSubNav() {
    /* Switching mode */
    switchTopNavigation("opening");
    bindTopNavEvents();

    /* Launching */
    var subnav = $("div#topnav div.baseline div.subnav");
    $(subnav).stop();
    $(subnav).animate({
        opacity: 1,
        height: constants.subNavOpenBH
    }, cfget("topnav", "switchspeed"), "easeOutExpo", function() {
        switchTopNavigation("open");
        bindTopNavEvents();
    });
}

/* Sub navigation closing */
function eventCloseSubNav() {
    /* Switching mode */
    switchTopNavigation("closing");
    bindTopNavEvents();

    /* Launching */
    var subnav = $("div#topnav div.baseline div.subnav");
    $(subnav).stop();
    $(subnav).animate({
        opacity: 0,
        height: constants.subNavCloseBH
    }, cfget("topnav", "switchspeed"), "easeOutExpo", function() {
        switchTopNavigation("close");
        bindTopNavEvents();
    });
}

/* Configures top navigation events */
function bindTopNavEvents() {
    var buff;

    /* Initial unbind */
    $("div#topnav").find("*").unbind();

    /* Sub navigation opening */
    buff = "div#topnav.close div.baseline div.nav ul.links li," +
            "div#topnav.closing div.baseline div.nav ul.links li";
    $(buff).hover(eventOpenSubNav, jQuery.noop());

    /* Sub navigation closing */
    buff = "div#topnav.open div.baseline div.subnav," +
            "div#topnav.opening div.baseline div.subnav";
    $(buff).hover(jQuery.noop(), eventCloseSubNav);
}