/*  topnav.js
 *  ---------
 *  Top navigation related events. */

/* Sub navigation switching */
function eventSwitchSubNav(target) {
    /* Switching mode */
    switchStartSubNavigation(target);
    bindTopNavEvents();
    
    /* Opening indicator */
    var opening = ($("div#topnav").hasClass("opening"));
    
    /* Launching */
    var subnavct = $("div#topnav div.baseline div.subnav div.content");
    $(subnavct).animate({
        opacity: 0
    }, opening ? 0 : cfgetint("topnav", "subnav_switchout_speed"), "linear", function() {
        buildSubNavigation($(target).children("a:first").attr("href"));
    }).animate({
        opacity: 1
    }, cfgetint("topnav", "subnav_switchin_speed"), "linear", function() {
        switchEndSubNavigation();
        bindTopNavEvents();
    });
}

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
        height: constants.subNavOpenH
    }, cfgetint("topnav", "subnav_open_speed"), "easeOutExpo", function() {
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
        height: constants.subNavCloseH
    }, cfgetint("topnav", "subnav_close_speed"), "easeOutExpo", function() {
        switchTopNavigation("close");
        emptySubNavigationContent();
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
    $(buff).mouseenter(eventOpenSubNav);

    /* Sub navigation closing */
    buff = "div#topnav.open div.baseline," +
            "div#topnav.opening div.baseline";
    $(buff).mouseleave(eventCloseSubNav);
    
    /* Sub navigation switching */
    buff = "div#topnav:not(.switching) div.baseline div.nav ul.links li:not(.selected)";
    $(buff).mouseenter(function() {
        eventSwitchSubNav(this);
    });
}