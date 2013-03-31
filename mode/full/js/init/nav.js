/*  nav.js
 *  ------
 *  Navigation info and tools. */

/* Initial top navigation loading */
var tnreq = jQuery.ajax({
    type: "GET",
    dataType: "xml",
    url: "../../data/content/nav.xml",
    async: false
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
}

/* Potential navigation class getter */
function navClassFor(id) {
    var target = $(smap).find("#" + id);
    if ($(target).is("index, page")) {
        if ($(target).parent().is("sitemap")) {
            return $(target).children("skin").text();
        }
        else {
            return $(target).parents("l1").attr("skin");
        }
    } else {
        return $(target).attr("skin");
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
function loadBody(failsafe) {
    /* Loading */
    var res = false;
    jQuery.ajax({
        type: "GET",
        dataType: "xml",
        url: "../../data/content/pages/" + nav.idp + ".xml",
        async: false,
        cache: false,
        success: function() {
            res = true;
        }
    }).done(function(data) {
        nav.ct = data;
    });


    /* 500 redirect */
    if (!failsafe && !res) {
        goto("500");
        loadBody(true);
    }
}