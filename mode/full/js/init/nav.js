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
    idp: $(smap).find("sitemap > index:first").attr("id"),
    l1: false,
    l2: false,
    l3: false,
    tn: jQuery.parseXML(tnreq.responseText),
    ct: null
};
loadBody(false, false);

/* User position switcher */
function goto(id) {
    /* Page selection */
    var page = $(smap).find("#" + id);

    /* Folder case */
    if ($(page).is("l1, l2, l3") && $(page).children("index").length > 0) {
        page = $(smap).find("#" + id + " > index:first");
    }

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

/* Potential navigation class getter */
function navClassFor(id) {
    var target = $(smap).find("#" + id);
    if ($(target).is("index, page")) {
        if ($(target).parent().is("sitemap")) {
            return $(target).children('param[name="skin"]').text();
        }
        else {
            return $(target).parents("l1").attr('param[name="skin"]');
        }
    } else {
        return $(target).attr('param[name="skin"]');
    }
}

/* Current navigation class getter */
function navClass() {
    return navClassFor(nav.idp);
}


/* Page getter */
function pageFor(id) {
    var block = $(smap).find("#" + id);
    if ($(block).is("index, page")) {
        return $(block);
    } else if ($(block).is("l1, l2, l3")) {
        return $(block).children("index:first");
    }
}

/* Current page getter */
function page() {
    return pageFor(nav.idp);
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