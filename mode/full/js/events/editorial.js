/*  editorial.js
 *  ------------
 *  Editorial-related events. */

/* Scroll to content sync */
function eventSyncEditorialContent() {
    
}

/* Configure editorial events */
function bindEditorialEvents() {
    var content = $("div#editorial div.content");
    var scroller = $("div#editorial div.scrollzone div.scrollbar div.scroller");
    
    /* Unbinding */
    $(content).unbind('mousewheel');
    
    /* Scroller events */
    $(scroller).draggable({
        start: switchStartEditorialScroll,
        drag: eventSyncEditorialContent,
        stop: switchEndEditorialScroll
    });
    
    if ($(scroller).length > 0 && !$(scroller).hasClass("scrolling")) {
        $(content).mousewheel(function(event, delta) {
            eventMouseScroll(delta);
        });
    }
}


