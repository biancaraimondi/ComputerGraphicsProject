window["light"] = [];
window["angle"] = 55;
window["shadow"] = [];
//window["anticlockwise"] = 1;

let canvas = document.getElementById("canvas");
let gl = canvas.getContext("webgl");
gl.getExtension("OES_standard_derivatives");

let cameraCanvas = document.getElementById('camera');
ctx_camera = cameraCanvas.getContext('2d');
makeCamera(700, 500);

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
load_mesh_json();
window["sunPosition"] = meshes[3].position;

// Creating a camera for this scene
const position = [0,5,20], target = [0, 8, 0], up = [0, 1, 0];
let camera = new Camera(position, target, up);
let keys = {};

// Light used in the scene
light = {position: [0,5,18],direction : [1,1,1], color : [1.0, 1.0, 1.0], ambient: [0.1,0.1,0.1] };



function main(){
    // Adding event listener for keyboard
    window.addEventListener('keydown', (e) => {keys[e.key] = true;});
    window.addEventListener('keyup', (e) => {keys[e.key] = false;});

    draw();
}


main();