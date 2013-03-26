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
    idp     :   "hp",
    l1      :   false,
    l2      :   false,
    l3      :   false,
    tn      :   jQuery.parseXML(tnreq.responseText)
};

/* User position switcher */
function goto(idpage) {
    var page = $(smap).find("page#" + idpage);
    if ($(page).length === 1) {
        if ($(page).parent().is("sitemap")) {
            nav = {
                idp     :   idpage,
                l1      :   false,
                l2      :   false,
                l3      :   false
            };
        } else if ($(page).parent().is("l1")) {
            nav = {
                idp     :   idpage,
                l1      :   $(page).parent().attr("id"),
                l2      :   false,
                l3      :   false
            };
        } else if ($(page).parent().is("l2")) {
            nav = {
                idp     :   idpage,
                l1      :   $(page).parents("l1").attr("id"),
                l2      :   $(page).parent().attr("id"),
                l3      :   false
            };
        } else if ($(page).parent().is("l3")) {
            nav = {
                idp     :   idpage,
                l1      :   $(page).parents("l1").attr("id"),
                l2      :   $(page).parents("l2").attr("id"),
                l3      :   $(page).parent().attr("id")
            };
        }
        return true;
    } else {
        return false;
    }
}

/* Potential navigation class getter */
function navclassfor(idpage) {
    var page = $(smap).find("page#" + idpage);
    if ($(page).parent().is("sitemap")) {
        return $(page).children("skin").first().text();
    } else {
        return ($page).parent().children("skin").first().text();
    }
}

/* Current navigation class getter */
function navclass() {
    return navclassfor(nav.idp);
}