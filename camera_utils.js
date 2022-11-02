function makeCamera() {
    ctx_camera.canvas.width = width;
    ctx_camera.canvas.height = height;
    ctx_camera.font = "15px monospace";

    ctx_camera.fillStyle = "black";
    ctx_camera.clearRect(0, 0, width, height);

    drawButtons();

    return ctx_camera.canvas;
}

// draw buttons on canvas
function drawButtons() {
    ctx_camera.clearRect(0, 0, width, height);
    //ctx_camera.fillText("Change view", 80, 330);
    ctx_camera.fillStyle = "orange";
    ctx_camera.fillRect(width/2 - 20, 10, 40, 25);
    ctx_camera.fillRect(115, 355, 40, 25);
    ctx_camera.fillRect(148, 390, 40, 25);
    ctx_camera.fillRect(83, 390, 40, 25);

    ctx_camera.fillRect(115, 460, 60, 25);

    ctx_camera.fillStyle = "black";
    ctx_camera.fillText("D", width/2 + 15 - 20, 28);
    ctx_camera.fillText("U", 130, 370);
    ctx_camera.fillText("R", 163, 405);
    ctx_camera.fillText("L", 98, 405);

    ctx_camera.fillText("Reset", 120, 475);

    ctx_camera.canvas.addEventListener("click", function (e) {
        var x = e.offsetX - ctx_camera.canvas.offsetLeft;
        var y = e.offsetY - ctx_camera.canvas.offsetTop;
        if (x > (width/2 - 40) && x < (width/2 - 20 + 40) && y > 10 && y < 35) {
            camera.dolly(-0.1);
        }
        if (x > 115 && x < 155 && y > 355 && y < 380) {
            camera.dolly(0.1);
        }
        if (x > 148 && x < 188 && y > 390 && y < 415) {
            camera.pan(-0.1);
        }
        if (x > 83 && x < 123 && y > 390 && y < 415) {
            camera.pan(0.1);
        }
        if (x > 115 && x < 155 && y > 460 && y < 485) {
            camera.align();
        }
    });
}

/*
function makeKeyCanvas() {
    let buttons = [];
    buttons.push(makeButton(1, 115, 425, 30, 30, '↓', 'skyblue', 'gray', 'black', function () { camera.dolly(-0.1); }))
    buttons.push(makeButton(2, 115, 355, 30, 30, '↑', 'skyblue', 'gray', 'black', function () { camera.dolly(0.1); }))
    buttons.push(makeButton(3, 148, 390, 30, 30, '→', 'skyblue', 'gray', 'black', function () { camera.pan(0.1); }))
    buttons.push(makeButton(4, 83, 390, 30, 30, '←', 'skyblue', 'gray', 'black', function () { camera.pan(-0.1); }))

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
 */