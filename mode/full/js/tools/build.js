/*  build.js
 *  --------
 *  Pure DOM manipulation functions. */

/* Page switching */
function switchPageDisposition(mode) {
    $("body").removeClass("panoramic normal");
    $("body").addClass(mode);
}

/* Header switching */
function switchStartBanner() {
    var kw = cfget("options", "skins_keyword");
    $("div#banner div").addClass("up").css("opacity", "1");
    $("div#banner").append('<div class="down ' + kw + '"></div>');
    buildSkinsWith($("div#banner"), getskin());
}
function switchEndBanner() {
    $("div#banner div.up").remove();
    $("div#banner div.down").removeClass("down");
}

/* Top navigation mode switching */
function switchTopNavigation(mode) {
    /* General action */
    var topnav = $("div#topnav");
    $(topnav).removeClass("open opening close closing");
    $(topnav).addClass(mode);

    /* Specific action */
    if (mode === "closing") {
        $("div#topnav div.baseline div.nav ul.links li").removeClass("selected");
    } else if (mode === "close" || mode === "open") {
        $("div#topnav").removeAttr("style");
    }
}

/* Sub navigation mode switching */
function switchStartSubNavigation(target) {
    var links = $("div#topnav div.baseline div.nav ul.links li");
    $(links).removeClass("selected");
    $(target).addClass("selected");

    $("div#topnav").addClass("switching");
}
function switchEndSubNavigation() {
    $("div#topnav").removeClass("switching");
}

/* Sub navigation hidder */
function emptySubNavigationContent() {
    $("div#topnav div.baseline div.subnav div.content").children("div.column").empty();
}

/* Sub navigation build */
function buildSubNavigationColumn(target, data) {
    $(data).children().each(function() {
        var buff;
        if ($(this).is("h1")) {
            buff = '<p class="h1"><a href="' +
                    $(this).attr("target") +
                    '">' +
                    $(this).text() +
                    '</a></p>';
        } else if ($(this).is("h2")) {
            buff = '<p class="h2"><a class="h2" href="' +
                    $(this).attr("target") +
                    '">' +
                    $(this).text() +
                    '</a></p>';
        }
        $(target).append(buff);
    });
}
function buildSubNavigation(id) {
    var subnavct = $("div#topnav div.baseline div.subnav div.content");
    var data = $(nav.tn).find("nav topnav rubric#" + id);

    /* Cleaning */
    $(subnavct).children("div.column").empty();

    /* Building */
    buildSubNavigationColumn($(subnavct).children("div.column.left"), $(data).find('column[position="left"]'));
    buildSubNavigationColumn($(subnavct).children("div.column.center"), $(data).find('column[position="center"]'));
    buildSubNavigationColumn($(subnavct).children("div.column.right"), $(data).find('column[position="right"]'));
}

/* Lateral navigation sublists switch */
function switchLateralNavigationSL(target, mode) {
    $(target).removeClass("close closing open opening");
    $(target).addClass(mode);
}

/* Editorial build */
function switchStartEditorialScroll() {
    $("div#editorial div.scrollzone div.scrollbar").addClass("scrolling");
}
function switchEndEditorialScroll() {
    $("div#editorial div.scrollzone div.scrollbar").removeClass("scrolling");
}
function buildEditorial() {
    if (ppget("type") === "editorial") {
        /* Content zone */
        var buff = $("div#editorial").children().clone();
        $("div#editorial").empty();
        $("div#editorial").append('<div class="content" style="margin-top: 0px"></div>');
        $("div#editorial div.content").append(buff);

        /* Scroller */
        if (ppget("scroll") === "classic") {
            /* Scroll tools */
            buff = '<div class="scrollzone">' +
                        '<div class="scrollbar">' +
                            '<div class="scroller" style="top: 0px"></div>' +
                        '</div>' +
                   '</div>';
            $("div#editorial").append(buff);
            
            /* Activate scroll */
            $("div#editorial div.scrollzone div.scrollbar div.scroller").draggable({
                containment: "div#editorial div.scrollzone div.scrollbar",
                axis: "y"
            });
        }
        
        /* Lateral navigation */
        var prebuff =   $(smap).find("#" + nav.idp).prev("page, index").length > 0 ?
                            $(smap).find("#" + nav.idp).prev("page, index").attr("id") :
                            $(smap).find("#" + nav.idp).parent().attr("id");
        var nextbuff =  $(smap).find("#" + nav.idp).next("page, index").length > 0 ?
                            $(smap).find("#" + nav.idp).next("page, index").attr("id") :
                            $(smap).find("#" + nav.idp).parent().attr("id");
                    
        if (ppget("nav") === "classic") {
            /* Base */
            buff =  '<div id="latnav">' +
                        '<div class="tools">' +
                            '<div class="left">' +
                                '<a class="print" href="print">IMP</a>' +
                            '</div>' +
                            '<div class="right">' +
                                '<a class="fs" href="small">--</a>' +
                                '<a class="fs" href="big">++</a>' +
                            '</div>' +
                        '</div>' +
                        '<div class="plan">' +
                            '<ul></ul>' +
                        '</div>' +
                        '<div class="links">' +
                            '<div class="left">' +
                                '<a href="' + prebuff + '">BACK</a>' +
                            '</div>' +
                            '<div class="right">' +
                                '<a href="' + nextbuff + '">NEXT</a>' +
                            '</div>' +
                        '</div>' +
                    '</div>';
            
            $("div#editorial").append(buff);
            $("div#editorial div.content").addClass("navigable");
            
            /* Lateral links */
            var idx = 0;
            $("div#editorial").find("h1").each(function (index, valueh1) {
                $(valueh1).attr("id", "ln" + idx);
                buff =  '<li>' +
                            '<a class="ln" href="ln' + idx + '">' +
                                $(valueh1).text() +
                            '</a>' +
                        '</li>';
                $("div#latnav div.plan > ul").append(buff);
                idx++;

                if ($(valueh1).nextUntil("h1", "h2").length > 0) {
                    $("div#latnav div.plan > ul > li:last").append('<ul></ul>');
                    
                    $(valueh1).nextUntil("h1", "h2").each(function(index, valueh2) {
                        $(valueh2).attr("id", "ln" + idx);
                        buff =  '<li>' +
                                    '<a class="ln" href="ln' + idx + '">' +
                                        $(valueh2).text() +
                                    '</a>' +
                                '</li>';
                        $("div#latnav div.plan > ul > li:last > ul").append(buff);
                        idx++;
                    });
                    
                    $("div#latnav div.plan > ul > li:last > ul").css("max-height", $("div#latnav div.plan > ul > li:last > ul").height());
                    $("div#latnav div.plan > ul > li:last > ul").addClass("close");
                }
            });
        }
    }
}

