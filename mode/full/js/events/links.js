/*  links.js
 *  --------
 *  Navigation links related events. */

/* Page switch */
function eventSwitchPage() {
    if (!$("div#body").hasClass("switching")) {
        /* Closing sub navigation */
        var buff =  "div#topnav.open div.baseline," +
                    "div#topnav.opening div.baseline";
        $(buff).trigger("mouseleave");

        /* Switching page disposition */
        var mode = ppget("mode");
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
            var slr = refreshHeaderSelector();
            $("div#header").addClass("switching");
            $("div#header").animate({
                height: dh
            }, {
                duration: ds,
                easing: de,
                progress: function() {
                    refreshHeader(slr);
                },
                complete: function() {
                    $("div#header").removeAttr("style");
                    $("div#header").removeClass("switching");
                    switchPageDisposition(mode);
                }
            });
        }

        /* Switching banner */
        if (getskinfor(nav.pre[nav.pre.length - 1]) !== getskin()) {
            switchStartBanner();
            refreshHeader(refreshHeaderSelector());
            var url = 
                $("div#banner div.down").css("background-image")
                    .replace('url(', '')
                    .replace(')', '')
                    .replace(/"/g, '');
            $('<img/>').attr("src", url).load(function() {
                $("div#banner div.up").animate({
                    opacity: 0
                }, {
                    duration: cfgetint("header", "banner_switch_speed"),
                    easing: cfget("header", "banner_switch_easing"),
                    complete: function() {
                        switchEndBanner();
                    }
                });
            });
        }

        /* Switching body content */
        switchBody();
        $("div#body").animate({
            opacity: 0
        }, {
            duration: cfgetint("body", "body_switchout_speed"),
            easing: cfget("body", "body_switchout_easing"),
            complete: function() {
                buildBody();
                buildSkins();

                var slr = refreshBodySelector();
                $("div#body").animate({
                    opacity: 1
                }, {
                    duration: cfgetint("body", "body_switchin_speed"),
                    easing: cfget("body", "body_switchin_easing"),
                    progress: function() {
                        refreshBody(slr);
                    },
                    complete: function() {
                        switchBody();
                        bindLinksEvents();
                        bindSliderEvents();
                        bindEditorialEvents();
                        bindLateralNavigationEvents();
                    }
                });
            }
        });
    }
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
    $("a[href]:not(.tnl1, .sn, .ln, .print, .fs)").click(function(event) {
        event.preventDefault();
        eventClassicLink(this);
    });

    /* Rubric change links */
    $("a.tnl1[href]").click(function(event) {
        event.stopPropagation();
        event.preventDefault();
        eventRubricLink($(this));
    });

    /* Slider navigation links */
    $("a.sn[href]").click(function(event) {
        event.preventDefault();
        eventSwitchSlide(this);
    });
    
    /* Lateral navigation links */
    $("a.ln[href]").click(function(event) {
        event.preventDefault();
        event.stopPropagation();
        eventClickLateralNavigation(this);
    });
}