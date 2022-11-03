function makeCamera() {
    ctx_camera.canvas.width = width;
    ctx_camera.canvas.height = height;
    ctx_camera.font = "15px monospace";

    ctx_camera.clearRect(0, 0, width, height);

    drawButtons();

    return ctx_camera.canvas;
}

// draw buttons on canvas
function drawButtons() {
    ctx_camera.clearRect(0, 0, width, height);

    ctx_camera.fillStyle = "orange";
    ctx_camera.fillRect(width/2 - 20, 10, 40, 25);
    ctx_camera.fillRect(width/2 - 20, 85, 40, 25);
    ctx_camera.fillRect(width/2 + 20, 45, 40, 25);
    ctx_camera.fillRect(width/2 - 60, 45, 40, 25);

    ctx_camera.fillRect(width/2 - 30, 135, 60, 25);

    ctx_camera.fillStyle = "black";
    ctx_camera.fillText("D", width/2 - 20 + 15, 28);
    ctx_camera.fillText("U", width/2 - 20 + 15, 102);
    ctx_camera.fillText("R", width/2 + 20 + 15, 45 + 17);
    ctx_camera.fillText("L", width/2 - 60 + 15, 45 + 17);

    ctx_camera.fillText("RESET", width/2 - 30 + 8, 135 + 15);

    ctx_camera.canvas.addEventListener("click", function (e) {
        var x = e.offsetX - ctx_camera.canvas.offsetLeft;
        var y = e.offsetY - ctx_camera.canvas.offsetTop;
        if (x > (width/2 - 40) && x < (width/2 - 20 + 40) && y > 10 && y < 35) {
            camera.dolly(-0.1);
        }
        if (x > (width/2 - 40) && x < (width/2 - 20 + 40) && y > 85 && y < 110) {
            camera.dolly(0.1);
        }
        if (x > (width/2 - 20) && x < (width/2 + 20) && y > 45 && y < 70) {
            camera.pan(-0.1);
        }
        if (x > (width/2 + 20) && x < (width/2 + 40 + 20) && y > 45 && y < 70) {
            camera.pan(0.1, 0);
        }
        if (x > (width/2 - 60) && x < (width/2 - 40) && y > 45 && y < 70) {
            camera.pan(-0.1, 0);
        }
        if (x > (width/2 - 30) && x < (width/2 + 30) && y > 135 && y < 160) {
            camera.align();
        }
    });
}