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
    drawCheckBox();
}

function drawBackground() {
    ctx_camera.fillStyle = "#d3d3d3";
    ctx_camera.fillRect(1, 0, width-30, height-10);
}
function drawButtons() {
    // Add a legend for the buttons
    ctx_camera.fillStyle = "black";
    ctx_camera.fillText("Move camera", 20, 10);

    // Add position of the buttons
    ctx_camera.fillStyle = "orange";
    ctx_camera.fillRect(width/2 - 20, 10, 40, 25);
    ctx_camera.fillRect(width/2 - 20, 85, 40, 25);
    ctx_camera.fillRect(width/2 + 20, 45, 40, 25);
    ctx_camera.fillRect(width/2 - 60, 45, 40, 25);
    ctx_camera.fillRect(width/2 - 30, 135, 60, 25);

    // Add text to the buttons
    ctx_camera.fillStyle = "black";
    ctx_camera.fillText("D", width/2 - 20 + 15, 28);
    ctx_camera.fillText("U", width/2 - 20 + 15, 102);
    ctx_camera.fillText("R", width/2 + 20 + 15, 45 + 17);
    ctx_camera.fillText("L", width/2 - 60 + 15, 45 + 17);
    ctx_camera.fillText("RESET", width/2 - 30 + 8, 135 + 15);


    ctx_camera.canvas.addEventListener("click", function (e) {
        let x = e.offsetX - ctx_camera.canvas.offsetLeft;
        let y = e.offsetY - ctx_camera.canvas.offsetTop;
        // if x is between width/2 - 20 and width/2 + 20 and y is between 10 and 35
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

function drawSlider(value) {
    // Add a legend for the slider
    ctx_camera.fillStyle = "black";
    ctx_camera.fillText("Move sun", 20, 180);

    // Draw the slider track
    ctx_camera.strokeStyle = "#ccc";
    ctx_camera.lineWidth = 4;
    ctx_camera.lineCap = "round";
    ctx_camera.beginPath();
    ctx_camera.moveTo(20, 200);
    ctx_camera.lineTo(150, 200);
    ctx_camera.stroke();

    // Calculate the x position of the slider handle based on the value
    let x = 20 + (value * 130);

    // Draw the slider handle
    ctx_camera.fillStyle = "#333";
    ctx_camera.strokeStyle = "#fff";
    ctx_camera.lineWidth = 2;
    ctx_camera.beginPath();
    ctx_camera.arc(x, 200, 10, 0, 2 * Math.PI);
    ctx_camera.fill();
    ctx_camera.stroke();



    ctx_camera.canvas.addEventListener("mousedown", function (e) {
        // Check if the user clicked on the slider handle
        let x = e.offsetX - ctx_camera.canvas.offsetLeft;
        let y = e.offsetY - ctx_camera.canvas.offsetTop;
        // If the user clicked on the slider handle, start tracking the mouse
        if (Math.abs(x - value * 130 - 20) < 20 && Math.abs(y - 200) < 20) {
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
            }, 10);
        }
    });

    ctx_camera.canvas.addEventListener("mouseup", function (e) {
        setObjectsColors(value);
        isDragging = false;
    });

}

function drawX(){
    ctx_camera.fillStyle = "black";
    ctx_camera.beginPath();
    ctx_camera.moveTo(20, 250);
    ctx_camera.lineTo(40, 270);
    ctx_camera.moveTo(20, 270);
    ctx_camera.lineTo(40, 250);
    ctx_camera.stroke();
}
function drawCheckBox() {
    // Add a label for the checkbox
    ctx_camera.fillStyle = "black";
    ctx_camera.fillText("Stop sun", 20, 240);

    // Set the fill style for the checkbox
    ctx_camera.fillStyle = "white";
    ctx_camera.beginPath();
    ctx_camera.rect(20, 250, 20, 20);
    ctx_camera.fill();

    /*// Draw the checkmark if the checkbox is checked
    if (isChecked) {
        drawX();
    }


    // Attach a click event listener to the canvas element
    ctx_camera.canvas.addEventListener("click", function(event) {
        // Get the coordinates of the mouse click relative to the canvas
        let x = event.offsetX - ctx_camera.canvas.offsetLeft;
        let y = event.offsetY - ctx_camera.canvas.offsetTop;

        console.log(x, y);
        // Check if the click was inside the checkbox
        if (x >= 15 && x <= 40 && y >= 250 && y <= 270) {
            console.log("Clicked on checkbox");
            // The click was inside the checkbox, so toggle the checked state
            isChecked = !isChecked;

            // Redraw the checkbox with the updated state
            /!*ctx_camera.fillStyle = "black";
            ctx_camera.beginPath();
            ctx_camera.rect(20, 20, 20, 20);
            ctx_camera.fill();*!/
            if (isChecked) {
                drawX();
            }

            console.log("Checkbox is checked: " + isChecked);
            sunStopped = true;
            angle = 55;
            objGreen = 0.48;
            objBlue = 0.2;
            skyRed = 0.7529; // 192/255 = 0.7529
            skyGreen = 0.5961; // 152/255 = 0.6
            skyBlue = 0.9608;
        }
    });*/
}


