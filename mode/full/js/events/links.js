/*  links.js
 *  --------
 *  Navigation links related events. */

/* General links */
function eventBaseLink(target) {
    /* Switching user position */
    goto($(target).attr("href"));
    
    /* Switching page disposition */
    var mode = $(page()).children("mode").text();
    if (mode !== $("body").attr("class")) {
        /* Getting move vars */
        var dh, ds, de;
        if (mode === "normal") {
            dh = constants.headerNormalH;
            ds = cfgetint("page", "page_tonormal_speed");
            de = cfget("page", "page_tonormal_easing");
        } else {
            dh = constants.headerPanoramicH;
            ds = cfgetint("page", "page_topanoramic_speed");
            de = cfget("page", "page_topanoramic_easing");
        }
        
        /* Closing sub navigation */
        var buff =  "div#topnav.open div.baseline," +
                    "div#topnav.opening div.baseline";
        $(buff).trigger("mouseleave");
        
        /* Launching */
        $("div#header").addClass("switching");
        $("div#header").animate({
            height: dh
        }, {
            duration: ds,
            easing: de,
            step: function(now, fx) {
                refreshAll();
            },
            complete: function() {
                $("div#header").removeAttr("style");
                $("div#header").removeClass("switching");
                switchPageDisposition(mode);
            }
        });
    }
}

/* Configure navigation links events */
function bindLinksEvents() {
    /* Initial unbind */
    $("a").unbind();
    
    /* Page change links */
    $("a[href]:not(.lktmp)").click(function(event) {
        event.preventDefault();
        eventBaseLink(this);
    });
}