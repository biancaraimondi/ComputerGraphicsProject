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

function setObjectsColors(value) {
    //set angle between -55 and 55 degrees based on value
    angle = 55 - (value * 110);

    //set objGreen between 0.91 and 0.48 based on value
    //if value is 0, objGreen is 0.48
    //if value is 1, objGreen is 0.48
    //if value is 0.5, objGreen is 0.91
    //if value is between 0 and 0.5, objGreen is between 0.48 and 0.91
    //if value is between 0.5 and 1, objGreen is between 0.91 and 0.48
    objGreen = (angle < 0) ? 0.48 + 0.43 * (1 - value) * 1.5 : 0.48 + 0.43 * value * 1.5;

    //set objBlue between 1 and 0.2 based on value
    //if value is 0, objBlue is 1
    //if value is 1, objBlue is 0.2
    //if value is 0.5, objBlue is 0.2
    //if value is between 0 and 0.5, objBlue is between 1 and 0.2
    //if value is between 0.5 and 1, objBlue is between 0.2 and 1
    objBlue = (angle < 0) ? 1 - 0.8 * (1 - value) * 1.5 : 1 - 0.8 * value * 1.5;

    //set skyRed between 149 and 192 based on value
    //if value is 0, skyRed is 149
    //if value is 1, skyRed is 192
    //if value is 0.5, skyRed is 192
    //if value is between 0 and 0.5, skyRed is between 149 and 192
    //if value is between 0.5 and 1, skyRed is between 192 and 149
    skyRed = ((angle < 0) ? 192 - 43 * (1 - value) * 3 : 192 - 43 * value * 3) / 255;

    //set skyGreen between 170 and 152 based on value
    //if value is 0, skyGreen is 170
    //if value is 1, skyGreen is 152
    //if value is 0.5, skyGreen is 152
    //if value is between 0 and 0.5, skyGreen is between 170 and 152
    //if value is between 0.5 and 1, skyGreen is between 152 and 170
    skyGreen = ((angle < 0) ? 152 + 18 * (1 - value) * 3 : 152 + 18 * value * 3) / 255;

    //set skyBlue between 250 and 245 based on value
    //if value is 0, skyBlue is 250
    //if value is 1, skyBlue is 245
    //if value is 0.5, skyBlue is 245
    //if value is between 0 and 0.5, skyBlue is between 250 and 245
    //if value is between 0.5 and 1, skyBlue is between 245 and 250
    skyBlue = ((angle < 0) ? 245 + 5 * (1 - value) * 3 : 245 + 5 * value * 3) / 255;
}


