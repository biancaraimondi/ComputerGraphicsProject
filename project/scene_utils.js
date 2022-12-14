function pushMesh(name, obj, mtl, position){
    let mesh = new MeshObj(name, obj, mtl, position, gl);
    meshes.push(mesh);
}

// and then creates all the  mesh objects that will be used.
function load_mesh(){
    // Load all objects in ./objects folder
    pushMesh("umbrella", "./objects/umbrella/umbrella.obj", "./objects/umbrella/umbrella.mtl", [0, 0, 0]);
    pushMesh("lettino_dx", "./objects/lettino/lettino.obj", "./objects/lettino/lettino.mtl", [3, 0, 0]);
    pushMesh("lettino_sx","./objects/lettino/lettino.obj", "./objects/lettino/lettino.mtl", [-3, 0, 0]);
    pushMesh("sun", "./objects/sun/sun.obj", "./objects/sun/sun.mtl", [0, 12, 0]);
    pushMesh("sand", "./objects/sand/sand.obj", "./objects/sand/sand.mtl", [0, 0, 0]);
    pushMesh("secchiello", "./objects/secchiello/secchiello.obj", "./objects/secchiello/secchiello.mtl", [-1, 0, 4]);
    pushMesh("castello", "./objects/castello/castello.obj", "./objects/castello/castello.mtl", [-2, 0, 4]);
}

// Compute the projection matrix
function projectionMatrix(){
    let fieldOfViewRadians = degToRad(60);
    let aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    let zmin=0.1;
    return m4.perspective(fieldOfViewRadians, aspect, zmin, 200);
}

// Move the camera using keyboard
function key_controller(){
    let step = 0.05;

    if (keys["s"]){
        camera.dolly(-step)
    }
    if (keys["a"]){
        camera.truck(-step)
    }
    if (keys["d"]){
        camera.truck(step)
    }
    if (keys["q"]){
        camera.pedestal(step)
    }
    if (keys["ArrowUp"]){
        camera.tilt(step)
    }
    if (keys["ArrowDown"]){
        camera.tilt(-step)
    }
    if (keys["ArrowLeft"]){
        camera.pan(step)
    }
    if (keys["ArrowRight"]){
        camera.pan(-step)
    }
    if (keys["r"]){
        camera.align()
    }
}

// function used to prepare the shadow map
function prepareShadows(){
    // Shadow map texture
    shadow.depthTexture = gl.createTexture();
    shadow.depthTextureSize = 4096; // Texture resolution
    gl.bindTexture(gl.TEXTURE_2D, shadow.depthTexture);
    gl.texImage2D(
        gl.TEXTURE_2D,                 // target
        0,                                  // mip level
        gl.DEPTH_COMPONENT,            // internal format
        shadow.depthTextureSize,       // width
        shadow.depthTextureSize,       // height
        0,                                  // border
        gl.DEPTH_COMPONENT,            // format
        gl.UNSIGNED_INT,               // type
        null);                              // objects
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    shadow.depthFramebuffer = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, shadow.depthFramebuffer);
    gl.framebufferTexture2D(
        gl.FRAMEBUFFER,            // target
        gl.DEPTH_ATTACHMENT,       // attachment point
        gl.TEXTURE_2D,             // texture target
        shadow.depthTexture,       // texture
        0);                       // mip level

    shadow.fov = 80;
    shadow.projWidth = 2;
    shadow.projHeight = 2;
    shadow.zFarProj = 50;
    shadow.bias = -0.006;
}

// Draw everything in the scene on the canvas.
function draw() {
    // Resizing the canvas to the window size
    resizeCanvasToDisplaySize(gl.canvas);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    key_controller();

    gl.enable(gl.CULL_FACE);
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    let proj = projectionMatrix()

    function bindFrameBufferNull(){
        // draw scene to the canvas projecting the depth texture into the scene
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

        gl.clearColor(skyRed, skyGreen, skyBlue, 0.8);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    }

    // edit the angle of the sun if sun is moving, i.e. if the slider is not pressed
    if (!sunStopped){
        if (angle === -55) {
            angle = 55;
        } else {
            angle -= 0.5;
        }
        // change colors of the sky and of the objects using the sun position
        setObjectsColorsBySun();
    }

    // set the light position based on the sun position
    let x = sunPosition[0] * Math.cos(degToRad(angle)) - sunPosition[1] * Math.sin(degToRad(angle));
    let y = sunPosition[0] * Math.sin(degToRad(angle)) + sunPosition[1] * Math.cos(degToRad(angle));
    light.position = [x, y, sunPosition[2]];
    light.color = [1, objGreen, objBlue];


    const lightWorldMatrix = m4.lookAt(
        light.position,     // position
        light.direction,    // target
        [0, 1, 0],          // up
    );

    const lightProjectionMatrix = m4.perspective(
        degToRad(shadow.fov),
        shadow.projWidth / shadow.projHeight,
        0.5,                        // near
        shadow.zFarProj);     // far

    let sharedUniforms = {
        u_view: m4.inverse(lightWorldMatrix),                  // View Matrix
        u_projection: lightProjectionMatrix,                   // Projection Matrix
        u_bias: shadow.bias,
        u_textureMatrix: m4.identity(),
        u_projectedTexture: shadow.depthTexture,
        u_reverseLightDirection: lightWorldMatrix.slice(8, 11),
    };

    // draw to the depth texture
    gl.bindFramebuffer(gl.FRAMEBUFFER, shadow.depthFramebuffer);
    gl.viewport(0, 0, shadow.depthTextureSize, shadow.depthTextureSize);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    if(!shadowStopped){
        meshes.forEach(m => {
            // Program used to draw from the light perspective
            if (m.name !== "sun") {
                m.render(gl, colorProgramInfo, sharedUniforms);
            }
        });
    }

    bindFrameBufferNull()

    let textureMatrix = m4.identity();
    textureMatrix = m4.translate(textureMatrix, 0.5, 0.5, 0.5);
    textureMatrix = m4.scale(textureMatrix, 0.5, 0.5, 0.5);
    textureMatrix = m4.multiply(textureMatrix, lightProjectionMatrix);
    // use the inverse of this world matrix to make
    // a matrix that will transform other positions
    // to be relative this world space.
    textureMatrix = m4.multiply(
        textureMatrix,
        m4.inverse(lightWorldMatrix));


    sharedUniforms = {
        u_view: camera.getViewMatrix(),
        u_projection: proj,
        u_bias: shadow.bias,
        u_textureMatrix: textureMatrix,
        u_projectedTexture: shadow.depthTexture,
        u_reverseLightDirection: lightWorldMatrix.slice(8, 11),
        u_worldCameraPosition: camera.getPosition(),
        u_lightPosition: light.position,
        u_lightColor: light.color,
    };

    meshes.forEach(m => {
        // if the mesh is the sun do not draw the shadow on it
        if(shadowStopped || m.name === "sun"){
            let sharedUniforms2 = {
                u_ambientLight: light.ambient,                      // Ambient
                u_lightDirection: m4.normalize(light.direction),    // Light Direction
                u_lightColor: light.color,                          // Light Color
                u_view: camera.getViewMatrix(),                     // View Matrix
                u_projection: projectionMatrix(),                   // Projection Matrix
                u_viewWorldPosition: camera.getPosition(),          // Camera position
                u_lightPosition: (light.position),
            };
            // Program used to draw the scene from the camera perspective
            m.render(gl, program, sharedUniforms2);
        } else {
            // Program used to draw the scene from the camera perspective
            m.render(gl, textureProgramInfo, sharedUniforms);
        }
    });

    requestAnimationFrame(draw);
}