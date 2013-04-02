/*  links.js
 *  --------
 *  Navigation links related events. */

/* Page switch */
function eventSwitchPage() {
    /* Closing sub navigation */
    var buff = "div#topnav.open div.baseline," +
            "div#topnav.opening div.baseline";
    $(buff).trigger("mouseleave");

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

        /* Launching */
        $("div#header").addClass("switching");
        $("div#header").animate({
            height: dh
        }, {
            duration: ds,
            easing: de,
            step: refreshHeader,
            complete: function() {
                $("div#header").removeAttr("style");
                $("div#header").removeClass("switching");
                switchPageDisposition(mode);
            }
        });
    }

    /* Switching body content */
    $("div#body > div").animate({
        opacity: 0
    }, {
        duration: cfgetint("body", "body_switchout_speed"),
        easing: cfget("body", "body_switchout_easing"),
        complete: function() {
            buildBody();
            $("div#body > div").animate({
                opacity: 1
            }, {
                duration: cfgetint("body", "body_switchin_speed"),
                easing: cfget("body", "body_switchin_easing"),
                step: refreshBody,
                complete: function() {
                    bindLinksEvents();
                }
            });
        }
    });
}

/* General links */
function eventClassicLink(target) {
    /* Switching user position */
    goto($(target).attr("href"));

    /* Switching page */
    eventSwitchPage();
}

/* Rubric links */
function eventRubricLink(target) {
    /* Switching user position */
    goto($(nav.tn).find("rubric#" + $(target).attr("href")).attr("target"));

    /* Switching page */
    eventSwitchPage();
}

/* Configure navigation links events */
function bindLinksEvents() {
    /* Initial unbind */
    $("a").unbind();

    /* Page change links */
    $("a[href]:not(.tnl1)").click(function(event) {
        event.preventDefault();
        eventClassicLink(this);
    });

    /* Rubric change links */
    $("a.tnl1[href]").click(function(event) {
        event.preventDefault();
        eventRubricLink(this);
    });
}