import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyPlane } from "./MyPlane.js";
import { MySphere } from "./MySphere.js";
import { MyPanorama } from "./MyPanorama.js"
import { MyGarden } from "./MyGarden.js";
import { MyBee } from "./MyBee.js";
import { MySemiSphere } from "./MySemiSphere.js";
import { MyCilinder } from "./MyCilinder.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyRockSet } from "./MyRockSet.js";
import { MyRock } from "./MyRock.js";
import { MyCircle } from "./MyCircle.js";
import { MyGrass } from "./MyGrass.js";
import { MyHive } from "./MyHive.js";
import { MyUnitCubeQuad } from "./MyUnitCubeQuad.js";

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
    this.displayHive = true;
    this.beePov = false;
    this.scaleFactor = 1;
    this.Slices = 16;
    this.Stacks = 10;
    this.NumberOfTubes = 5;
    this.gardenRows = 4;
    this.gardenCols = 4;
    this.speedFactor = 2;

    this.appearance = new CGFappearance(this);
    this.appearance.setTexture(new CGFtexture(this, "images/grass3.png"));
    this.appearance.setTextureWrap('REPEAT', 'REPEAT');

    this.cloudMap = new CGFtexture(this, "images/cloudMap.jpg");

    this.petal_stemAppearance = new CGFappearance(this);
    this.petal_stemAppearance.setTexture(new CGFtexture(this, "images/stem.png"));
    this.petal_stemAppearance.setTextureWrap('REPEAT', 'REPEAT');

    this.leafappearance = new CGFappearance(this);
    this.leafappearance.setTexture(new CGFtexture(this, "images/leaf.jpg"));
    this.leafappearance.setTextureWrap('REPEAT', 'REPEAT');

    this.flowerAppearance = new CGFappearance(this);
    this.flowerAppearance.setTexture(new CGFtexture(this, "images/flower.jpg"));
    this.flowerAppearance.setTextureWrap('REPEAT', 'REPEAT');

    this.rockAppearance = new CGFappearance(this);
    this.rockAppearance.setTexture(new CGFtexture(this, "images/rock.jpg"));
    this.rockAppearance.setTextureWrap('REPEAT', 'REPEAT');

    this.grassAppearance = new CGFappearance(this);
    this.grassAppearance.setTexture(new CGFtexture(this, "images/grassBlade.jpg"));
    this.grassAppearance.setTextureWrap('REPEAT', 'REPEAT');

    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.plane = new MyPlane(this, 30);
    this.panorama = new MyPanorama(this, 50, 50, "backround1.jpg");
    this.sphere = new MySphere(this, this.Slices, this.Stacks, false, true);
    this.semiSphere = new MySemiSphere(this, this.Slices, this.Stacks);
    this.cilinder = new MyCilinder(this, this.Slices, this.Stacks);
    this.triangle = new MyTriangle(this);
    this.circle = new MyCircle(this, 50);
    this.cube = new MyUnitCubeQuad(this);
    this.garden = new MyGarden(this, this.Slices, this.Stacks, this.gardenRows, this.gardenCols, this.sphere, this.cilinder, this.semiSphere, this.triangle,this.petal_stemAppearance,this.leafappearance,this.flowerAppearance);
    this.rockSet = new MyRockSet(this, this.Slices, this.Stacks,5);
    this.rock = new MyRock(this, this.Slices, this.Stacks);
    this.bee = new MyBee(this, this.Slices, this.Stacks, this.circle);
    this.grass = new MyGrass(this,4,50,50,this.grassAppearance);
    this.grassShader = new CGFshader(this.gl, "shaders/grass.vert", "shaders/grass.frag"),
    this.grassShader.setUniformsValues({ timeFactor: 0 });
    this.hive = new MyHive(this, this.cube);
    this.cloudShader = new CGFshader(this.gl, "shaders/clouds.vert", "shaders/clouds.frag"),
    this.cloudShader.setUniformsValues({ timeFactor: 0, uSampler: 0, uSampler2: 1 });
    this.flowerPollen = null;

    this.enableTextures(true);

    // animações
    this.setUpdatePeriod(0.000001);

    this.appStartTime = Date.now();

    this.beeVal = 0;
  }

  update(t) {
    // animação contínua baseada no tempo atual e app start time
    this.grassShader.setUniformsValues({ timeFactor: (t - this.appStartTime) / 1000.0 });
    this.cloudShader.setUniformsValues({ timeFactor: (t - this.appStartTime) / 1000.0 });
    const timeSinceAppStart = (t - this.appStartTime) / 1000.0;
    this.bee.update(timeSinceAppStart);
    this.checkKeys();
    this.checkHiveCollision();
  }

  checkFlowerCollision() {

    const beePos = this.bee.getPos();

    this.garden.getFlowers().forEach((flower) => {
      const receptacleRadius = flower.getReceptacleRadius();
      const [_stemX, stemY, _stemZ] = flower.getStemPos();
      const pos = flower.getPos();

      const beeDistanceToRecptacle = Math.sqrt(
       (beePos.z - pos.z) ** 2 +
       (beePos.y - stemY) ** 2 +
       (beePos.x - pos.x) ** 2
      );

      if (beeDistanceToRecptacle <= receptacleRadius + 1) {
        this.bee.setCollision(true);
        const pollen = flower.getPollen();
        if (pollen != null) {
          this.flowerPollen = Object.assign(pollen);
          flower.removePollen();
        }
      }
      
    });

  }

  checkHiveCollision() {
    const beePos = this.bee.getPos();
    const hivePos = this.hive.getPos();

    const distanceX = hivePos.x - beePos.x;
    const distanceY = hivePos.y - beePos.y;
    const distanceZ = hivePos.z - beePos.z;
    const distance = Math.sqrt(distanceX**2 + distanceY**2 + distanceZ**2);

    if (distance < 10) {
      const pollen = this.bee.getPollen();

      if (pollen == null) {
        this.bee.setCollision(false);
        return;
      }
      this.bee.goingToHive = false;
      this.bee.setCollision(true);
      this.flowerPollen = pollen;
      this.bee.removePollen();
      this.hive.addPollen(this.flowerPollen);
      this.flowerPollen = null;
      return;
    }
  }

  checkKeys() {
    let text = "Keys pressed:";
    let keysPressed = false;

    if (this.beePov) {
      this.updateCamera();
    }

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

    if (this.gui.isKeyPressed("KeyF")) {
      text += " F";
      keysPressed = true;
      this.bee.verticalAcceleration(-0.2);
      this.checkFlowerCollision();
    }

    if (this.gui.isKeyPressed("KeyP")) {
      text += " P";
      keysPressed = true;
      this.bee.verticalAcceleration(0.2, this.flowerPollen);
    }

    if (this.gui.isKeyPressed("KeyO")) {
      text += " O";
      keysPressed = true;
      this.bee.goToHive(this.hive.getPos());
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
      this.bee.verticalAcceleration(0);
    }
  }

  initLights() {
    this.lights[0].setPosition(0, 200, -200, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].setSpecular(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].setVisible(true);
    this.lights[0].update();

    this.lights[1].setPosition(150, 150, -150, 1);
    this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[1].setSpecular(1.0, 1.0, 1.0, 1.0);
    this.lights[1].enable();
    this.lights[1].setVisible(true);
    this.lights[1].update();

    this.lights[2].setPosition(-150,  150, -150, 1);
    this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[2].setSpecular(1.0, 1.0, 1.0, 1.0);
    this.lights[2].enable();
    this.lights[2].setVisible(true);
    this.lights[2].update();
  }


  initCameras() {
    this.camera = new CGFcamera(
      2,
      0.1,
      1000,
      vec3.fromValues(0, -35, 10),
      vec3.fromValues(0, -35, 0)
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

  updateCamera() {
    this.camera.setTarget(vec3.fromValues(this.bee.pos.x, this.bee.pos.y - 50, this.bee.pos.z));
    this.camera.setPosition(vec3.fromValues(this.bee.pos.x + 10, this.bee.pos.y - 50, this.bee.pos.z));
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

    this.lights[0].update();
    this.lights[1].update();
    this.lights[2].update();

    // Draw axis
    if (this.displayAxis) {
      this.pushMatrix();
      // this.translate(0, -50, 0);
      this.translate(0, 0, 0);
      this.axis.display();
      this.popMatrix();
    }

    if (this.beePov) {
      this.updateCamera();
    }

    // ---- BEGIN Primitive drawing section

    this.pushMatrix();
    this.appearance.apply();
    this.translate(0, -50, 0);
    this.scale(400, 400, 400);
    this.rotate(-Math.PI / 2.0, 1, 0, 0);
    this.plane.display();
    this.popMatrix();

    this.setActiveShader(this.cloudShader);
    this.pushMatrix();
    this.cloudMap.bind(1);
    this.panorama.display();
    this.popMatrix();
    this.setActiveShader(this.defaultShader);
    
    if (this.displayBee) {
      this.pushMatrix();
      this.translate(0, -20, 0);
      this.bee.display();
      this.popMatrix();
    }
    
    this.pushMatrix();
    this.translate(20, -50, -60);
    this.scale(2, 2, 2);
    this.rockAppearance.apply();
    this.rockSet.display();
    this.popMatrix();

    this.pushMatrix();
    this.translate(-20, -49, -80);
    this.scale(20, 20, 20);
    this.rock.display();
    this.popMatrix();
    

    this.pushMatrix();
    this.appearance.apply();
    this.translate(0, -50, 0);
    this.garden.display();
    this.popMatrix();

    
    this.setActiveShader(this.grassShader);
    this.pushMatrix();
    this.translate(0, -50 , -10);
    this.grass.display();
    this.popMatrix();
    this.setActiveShader(this.defaultShader) 

    if (this.displayHive) {
      this.pushMatrix();
      this.translate(-25, -39 , -85);
      this.scale(2,2,2)
      this.hive.display();
      this.popMatrix();
    }

    // ---- END Primitive drawing section
  }

}
