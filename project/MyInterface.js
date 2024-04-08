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

        //Slider element in GUI
        this.gui.add(this.scene, 'scaleFactor', 0.1, 5).name('Scale Factor');

        //Slider element in GUI
        this.gui.add(this.scene, 'Slices', 0.01, 1.0).name('Slices').onChange(this.scene.updateSphereSlices.bind(this.scene));

        //Slider element in GUI
        this.gui.add(this.scene, 'Stacks', 0.01, 1.0).name('Stacks').onChange(this.scene.updateSphereStacks.bind(this.scene));

        return true;
    }
}