/* Sliders build */
function switchStartBigSlider() {
    /* Adding classes */
    $("div#bigslider").addClass("switching");
    $("div#bigslidernav").addClass("switching");
}
function switchEndBigSlider(dir) {
    var slider = $("div#bigslider");
    var snav = $("div#bigslidernav");
    var sslide = $(slider).children("div.slide.selected");
    var rp = false;
    var rpt, rptl;

    /* Removing switch info */
    $(slider).removeClass("switching");
    $(snav).removeClass("switching");

    /* Moving select */
    dir ?
            $("div#bigslider div.slide.selected").next().addClass("selected") :
            $("div#bigslider div.slide.selected").prev().addClass("selected");
    $(sslide).removeClass("selected");

    /* Replacing if needed */
    if ($("div#bigslider div.slide:first").hasClass("selected")) {
        rp = true;
        rpt = $("div#bigslider div.slide:last").prev();
        rptl = -($("div#bigslider div.slide").length - 2) * $(rpt).outerWidth(true);
    }
    if ($("div#bigslider div.slide:last").hasClass("selected")) {
        rp = true;
        rpt = $("div#bigslider div.slide:first").next();
        rptl = -($(rpt).outerWidth(true));
    }
    if (rp) {
        $("div#bigslider div.slide.selected").removeClass("selected");
        $(rpt).addClass("selected");
        $("div#bigslider").css("left", rptl + "px");
    }

    /* Updating navigation */
    $("div#bigslidernav ul li.selected").removeClass("selected");
    $("div#bigslidernav ul li:eq(" + $(slider).children("div.slide.selected").index() + ")").addClass("selected");
}
function buildSliders() {
    /* Big slider */
    if (ppget("type") === "bigslider") {
        var slider = $("div#bigslider");
        var slides = $(slider).children("div.slide");
        var ct, ctl, ctf, unav;
        var kw = cfget("options", "skins_keyword");

        /* Individual treatments */
        $(slides).each(function() {
            /* Injecting container */
            ct = $(this).clone();
            $(this).empty();
            $(this).append(ct);
            $(this).children("div:first").removeAttr("class").addClass("container");
        });

        /* Border slides treatments */
        ctl = $(slides).last().clone();
        ctf = $(slides).first().clone();
        $(slider).prepend(ctl);
        $(slider).append(ctf);

        /* Navigation add */
        $("div#body").append(
                '<div id="bigslidernav" class="' + kw + '">' +
                '<ul></ul>' +
                '<div class="loader">' +
                '<div class="up"></div>' +
                '<div class="down" style="width: 0%"></div>' +
                '</div>' +
                '</div>');

        unav = $("div#bigslidernav ul");
        $(slides).each(function(idx) {
            $(unav).append('<li>' + idx + '</li>');
        });
        $(unav).prepend('<li><a class="sn" href="back">BACK</a></li>');
        $(unav).append('<li><a class="sn" href="next">NEXT</a></li>');

        /* Loader add */

        /* Initial selection */
        $(slides).first().addClass("selected");
        $(unav).children("li:eq(1)").addClass("selected");
    }
}

/* Skin management */
function buildSkinsWith(target, skin) {
    var kw = cfget("options", "skins_keyword");
    $(target).find("." + kw).removeClass(kw).addClass(kw + skin);
}
function buildSkins() {
    buildSkinsWith($("body").find("*"), getskin());
}

/* Page content build */
function buildBody() {
    /* Immediate build */
    $("div#body").empty();
    $("div#body").append($(nav.ct).find(":first").xmlAsString());
    buildSkins();

    /* Differed operations */
    buildSliders();
    buildEditorial();
}