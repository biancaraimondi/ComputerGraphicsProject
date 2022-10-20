function makeCamera(width, height) {
    ctx_camera.canvas.width = width;
    ctx_camera.canvas.height = height;
    ctx_camera.font = "15px monospace";

    ctx_camera.fillStyle = "black";
    ctx_camera.clearRect(0, 0, ctx_camera.canvas.width, ctx_camera.canvas.height);

    ctx_camera.fillText("Camera PAD", 80, 330);


    makeKeyCanvas();


    return ctx_camera.canvas;
}

function makeKeyCanvas() {
    let buttons = [];
    buttons.push(makeButton(1, 115, 425, 30, 30, '↓', 'skyblue', 'gray', 'black', function () { camera.dolly(-0.1); }))
    buttons.push(makeButton(2, 115, 355, 30, 30, '↑', 'skyblue', 'gray', 'black', function () { camera.dolly(0.1); }))
    buttons.push(makeButton(3, 148, 390, 30, 30, '→', 'skyblue', 'gray', 'black', function () { camera.pan(0.1); }))
    buttons.push(makeButton(4, 83, 390, 30, 30, '←', 'skyblue', 'gray', 'black', function () { camera.pan(-0.1); }))
    //buttons.push(makeButton(5, 180, 315, 50, 20, 'reset', 'skyblue', 'gray', 'black', function () { camera.align(); }))

    drawAll();
    cameraCanvas.addEventListener("click", function (e) {
        if (ctx_camera.isPointInPath(buttons[0], e.offsetX, e.offsetY)) {
            camera.dolly(-0.1);
        }
        if (ctx_camera.isPointInPath(buttons[1], e.offsetX, e.offsetY)) {
            camera.dolly(0.1);
        }
        if (ctx_camera.isPointInPath(buttons[2], e.offsetX, e.offsetY)) {
            camera.pan(-0.1);
        }
        if (ctx_camera.isPointInPath(buttons[3], e.offsetX, e.offsetY)) {
            camera.pan(0.1);
        }
        /*if (ctx_camera.isPointInPath(buttons[4], e.offsetX, e.offsetY)) {
            camera.getOriginalPosition();
        }*/
    });

    cameraCanvas.addEventListener('touchstart', function (e) {
        if (ctx_camera.isPointInPath(buttons[0], e.offsetX, e.offsetY)) {
            camera.dolly(-0.1);
        }
        if (ctx_camera.isPointInPath(buttons[1], e.offsetX, e.offsetY)) {
            camera.dolly(0.1);
        }
        if (ctx_camera.isPointInPath(buttons[2], e.offsetX, e.offsetY)) {
            camera.pan(-0.1);
        }
        if (ctx_camera.isPointInPath(buttons[3], e.offsetX, e.offsetY)) {
            camera.pan(0.1);
        }
        /*if (ctx_camera.isPointInPath(buttons[4], e.offsetX, e.offsetY)) {
            camera.getOriginalPosition();
        }*/
    });


    function makeButton(id, x, y, w, h, label, fill, stroke, labelcolor, clickFn, releaseFn) {
        let button = new Path2D();
        button.rect(x, y, w, h);
        button.x = x;
        button.y = y;
        button.w = w;
        button.h = h;
        button.id = id;
        button.label = label;
        button.fill = fill;
        button.stroke = stroke;
        button.labelcolor = labelcolor;
        button.clickFn = clickFn;
        button.releaseFn = releaseFn;
        return button;
    }

    function drawAll() {
        for (let i = 0; i < buttons.length; i++) {
            drawButton(buttons[i], false);
        }
    }

    function drawButton(b, isDown) {
        ctx_camera.clearRect(b.x - 1, b.y - 1, b.w + 2, b.h + 2);
        ctx_camera.fillStyle = b.fill;
        ctx_camera.fillRect(b.x, b.y, b.w, b.h);
        ctx_camera.strokeStyle = b.stroke;
        ctx_camera.strokeRect(b.x, b.y, b.w, b.h);
        ctx_camera.textAlign = 'center';
        ctx_camera.textBaseline = 'middle';
        ctx_camera.fillStyle = b.labelcolor;
        ctx_camera.fillText(b.label, b.x + b.w / 2, b.y + b.h / 2);
        if (isDown) {
            ctx_camera.beginPath();
            ctx_camera.moveTo(b.x, b.y + b.h);
            ctx_camera.lineTo(b.x, b.y);
            ctx_camera.lineTo(b.x + b.w, b.y);
            ctx_camera.strokeStyle = 'black';
            ctx_camera.stroke();
        }
    }
}