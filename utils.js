function degToRad(d) {
    return d * Math.PI / 180;
}

function isPowerOf2(value) {
    return (value & (value - 1)) === 0;
}

function resizeCanvasToDisplaySize(canvas) {
    // Lookup the size the browser is displaying the canvas in CSS pixels.
    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;

    // Check if the canvas is not the same size.
    const needResize = canvas.width !== displayWidth ||
        canvas.height !== displayHeight;

    if (needResize) {
        // Make the canvas the same size
        canvas.width = displayWidth;
        canvas.height = displayHeight;
    }

    return needResize;
}

function add_touch_canvas(){
    let mouse = [];

    function mouseDown(e) {
        mouse.drag = true;
        mouse.old_x = e.offsetX;
        mouse.old_y = e.offsetY;
        e.preventDefault();
    }
    function mouseUp(){
        mouse.drag=false;
    }
    function mouseMove(e) {
        if (!mouse.drag){
            return false;
        }
        let dX=-(e.offsetX-mouse.old_x)*2*Math.PI/canvas.width;
        camera.pan(-dX * 0.2);
        let dY=-(e.offsetY-mouse.old_y)*2*Math.PI/canvas.height;
        camera.tilt(-dY * 0.2);

        mouse.old_x=e.offsetX;
        mouse.old_y=e.offsetY;
        e.preventDefault();
    }

    canvas.addEventListener('touchstart',mouseDown,false);
    canvas.addEventListener('touchmove',mouseMove,false);
    canvas.addEventListener('touchend',mouseUp,false);
    canvas.addEventListener('mouseout',mouseUp,false);
    canvas.onmousedown=mouseDown;
    canvas.onmouseup=mouseUp;
    canvas.onmouseout=mouseUp;
    canvas.onmousemove=mouseMove;
}


