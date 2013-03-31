/*  tk.js
 *  -----
 *  General JS toolkit. */

/* Font size adaptor */
function adjustFS(target, container) {
    var space = $(container).innerHeight();
    var height = $(target).outerHeight(false);
    var fs = parseInt($(target).css("font-size"));
    
    if (space > height) {
        while (space > height) {
            fs++;
            $(target).css("font-size", fs + "px");
            height = $(target).outerHeight(true);
        }
    } {
        while (space < height) {
            fs--;
            $(target).css("font-size", fs + "px");
            height = $(target).outerHeight(true);
        }
    }
    return fs;
}

/* Real size plugin */
(function($) {
    $.fn.realHeight = function(h) {
        $(this).height(h - ($(this).outerHeight(true) - $(this).innerHeight()));
    };
    $.fn.realWidth = function(w) {
        $(this).width(w - ($(this).outerWidth(true) - $(this).innerWidth()));
    };
})(jQuery);

/* Object as string plugin */
(function($) {
    $.fn.xmlAsString = function() {
        var aidx = 0;
        var r = '';
        r += '<';
        r += $(this)[0].tagName;
        while(aidx < $(this)[0].attributes.length) {
            r += ' ';
            r += $(this)[0].attributes[aidx].name;
            r += '="';
            r += $(this)[0].attributes[aidx].value;
            r += '"';
            aidx++;
        }
        r += '>';
        if ($(this).children("*").length === 0) {
            r += $(this)[0].textContent;
        }
        $(this).children("*").each(function() {
            r += $(this).xmlAsString();
        });
        r += '</';
        r += $(this)[0].tagName;
        r += '>';
        return r;
    };
})(jQuery);

/* Configuration access */
function cfget(component, variable) {
    return $(cfg).find('params > component#' + component + ' > var[name="' + variable + '"]').text();
}
function cfgetint(component, variable) {
    return parseInt(cfget(component, variable));
}