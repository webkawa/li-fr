/*  build.js
 *  --------
 *  Pure DOM manipulation functions. */

/* Page disposition mode switching */
function switchPageDisposition(mode) {
    $("body").removeClass("panoramic normal");
    $("body").addClass(mode);
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

/* Sliders build */
function switchStartBigSlider() {
    /* Adding classes */
    $("div#body div.slider.big").addClass("switching");
    $("div#body div.slidernav.big").addClass("switching");
}
function switchEndBigSlider(dir) {
    var slider = $("div#body div.slider.big");
    var snav = $("div#body div.slidernav.big");
    var sslide = $(slider).children("div.slide.selected");
    var rp = false;
    var rpt, rptl;
    
    /* Removing switch info */
    $(slider).removeClass("switching");
    $(snav).removeClass("switching");
    
    /* Moving select */
    dir ? 
        $("div#body div.slider.big div.slide.selected").next().addClass("selected") : 
        $("div#body div.slider.big div.slide.selected").prev().addClass("selected");
    $(sslide).removeClass("selected");
    
    /* Replacing if needed */
    if ($("div#body div.slider.big div.slide:first").hasClass("selected")) {
        rp = true;
        rpt = $("div#body div.slider.big div.slide:last").prev();
        rptl = -($("div#body div.slider.big div.slide").length - 2) * $(rpt).outerWidth(true);
    }
    if ($("div#body div.slider.big div.slide:last").hasClass("selected")) {
        rp = true;
        rpt = $("div#body div.slider.big div.slide:first").next();
        rptl = -($(rpt).outerWidth(true));
    }
    if (rp) {
        $("div#body div.slider.big div.slide.selected").removeClass("selected");
        $(rpt).addClass("selected");
        $("div#body div.slider.big").css("left", rptl + "px");
    }
    
    /* Updating navigation */
    $("div#body div.slidernav.big ul li.selected").removeClass("selected");
    $("div#body div.slidernav.big ul li:eq(" + $(slider).children("div.slide.selected").index() + ")").addClass("selected");
}
function buildSliders() {
    /* Big slider */
    if (ppget("type") === "bigslider") {
        var slider = $("div#body div.slider.big");
        var slides = $(slider).children("div.slide");
        var ct, ctl, ctf, unav;

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
            '<div class="slidernav big">' +
                '<ul></ul>' +
                '<div class="loader">' +
                    '<div class="up"></div>' +
                    '<div class="down" style="width: 0%"></div>' +
                '</div>' +
            '</div>');

        unav = $("div#body div.slidernav.big ul");
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

/* Page content build */
function buildBody() {
    /* Immediate build */
    $("div#body").empty();
    $("div#body").append($(nav.ct).find(":first").xmlAsString());
    $(".skined").removeClass("S0 S1 S2");
    $(".skined").addClass(navClass());

    /* Differed operations */
    buildSliders();
}