// declaration of global variables
// @light is the light source
// @angle is the angle of the light source (the sun)
// @shadow is for shadow settings
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

let isDragging = false;
let timeout = null;
let shadowStopped = false;
let valueForSun = 0;
let cameraCanvas = document.getElementById('camera');
ctx_camera = cameraCanvas.getContext('2d');

let cameraColumn = document.getElementById('camera_column');
let width = cameraColumn.getBoundingClientRect().width;
let height = cameraColumn.getBoundingClientRect().height;
// @sunStopped is used to stop the sun movement
let sunStopped = false;
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

let program = webglUtils.createProgramInfo(gl, ["base-vertex-shader", "base-fragment-shader"]);
let colorProgramInfo = webglUtils.createProgramInfo(gl, ['color-vertex-shader', 'color-fragment-shader']);
let textureProgramInfo = webglUtils.createProgramInfo(gl, ['vertex-shader-3d', 'fragment-shader-3d']);
prepareShadows();

let meshes = []; // Array used to store all the mesh used in the scene
load_mesh();
let sunPosition = meshes[3].position;

// @position is the position of the camera
// @target is the target of the camera
// @up is the up vector of the camera
const position = [0,6,18], target = [0, 7, 0], up = [0, 1, 0];
let camera = new Camera(position, target, up);
let keys = {};

// Light used in the scene
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