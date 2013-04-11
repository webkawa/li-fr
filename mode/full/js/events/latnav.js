/*  latnav.js
 *  ---------
 *  Lateral navigation related events. */

/* Sub navigation management */
function eventOpenLateralNavigationSL(target) {
    var dest = parseInt($(target).css("max-height"));
    
    /* Switching classes */
    switchLateralNavigationSL(target, "opening");
    bindLateralNavigationEvents();
    
    /* Launching */
    $(target).css("height", "0px");
    $(target).animate({
        "height": dest + 'px'
    }, {
        duration: cfgetint("latnav", "sublist_open_speed"),
        easing: cfget("latnav", "sublist_open_easing"),
        complete: function () {
            switchLateralNavigationSL(target, "open");
            bindLateralNavigationEvents();
        }
    });
}
function eventCloseLateralNavigationSL(target) {
    /* Switching classes */
    switchLateralNavigationSL(target, "closing");
    bindLateralNavigationEvents();
    
    /* Launching */
    $(target).stop();
    $(target).css("height", $(target).height());
    $(target).animate({
        "height": "0px"
    }, {
        duration: cfgetint("latnav", "sublist_close_speed"),
        easing: cfget("latnav", "sublist_close_easing"),
        complete: function () {
            switchLateralNavigationSL(target, "close");
            bindLateralNavigationEvents();
        }
    });
}
function eventClickLateralNavigation(target) {
    if ($("div#editorial div.content").is(".scrollable")) {
        var slr = refreshEditorialScrollPositionSelector();
        var deptarget = $("#" + $(target).attr("href"));
        var dtOS = $(deptarget).offset().top - parseInt($(deptarget).css("margin-top"));
        var edOS = $("div#editorial").offset().top;
        var afOS = edOS - dtOS;
        var mmar = $("div#editorial").height() - $("div#editorial div.content").outerHeight(false);
        var dest = parseInt($("div#editorial div.content").css("margin-top")) + afOS;

        /* Launching */
        $("div#editorial div.content").stop();
        $("div#editorial div.content").animate({
            "margin-top": Math.max(dest, mmar) + "px"
        }, {
            duration: cfgetint("latnav", "sublist_scroll_speed"),
            easing: cfget("latnav", "sublist_scroll_easing"),
            progress: function() {
                refreshEditorialScrollPosition(slr);
            }
        });
    }
}

/* Configure lateral navigation events */
function bindLateralNavigationEvents() {
    /* Initial unbind */
    $("div#latnav").find("*").unbind();
    
    /* Sub lists manipulation */
    $("div#latnav div.plan > ul > li").has("ul.close").mouseenter(function() {
        eventOpenLateralNavigationSL($(this).children("ul.close"));
    });
    $("div#latnav div.plan > ul > li").has("ul.open, ul.opening").mouseleave(function() {
        eventCloseLateralNavigationSL($(this).children("ul.open, ul.opening"));
    });
    $("div#latnav div.plan > ul > li > ul > li").click(function(event) {
        event.stopPropagation();
        $(this).children("a.ln").trigger("click");
    });
    $("div#latnav div.plan > ul > li").click(function(event) {
        $(this).children("a.ln").trigger("click");
    });
    
    /* Dependances */
    bindLinksEvents();
}