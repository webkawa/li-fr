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
    }, {
        duration: opening ? 0 : cfgetint("topnav", "subnav_switchout_speed"),
        easing: cfget("topnav", "subnav_switchout_easing"), 
        complete:  function() {
            buildSubNavigation($(target).children("a:first").attr("href"));
        }
    }).animate({
        opacity: 1
    }, {
        duration: cfgetint("topnav", "subnav_switchin_speed"),
        easing: cfget("topnav", "subnav_switchin_easing"),
        complete: function() {
            switchEndSubNavigation();
            bindTopNavEvents();
        }
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
    }, {
        duration: cfgetint("topnav", "subnav_open_speed"),
        easing: cfget("topnav", "subnav_open_easing"), 
        complete: function() {
            switchTopNavigation("open");
            bindTopNavEvents();
        }
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
    }, {
        duration: cfgetint("topnav", "subnav_close_speed"), 
        easing: cfget("topnav", "subnav_close_easing"), 
        complete: function() {
            switchTopNavigation("close");
            emptySubNavigationContent();
            bindTopNavEvents();
        }
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
    
    /* Sub navigation click */
    buff = "div#topnav div.baseline div.nav ul.links li";
    $(buff).click(function() {
        $(this).children("a").trigger("click");
    });
    
    /* Dependances */
    bindLinksEvents();
}