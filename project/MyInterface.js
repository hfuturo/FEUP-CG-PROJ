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

        //Slider element in GUI
        this.gui.add(this.scene, 'scaleFactor', 0.1, 5).name('Scale Factor');

        //Slider element in GUI
        this.gui.add(this.scene, 'Slices', 0.01, 1.0).name('Slices').onChange(this.scene.updateSphereSlices.bind(this.scene));

        //Slider element in GUI
        this.gui.add(this.scene, 'Stacks', 0.01, 1.0).name('Stacks').onChange(this.scene.updateSphereStacks.bind(this.scene));

        //Checkbox for normals
        this.gui.add(this.scene, 'displayNormals').name("Display Normals");

        //Slider element for Garden Rows in GUI
        this.gui.add(this.scene, 'gardenRows', 1, 15).name("Garden Rows").onChange(this.scene.updateGardenRows.bind(this.scene));

        //Slider element for Garden Cols in GUI
        this.gui.add(this.scene, 'gardenCols', 1, 15).name("Garden Cols").onChange(this.scene.updateGardenCols.bind(this.scene));

        return true;
    }
}