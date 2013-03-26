/*  build.js
 *  --------
 *  Pure DOM manipulation functions. */

/* Top navigation mode switching */
function switchTopNavigation(mode) {
    /* General action */
    var topnav = $("div#topnav");
    $(topnav).removeClass("open opening close closing");
    $(topnav).addClass(mode);
    
    /* Specific action */
    if (mode === "closing") {
        $("div#topnav div.baseline div.nav ul.links li").removeClass("selected");
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
    $(target).append($(data).text());
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