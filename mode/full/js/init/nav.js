/*  nav.js
 *  ------
 *  Navigation info and tools. */

/* Initial top navigation loading */
var tnreq = jQuery.ajax({
    type: "GET",
    dataType: "xml",
    url: "../../data/content/nav.xml",
    async: false,
    cache: cfgetbool("options", "cache")
});

/* Navigation infos */
var nav = {
    tn: jQuery.parseXML(tnreq.responseText)
};
goto($(smap).find("sitemap > index:first").attr("id"));

/* User position switcher */
function goto(id) {
    /* Redirection case */
    if ($(smap).find("#" + id).children('param[name="type"]').text() === "redirection") {
        id = $(smap).find("#" + id).children('param[name="destination"]').text();
    }
    
    /* Page selection */
    var page = $(smap).find("#" + id);

    /* Folder case */
    if ($(page).is("l1, l2, l3") && $(page).children("index").length > 0) {
        page = $(smap).find("#" + id + " > index:first");
    }
    
    /* Preceding saving */
    (nav.pre == null) ? 
        nav.pre = [nav.idp] :
        nav.pre[nav.pre.length] = nav.idp;

    /* Page case */
    if ($(page).is("index, page")) {
        if ($(page).parent().is("sitemap")) {
            nav.idp = id;
            nav.l1 = false;
            nav.l2 = false;
            nav.l3 = false;
        } else if ($(page).parent().is("l1")) {
            nav.idp = id;
            nav.l1 = $(page).parent().attr("id");
            nav.l2 = false;
            nav.l3 = false;
        } else if ($(page).parent().is("l2")) {
            nav.idp = id;
            nav.l1 = $(page).parents("l1").attr("id");
            nav.l2 = $(page).parent().attr("id");
            nav.l3 = false;
        } else if ($(page).parent().is("l3")) {
            nav.idp = id;
            nav.l1 = $(page).parents("l1").attr("id");
            nav.l2 = $(page).parents("l2").attr("id");
            nav.l3 = $(page).parent().attr("id");
        }
    } else {
        nav.idp = "404";
        nav.l1 = false;
        nav.l2 = false;
        nav.l3 = false;
    }

    /* File load */
    loadBody(false, true);
}

/* Page content loader */
function loadBody(failsafe, async) {
    /* Loading */
    jQuery.ajax({
        type: "GET",
        dataType: "xml",
        url: "../../data/content/pages/" + nav.idp + ".xml",
        async: async,
        cache: cfgetbool("options", "cache")
    }).done(function(data) {
        nav.ct = data;
    }).fail(function() {
        if (!failsafe) {
            goto("500");
            loadBody(true, true);
        }
    });
}