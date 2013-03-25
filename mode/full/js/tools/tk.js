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

/* Real height plugin */
(function($) {
    $.fn.realHeight = function(h) {
        $(this).height(h - ($(this).outerHeight(true) - $(this).innerHeight()));
    };
    $.fn.realWidth = function(w) {
        $(this).width(w - ($(this).outerWidth(true) - $(this).innerWidth()));
    };
})(jQuery);

/* Configuration access */
function cfget(component, variable) {
    return $(cfg).find('params > component#' + component + ' > var[name="' + variable + '"]').text();
}