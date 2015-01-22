function fixEvent(e) {
    // get event for IE
    e = e || window.event;

    // add pageX/pageY for IE
    if ( e.pageX == null && e.clientX != null ) {
        var html = document.documentElement;
        var body = document.body;
        e.pageX = e.clientX + (html && html.scrollLeft || body && body.scrollLeft || 0) - (html.clientLeft || 0)
        e.pageY = e.clientY + (html && html.scrollTop || body && body.scrollTop || 0) - (html.clientTop || 0)
    }

    // add which for IE
    if (!e.which && e.button) {
        e.which = e.button & 1 ? 1 : ( e.button & 2 ? 3 : ( e.button & 4 ? 2 : 0 ) )
    }

    return e
}

document.onmousemove = mouseMove;

function mouseMove(event){
    event = fixEvent(event);
    document.getElementById('mouseX').innerText = event.pageX;
    document.getElementById('mouseY').innerText = event.pageY;
}



