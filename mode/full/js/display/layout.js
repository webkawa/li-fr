/* layout.js
 * ---------
 * Global layout display functions. */

/* Body auto-resize
 * --------------------
 *  s.header        > div#header
 *  s.body          > div#body
 *  s.bigsl         > div#bigslider
 *  s.bigslslides   > div#bigslider div.slide
 *  s.bigslsslide   > div#bigslider div.slide.selected
 *  s.editorial     > div#editorial
 *  s.content       > div#editorial div.content
 *  s.scrollzone    > div#editorial div.content div.scrollzone
 *  s.scrollbar     > div#editorial div.content div.scrollzone div.scrollbar
 *  s.scroller      > div#editorial div.content div.scrollzone div.scrollbar div.scroller
 *  s.footer        > div#footer    */
function refreshBodySelector () {
    var s = {
        header:         $("div#header"),
        body:           $("div#body"),
        bigsl:          $("div#bigslider"),
        bigslslides:    $("div#bigslider div.slide"),
        bigslsslide:    $("div#bigslider div.slide.selected"),
        editorial:      $("div#editorial"),
        content:        $("div#editorial div.content"),
        scrollzone:     $("div#editorial div.scrollzone"),
        scrollbar:      $("div#editorial div.scrollzone div.scrollbar"),
        scroller:       $("div#editorial div.scrollzone div.scrollbar div.scroller"),
        footer:         $("div#footer")
    };
    return s;
}
function refreshBody(s) {
    /* Dimensions */
    $(s.body).realHeight(
        $(window).height() -
        $(s.header).outerHeight(true) -
        $(s.footer).outerHeight(true)
    );
    
    /* Dependances */
    refreshSliders(s);
    refreshEditorial(s);
}

/* Header auto-resize
 * ------------------
 *  s.header        > div#header
 *  s.banner        > div#banner
 *  s.subnavctcols  > div#topnav div.baseline div.subnav div.content div.column        */
function refreshHeaderSelector() {
    var s = {
        header:         $("div#header"),
        banner:         $("div#banner"),
        subnavctcols:   $("div#topnav div.baseline div.subnav div.content div.column")
    };
    return s;
}
function refreshHeader(s) {
    /* Dependances */
    refreshBanner(s);
    refreshSubNavContentColumns(s);
}

/* Body auto-resize
 * ----------------
 *  s.body          > div#body
 *  s.header        > div#header
 *  s.subnavctcols  > div#topnav div.baseline div.subnav div.content div.column        
 *  s.banner        > div#banner
 *  s.bigsl         > div#bigslider
 *  s.bigslslides   > div#bigslider div.slide
 *  s.bigslsslide   > div#bigslider div.slide.selected
 *  s.editorial     > div#editorial
 *  s.content       > div#editorial div.content
 *  s.scrollzone    > div#editorial div.scrollzone
 *  s.scrollbar     > div#editorial div.scrollzone div.scrollbar
 *  s.scroller      > div#editorial div.scrollzone div.scrollbar div.scroller
 *  s.footer        > div#footer                                                            */
function refreshAllSelector () {
    var s = {
        body:           $("div#body"),
        header:         $("div#header"),
        subnavctcols:   $("div#topnav div.baseline div.subnav div.content div.column"),
        banner:         $("div#banner"),
        bigsl:          $("div#bigslider"),
        bigslslides:    $("div#bigslider div.slide"),
        bigslsslide:    $("div#bigslider div.slide.selected"),
        editorial:      $("div#editorial"),
        content:        $("div#editorial div.content"),
        scrollzone:     $("div#editorial div.scrollzone"),
        scrollbar:      $("div#editorial div.scrollzone div.scrollbar"),
        scroller:       $("div#editorial div.scrollzone div.scrollbar div.scroller"),
        footer:         $("div#footer")
    };
    return s;
}
function refreshAll(s) {
    /* Dependances */
    refreshHeader(s);
    refreshBody(s);
}