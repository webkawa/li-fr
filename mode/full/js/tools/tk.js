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

