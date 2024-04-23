import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyPlane } from "./MyPlane.js";
import { MySphere } from "./MySphere.js";
import { MyPanorama } from "./MyPanorama.js"
import { MyGarden } from "./MyGarden.js";
import { MySemiSphere } from "./MySemiSphere.js";
import { MyCilinder } from "./MyCilinder.js";
import { MyTriangle } from "./MyTriangle.js";

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

    //Objects connected to MyInterface
    this.displayAxis = true;
    this.scaleFactor = 1;
    this.Slices = 16;
    this.Stacks = 10;
    this.NumberOfTubes = 5;
    this.displayNormals = false;
    this.gardenRows = 1;
    this.gardenCols = 1;

    this.appearance = new CGFappearance(this);
    this.appearance.setTexture(new CGFtexture(this, "images/terrain.jpg"));
    this.appearance.setTextureWrap('REPEAT', 'REPEAT');

    this.petal_stemAppearance = new CGFappearance(this);
    this.petal_stemAppearance.setTexture(new CGFtexture(this, "images/stem.png"));
    this.petal_stemAppearance.setTextureWrap('REPEAT', 'REPEAT');

    this.leafappearance = new CGFappearance(this);
    this.leafappearance.setTexture(new CGFtexture(this, "images/leaf.jpg"));
    this.leafappearance.setTextureWrap('REPEAT', 'REPEAT');

    this.flowerAppearance = new CGFappearance(this);
    this.flowerAppearance.setTexture(new CGFtexture(this, "images/flower.jpg"));
    this.flowerAppearance.setTextureWrap('REPEAT', 'REPEAT');

    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.plane = new MyPlane(this, 30);
    this.panorama = new MyPanorama(this, 50, 50, "Panorama4.jpg");
    this.sphere = new MySphere(this, this.Slices, this.Stacks, false, true);
    this.semiSphere = new MySemiSphere(this, this.Slices, this.Stacks);
    this.cilinder = new MyCilinder(this, this.Slices, this.Stacks);
    this.triangle = new MyTriangle(this);
    this.garden = new MyGarden(this, this.Slices, this.Stacks, this.gardenRows, this.gardenCols, this.sphere, this.cilinder, this.semiSphere, this.triangle,this.petal_stemAppearance,this.leafappearance,this.flowerAppearance);
    this.enableTextures(true);


  }
  initLights() {
    this.lights[0].setPosition(15, 0, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }
  initCameras() {
    this.camera = new CGFcamera(
      1.0,
      0.1,
      300,
      vec3.fromValues(0.1, 17, 0.1),
      vec3.fromValues(0, 0.1, 0)
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

  updateGardenRows(gardenRows) {
    this.gardenRows = Math.round(gardenRows);
    this.garden.updateMatrix(Math.round(gardenRows), this.gardenCols);
  }

  updateGardenCols(gardenCols) {
    this.gardenCols = Math.round(gardenCols);
    this.garden.updateMatrix(this.gardenRows, Math.round(gardenCols));
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
    this.translate(0, -100, 0);
    this.scale(400, 400, 400);
    this.rotate(-Math.PI / 2.0, 1, 0, 0);
    this.plane.display();
    this.popMatrix();

    this.panorama.display();

    this.pushMatrix();
    this.appearance.apply();
    this.garden.display();
    this.popMatrix();

    // ---- END Primitive drawing section
  }
}
