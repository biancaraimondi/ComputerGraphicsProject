function makeCamera() {
    ctx_camera.canvas.width = width;
    ctx_camera.canvas.height = height;
    ctx_camera.font = "15px monospace";

    drawObjects(0.5);

    return ctx_camera.canvas;
}

function drawObjects(value) {
    ctx_camera.clearRect(0, 0, width, height);
    drawBackground();
    drawButtons();
    drawSlider(value);
}

function drawBackground() {
    // Add the lightgrey background
    ctx_camera.fillStyle = "#d3d3d3";
    ctx_camera.fillRect(1, 0, width-30, height-10);
}
function drawButtons() {
    // Add a legend for the buttons
    ctx_camera.fillStyle = "black";
    ctx_camera.fillText("Move camera", 20, 20);

    // Add position of the buttons
    ctx_camera.fillStyle = "orange";
    ctx_camera.fillRect(width/2 - 20, 30, 40, 25);
    ctx_camera.fillRect(width/2 - 20, 105, 40, 25);
    ctx_camera.fillRect(width/2 + 20, 65, 40, 25);
    ctx_camera.fillRect(width/2 - 60, 65, 40, 25);
    ctx_camera.fillRect(width/2 - 30, 155, 60, 25);

    // Add text to the buttons
    ctx_camera.fillStyle = "black";
    ctx_camera.fillText("D", width/2 - 20 + 15, 48);
    ctx_camera.fillText("U", width/2 - 20 + 15, 122);
    ctx_camera.fillText("R", width/2 + 20 + 15, 65 + 17);
    ctx_camera.fillText("L", width/2 - 60 + 15, 65 + 17);
    ctx_camera.fillText("RESET", width/2 - 30 + 8, 155 + 15);


    ctx_camera.canvas.addEventListener("click", function (e) {
        let x = e.offsetX - ctx_camera.canvas.offsetLeft;
        let y = e.offsetY - ctx_camera.canvas.offsetTop;

        // if the user clicked on the button with the text "D"
        if (x > (width/2 - 20 - 15) && x < (width/2 - 20 + 40 - 15) && y > 30 && y < 30 + 25) {
            console.log("Clicked on D");
            camera.dolly(-0.05);
        }
        // if the user clicked on the button with the text "U"
        if (x > (width/2 - 20 - 15) && x < (width/2 - 20 + 40 - 15) && y > 105 && y < 105 + 25) {
            console.log("Clicked on U");
            camera.dolly(0.05);
        }
        // if the user clicked on the button with the text "R"
        if (x > (width/2 + 20 - 15) && x < (width/2 + 20 + 40 - 15) && y > 65 && y < 65 + 25) {
            console.log("Clicked on R");
            camera.pan(-0.1);
        }
        // if the user clicked on the button with the text "L"
        if (x > (width/2 - 60 - 15) && x < (width/2 - 60 + 40 - 15) && y > 65 && y < 65 + 25) {
            console.log("Clicked on L");
            camera.pan(0.1, 0);
        }
        // if the user clicked on the button with the text "RESET"
        if (x > (width/2 - 30 - 15) && x < (width/2 - 30 + 60 - 15) && y > 155 && y < 155 + 25) {
            console.log("Clicked on RESET");
            camera.align();
            angle = 55;
            setObjectsColorsBySun();
            sunStopped = false;
        }
    });

}

function drawSlider(value) {
    // Add a legend for the slider
    ctx_camera.fillStyle = "black";
    ctx_camera.fillText("Move sun", 20, 210);

    // Draw the slider track
    ctx_camera.fillStyle = "black";
    ctx_camera.strokeStyle = "black";
    ctx_camera.lineWidth = 4;
    ctx_camera.lineCap = "round";
    ctx_camera.beginPath();
    ctx_camera.moveTo(20, 230);
    ctx_camera.lineTo(150, 230);
    ctx_camera.stroke();

    // Calculate the x position of the slider handle based on the value
    let x = 20 + (value * 130);

    // Draw the slider handle
    ctx_camera.fillStyle = "black";
    ctx_camera.strokeStyle = "black";
    ctx_camera.lineWidth = 2;
    ctx_camera.beginPath();
    ctx_camera.arc(x, 230, 10, 0, 2 * Math.PI);
    ctx_camera.fill();
    ctx_camera.stroke();



    ctx_camera.canvas.addEventListener("mousedown", function (e) {
        // Check if the user clicked on the slider handle
        let x = e.offsetX - ctx_camera.canvas.offsetLeft;
        let y = e.offsetY - ctx_camera.canvas.offsetTop;
        // If the user clicked on the slider handle, start tracking the mouse
        //if (Math.abs(x - value * 130 - 20) < 20 && Math.abs(y - 200) < 20) {
        if ( x > (20 + value * 130 - 10 - 15) && x < (20 + value * 130 + 10 - 15) && y < 240 && y > 220) {
            isDragging = true;
            sunStopped = true;
        }
    });

    ctx_camera.canvas.addEventListener("mousemove", function (e) {
        if (isDragging) {

            // Clear the timeout if it is set
            if (timeout) {
                clearTimeout(timeout);
            }

            // Set a new timeout to trigger the event handler in 0.5 seconds
            timeout = setTimeout(function () {
                // Calculate the new value of the slider based on the mouse position
                let x = e.offsetX - ctx_camera.canvas.offsetLeft;
                value = x / 130;

                // Clamp the value to the range [0, 1]
                value = Math.max(0, Math.min(1, value));

                // Redraw the slider with the new value
                drawObjects(value);

                // Clear the timeout
                timeout = null;
            }, 5);
        }
    });

    ctx_camera.canvas.addEventListener("mouseup", function (e) {
        //set angle between -55 and 55 degrees based on value
        angle = 55 - (value * 110);
        setObjectsColors(value);
        isDragging = false;
    });

}
