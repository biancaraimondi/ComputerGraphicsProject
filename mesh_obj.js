class MeshObj {

    constructor(obj, mtl, position, rotate, gl) {
        this.obj_source = obj;   // Path to obj file
        this.mtl_source = mtl;   // Path to mtl file
        this.position = position;       // Where to move the mesh once loaded

        this.mesh = [];                         // This object stores all the mesh information
        this.mesh.sourceMesh = this.obj_source; // .sourceMesh is used in load_mesh.js
        this.mesh.fileMTL = this.mtl_source;    // .fileMTL is used in load_mesh.js

        this.rotate = rotate;
        if (rotate === true) {
            this.rotate = rotate;
            this.angle = 0;
            light.position = position;
        }
        this.angle = 90;
        //this.anticlockwise = 1;

        this.ready = false;

        LoadMesh(gl, this.mesh).then(() => { // After loading the mesh...
            this.prepare_mesh(gl).then(() => {})
            this.ready = true; // now the mesh is ready to be rendered
        });
    }

    async prepare_mesh(gl){

        // Generic material
        const defaultMaterial = {
            // Setting default material properties
            diffuse: [1, 1, 1],
            diffuseMap: this.mesh.textures.defaultWhite,
            ambient: [0, 0, 0],
            specular: [1, 1, 1],
            opacity: 1,
        };

        // Moving to the initial position
        let z = this.position[2]
        let y = this.position[1]
        let x = this.position[0]


        this.mesh.data.geometries.forEach(geom => {
            // Moving the mesh to the initial position.
            for (let i = 0; i < geom.data.position.length; i = i+3) {
                geom.data.position[i] += (x);
                geom.data.position[i+1] += (y);
                geom.data.position[i+2] += (z);
            }
        })

        this.mesh.parts = this.mesh.data.geometries.map(({material, data}) => {
            if (data.color) {
                if (data.position.length === data.color.length) {
                    data.color = { numComponents: 3, data: data.color };
                }
            } else {
                data.color = { value: [1, 1, 1, 1] };
            }

            const bufferInfo = webglUtils.createBufferInfoFromArrays(gl, data);
            return {
                material: {
                    ...defaultMaterial,
                    ...this.mesh.materials[material],
                },
                bufferInfo,
            };
        });
    }

    render(gl, programInfo, uniforms){
        if (!this.ready) return;    // waiting for async functions to complete

        gl.useProgram(programInfo.program);
        webglUtils.setUniforms(programInfo, uniforms);     // calls gl.uniform

        // compute the world matrix
        let u_world = m4.identity()

        if (this.rotate === true && uniforms.u_textureMatrix !== m4.identity() ){
            u_world = m4.zRotate(u_world, degToRad(this.angle));
            console.log("1: " + light.position);
            console.log("angle: " + degToRad(this.angle));
            console.log("m4: " + m4.zRotate(/*light.position*/u_world, degToRad(this.angle)));
            light.position = m4.zRotate(/*light.position*/u_world, degToRad(this.angle));
            console.log("2: " + light.position);
            //console.log(window.light.position)
            /*
            //sole che rimbalza e torna indietro
            if(this.angle === 90)
                this.anticlockwise = -1;
            else if(this.angle === -90)
                this.anticlockwise = 1;
            this.angle += this.anticlockwise;
             */
            this.angle = this.angle === -90 ? 90 : this.angle-0.5;
        }

        for (const {bufferInfo, material} of this.mesh.parts) {
            // calls gl.bindBuffer, gl.enableVertexAttribArray, gl.vertexAttribPointer
            webglUtils.setBuffersAndAttributes(gl, programInfo, bufferInfo);
            // calls gl.uniform
            webglUtils.setUniforms(programInfo, {
                u_world,
            }, material);
            // calls gl.drawArrays or gl.drawElements
            webglUtils.drawBufferInfo(gl, bufferInfo);
        }
    }
}
