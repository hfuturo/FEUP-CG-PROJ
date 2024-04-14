import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyPlane } from "./MyPlane.js";
import { MySphere } from "./MySphere.js";
import { MyPanorama } from "./MyPanorama.js";
import { MyFlower } from "./MyFlower.js";
import { generateRandomNumber } from "./utils.js";

/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
  constructor() {
    super();
  }
  init(application) {
    super.init(application);
    
    this.initCameras();
    this.initLights();

    //Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    const numberOfPetals = generateRandomNumber(15, 10);
    const petalSize = 1 + generateRandomNumber(5, 1) * 0.1;   // 1
    const receptacleRadius = 1 + generateRandomNumber(5, 1) * 0.1; // 1
    const stemRadius = generateRandomNumber(3, 1) * 0.1; // 0.2
    
    //Objects connected to MyInterface
    this.displayAxis = true;
    this.scaleFactor = 1;
    this.Slices = 16;
    this.Stacks = 10;
    this.displayNormals = false;
    
    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.plane = new MyPlane(this,30);
    this.sphere = new MySphere(this, this.Slices, this.Stacks);
    this.panorama = new MyPanorama(this, 50, 50, "Panorama4.jpg");
    this.flower = new MyFlower(this, this.Slices, this.Stacks, petalSize, numberOfPetals, receptacleRadius, stemRadius);
    
    this.enableTextures(true);

    this.texture = new CGFtexture(this, "images/terrain.jpg");
    this.appearance = new CGFappearance(this);
    this.appearance.setTexture(this.texture);
    this.appearance.setTextureWrap('REPEAT', 'REPEAT');

  }
  initLights() {
    this.lights[0].setPosition(15, 0, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }
  initCameras() {
    this.camera = new CGFcamera(
      2.0,
      0.1,
      1000,
      vec3.fromValues(0, 5, 5),
      vec3.fromValues(0, 5, 0)
    );
  }
  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }

  updateSphereSlices(Slices) {
    console.log("Vertical Slices: " + Slices);
    console.log("Updating sphere with verticalSlices: " + Slices + " and horizontalSlices: " + this.Stacks);
    this.Slices = Slices;
    this.sphere.updateBuffers(Slices, this.Stacks);
  }
  updateSphereStacks(Stacks) {
    console.log("Horizontal Slices: " + Stacks);
    console.log("Updating sphere with verticalSlices: " + this.Slices + " and horizontalSlices: " + Stacks);
    this.Stacks = Stacks;
    this.sphere.updateBuffers(this.Slices, Stacks);
  }
  display() {
    // ---- BEGIN Background, camera and axis setup
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();
    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    // Draw axis
    if (this.displayAxis) this.axis.display();

    // ---- BEGIN Primitive drawing section

    this.pushMatrix();
    this.appearance.apply();
    this.translate(0,-100,0);
    this.scale(400,400,400);
    this.rotate(-Math.PI/2.0,1,0,0);
    this.plane.display();
    this.popMatrix();

    this.pushMatrix();
    this.panorama.display();
    this.popMatrix();
    
    this.pushMatrix();
    this.flower.display();    
    this.popMatrix();

    if (this.displayNormals) {
      this.flower.enableNormalViz();
    }
    else {
      this.flower.disableNormalViz();
    }

    // ---- END Primitive drawing section
  }
}
