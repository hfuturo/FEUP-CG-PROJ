import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyPlane } from "./MyPlane.js";
import { MySphere } from "./MySphere.js";
import { MyPanorama } from "./MyPanorama.js"
import { MyGarden } from "./MyGarden.js";
import { MyBee } from "./MyBee.js";
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
    this.displayBee = true;
    this.scaleFactor = 1;
    this.Slices = 16;
    this.Stacks = 10;
    this.NumberOfTubes = 5;
    this.displayNormals = false;
    this.gardenRows = 1;
    this.gardenCols = 1;
    this.speedFactor = 1;

    this.appearance = new CGFappearance(this);
    this.appearance.setTexture(new CGFtexture(this, "images/grass.png"));
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
    this.panorama = new MyPanorama(this, 50, 50, "backround1.jpg");
    this.sphere = new MySphere(this, this.Slices, this.Stacks, false, true);
    this.semiSphere = new MySemiSphere(this, this.Slices, this.Stacks);
    this.cilinder = new MyCilinder(this, this.Slices, this.Stacks);
    this.triangle = new MyTriangle(this);
    this.garden = new MyGarden(this, this.Slices, this.Stacks, this.gardenRows, this.gardenCols, this.sphere, this.cilinder, this.semiSphere, this.triangle,this.petal_stemAppearance,this.leafappearance,this.flowerAppearance);
    this.bee = new MyBee(this, this.Slices, this.Stacks, this.triangle);
    this.enableTextures(true);

    // animações
    this.setUpdatePeriod(10);

    this.appStartTime = Date.now();

    this.beeVal = 0;
  }

  update(t) {
    // animação contínua baseada no tempo atual e app start time
    const timeSinceAppStart = (t - this.appStartTime) / 1000.0;
    this.bee.update(timeSinceAppStart);
    this.checkKeys();
  }

  checkKeys() {
    console.log(this.gui.activeKeys);
    let text = "Keys pressed:";
    let keysPressed = false;

    // Check for key codes e.g. in https://keycode.info/
    if (this.gui.isKeyPressed("KeyW")) {
      text += " W";
      keysPressed = true;
      this.bee.accelerate(0.001);
    }

    if (this.gui.isKeyPressed("KeyS")) {
      text += " S";
      keysPressed = true;
      this.bee.accelerate(-0.001);
    }

    if (this.gui.isKeyPressed("KeyA")) {
      text += " A";
      keysPressed = true;
      this.bee.turn(2);
    }

    if (this.gui.isKeyPressed("KeyD")) {
      text += " D";
      keysPressed = true;
      this.bee.turn(-2);
    }

    if (this.gui.isKeyPressed("KeyR")) {
      text += " R";
      keysPressed = true;
      this.bee.reset();
    }

    if (keysPressed) {
      console.log(text);
    }
    else {
      this.bee.accelerate(0);
      this.bee.turn(0);
    }
  }

  initLights() {
    this.lights[0].setPosition(-30, 100, 30, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].setSpecular(1.0, 1.0, 1.0, 1.0);
    //this.lights[0].setLinearAttenuation(0.00005);
    this.lights[0].enable();
    this.lights[0].update();
    this.lights[1].setPosition(-15,  100, 5, 1);
    this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[1].setSpecular(1.0, 1.0, 1.0, 1.0);
    //this.lights[1].setLinearAttenuation(0.00005);
    this.lights[1].enable();
    this.lights[1].update();
    this.lights[2].setPosition(0,  100, 15, 1);
    this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[2].setSpecular(1.0, 1.0, 1.0, 1.0);
    //this.lights[2].setLinearAttenuation(0.00005);
    this.lights[2].enable();
    this.lights[2].update();
  }


  initCameras() {
    this.camera = new CGFcamera(
      2,
      0.1,
      1000,
      vec3.fromValues(2, -25, 2),
      vec3.fromValues(0, -50, 0)
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

  updateSpeedFactor(speedFactor) {
    this.speedFactor = speedFactor;
  }

  updateBeeScale(scaleFactor) {
    this.scaleFactor = scaleFactor;
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
    if (this.displayAxis) {
      this.pushMatrix();
      this.translate(0, -50, 0);
      this.axis.display();
      this.popMatrix();
    }

    // ---- BEGIN Primitive drawing section

    this.pushMatrix();
    this.appearance.apply();
    this.translate(0, -50, 0);
    this.scale(400, 400, 400);
    this.rotate(-Math.PI / 2.0, 1, 0, 0);
    this.plane.display();
    this.popMatrix();

    this.pushMatrix();
    this.panorama.display();
    this.popMatrix();
    
    if (this.displayBee) {
      this.pushMatrix();  
      this.bee.display();
      this.popMatrix();
    }

    this.pushMatrix();
    this.appearance.apply();
    this.translate(0, -50, 0);
    this.garden.display();
    this.popMatrix();

    // ---- END Primitive drawing section
  }

}
