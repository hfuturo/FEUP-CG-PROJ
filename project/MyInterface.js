import {CGFinterface, dat} from '../lib/CGF.js';

/**
* MyInterface
* @constructor
*/
export class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        
        // init GUI. For more information on the methods, check:
        // https://github.com/dataarts/dat.gui/blob/master/API.md
        this.gui = new dat.GUI();

        //Checkbox element in GUI
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');

        this.gui.add(this.scene, 'displayBee').name('Display Bee');

        this.gui.add(this.scene, 'beePov').name('Bee POV');

        this.gui.add(this.scene, 'displayHive').name('Display Hive');

        //Slider element in GUI
        //this.gui.add(this.scene, 'scaleFactor', 0.1, 5).name('Scale Factor');

        //Slider element in GUI
        this.gui.add(this.scene, 'Slices', 0.01, 1.0).name('Slices').onChange(this.scene.updateSphereSlices.bind(this.scene));

        //Slider element in GUI
        this.gui.add(this.scene, 'Stacks', 0.01, 1.0).name('Stacks').onChange(this.scene.updateSphereStacks.bind(this.scene));

        //Slider element for Garden Rows in GUI
        this.gui.add(this.scene, 'gardenRows', 1, 15).name("Garden Rows").onChange(this.scene.updateGardenRows.bind(this.scene));

        //Slider element for Garden Cols in GUI
        this.gui.add(this.scene, 'gardenCols', 1, 15).name("Garden Cols").onChange(this.scene.updateGardenCols.bind(this.scene));

        this.gui.add(this.scene, 'speedFactor', 0.1, 3).name("Speed Factor").onChange(this.scene.updateSpeedFactor.bind(this.scene));

        this.gui.add(this.scene, 'scaleFactor', 0.5, 3).name("Scale Bee").onChange(this.scene.updateBeeScale.bind(this.scene));

        const f0 = this.gui.addFolder('Light 1 ');
        f0.add(this.scene.lights[0], 'enabled').name("Enabled");
        const sf0 = f0.addFolder('Light 1 Position');
        sf0.add(this.scene.lights[0].position, '0', -200, 200).name("X Position");
        sf0.add(this.scene.lights[0].position, '1', -200, 200).name("Y Position");
        sf0.add(this.scene.lights[0].position, '2', -200, 200).name("Z Position");

        const f1 = this.gui.addFolder('Light 2 ');
        f1.add(this.scene.lights[1], 'enabled').name("Enabled");
        const sf1 = f1.addFolder('Light 2 Position');
        sf1.add(this.scene.lights[1].position, '0', -200, 200).name("X Position");
        sf1.add(this.scene.lights[1].position, '1', -200, 200).name("Y Position");
        sf1.add(this.scene.lights[1].position, '2', -200, 200).name("Z Position");

        const f2 = this.gui.addFolder('Light 3 ');
        f2.add(this.scene.lights[2], 'enabled').name("Enabled");
        const sf2 = f2.addFolder('Light 3 Position');
        sf2.add(this.scene.lights[2].position, '0', -200, 200).name("X Position");
        sf2.add(this.scene.lights[2].position, '1', -200, 200).name("Y Position");
        sf2.add(this.scene.lights[2].position, '2', -200, 200).name("Z Position");

        this.initKeys();

        return true;
    }

    initKeys() {
        // create reference from the scene to the GUI
        this.scene.gui=this;

        // disable the processKeyboard function
        this.processKeyboard=function(){};

        // create a named array to store which keys are being pressed
        this.activeKeys={};
    }

    processKeyDown(event) {
        // called when a key is pressed down
        // mark it as active in the array
        this.activeKeys[event.code]=true;
    }

    processKeyUp(event) {
        // called when a key is released, mark it as inactive in the array
        this.activeKeys[event.code]=false;
    }

    isKeyPressed(keyCode) {
        // returns true if a key is marked as pressed, false otherwise
        return this.activeKeys[keyCode] || false;
    }

}