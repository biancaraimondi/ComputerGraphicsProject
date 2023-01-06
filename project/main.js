// declaration of global variables
// @light is the light source
// @angle is the angle of the light source (the sun)
// @shadow is for shadow settings
// @objGreen and @objBlue are the green and blue colors of the objects (red is fixed to 1)
// @skyRed, @skyGreen and @skyBlue are the red, green and blue colors of the sky (alpha is fixed to 0.8)
let light = [];
let angle = 55;
let shadow = [];
let objGreen = 0;
let objBlue = 0;
let skyRed = 0;
let skyGreen = 0;
let skyBlue = 0;

let canvas = document.getElementById("canvas");
let gl = canvas.getContext("webgl");
gl.getExtension("OES_standard_derivatives");

// @isDragging is a boolean to check if the mouse is dragging on slider of canvas2D
// @timeout is used to know if isDragging is true or false every 5ms
// @shadowStopped is a boolean to check if the shadow is stopped
// @valueForSun is the value of the slider for the sun
// @sunStopped is used to stop the sun movement
let isDragging = false;
let timeout = null;
let shadowStopped = false;
let valueForSun = 0;
let sunStopped = false;

let cameraCanvas = document.getElementById('camera');
ctx_camera = cameraCanvas.getContext('2d');
let cameraColumn = document.getElementById('camera_column');
let width = cameraColumn.getBoundingClientRect().width;
let height = cameraColumn.getBoundingClientRect().height;
makeCamera(width, height);

// Check if WebGL is supported
if (!gl) {
    alert("WebGL not supported!");
    throw new Error("WebGL not supported!");
}

let ext = gl.getExtension('WEBGL_depth_texture');
if (!ext) {
    alert('need WEBGL_depth_texture');
    throw new Error('need WEBGL_depth_texture');
}

gl.enable(gl.DEPTH_TEST);

// @program is the program used to draw in a basic way the objects
// @colorProgramInfo is the program used to draw objects using the shadow map
// @textureProgramInfo is the program used to draw objects using shadows and a texture
let program = webglUtils.createProgramInfo(gl, ["base-vertex-shader", "base-fragment-shader"]);
let colorProgramInfo = webglUtils.createProgramInfo(gl, ['color-vertex-shader', 'color-fragment-shader']);
let textureProgramInfo = webglUtils.createProgramInfo(gl, ['vertex-shader-3d', 'fragment-shader-3d']);
prepareShadows();

// @meshes is an array used to store all the meshes used in the scene
let meshes = [];
load_mesh();

// @sunPosition is the position of the sun
// @position is the position of the camera
// @target is the target of the camera
// @up is the up vector of the camera
// @keys is an array used to store the keys pressed
let sunPosition = meshes[3].position;
const position = [0,6,18], target = [0, 7, 0], up = [0, 1, 0];
let camera = new Camera(position, target, up);
let keys = {};
light = {position: [0,5,18],direction : [1,1,1], color : [1.0, 1.0, 1.0], ambient: [0.1,0.1,0.1] };

function main(){
    // Adding event listener for keyboard
    window.addEventListener('keydown', (e) => {keys[e.key] = true;});
    window.addEventListener('keyup', (e) => {keys[e.key] = false;});

    // Adding event listener for mouse
    add_touch_canvas();

    draw();
}


main();