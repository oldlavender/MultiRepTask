import { BaseModel } from "./BaseModel.mjs";
import { RandomObjectGenerator } from "../lib/utils/RandomObjectGenerator.mjs";

export class WugTug extends BaseModel {
    constructor(objType = ModelType.UNDEFINED, bgColorTriplet = {}) {
        super(objType, ModelSpec.WugTug);
        this.initializeColor(bgColorTriplet);
    }

    initializeColor(bgColor = {}) {
        this.data.color = ModelSpec.WugTug.DefaultColor;
        this.AssignOrGenerateTripletColor('red', bgColor);
        this.AssignOrGenerateTripletColor('green', bgColor);
        this.AssignOrGenerateTripletColor('blue', bgColor);
    }

    AssignOrGenerateTripletColor(color, triplet = {}) {
        if (triplet.hasOwnProperty(color)) {
            this.SetColorChannel(color, triplet[color]);
        }
        else {
            this.SetColorChannel(color, 
                                 this.RandomlyAssignColorChannel());
        }
    }

    IsColorSet() {
        let c = this.data.color;
        return c.hasOwnProperty('red') && 
               c.hasOwnProperty('green') && 
               c.hasOwnProperty('blue');
    }

    SetColorTriplet(colorTriplet = {}) {
        this.data.color = colorTriplet;
        this.calculateRgbHex();
    }

    SetColorChannel(channel, value) {
        this.data.color[channel] = value;
        this.calculateRgbHex();
    }

    calculateRgbHex() {
        this.data.colorRgbHex = "rgb(";
        this.data.colorRgbHex += this.data.color.red.toString(10) + ",";
        this.data.colorRgbHex += this.data.color.green.toString(10) + ",";
        this.data.colorRgbHex += this.data.color.blue.toString(10) + ")";
    }

    RandomlyAssignColorChannel() {
        let rgen = new RandomObjectGenerator(1, 255);
        return rgen.Generate(); 
    }

    RandomlyAssignColorTriplet() {
        let ret = {
            red: this.RandomlyAssignColorChannel(),
            green: this.RandomlyAssignColorChannel(),
            blue: this.RandomlyAssignColorChannel(),
        };
        return ret;
    }

    addSuplementaryData() {
        if (this.objectType & ModelType.WUG) {
            this.data.image = this.model.ImageSpec.Wug;
        }
        else {
            this.data.image = this.model.ImageSpec.Tug;
        }
    }

    SetObjectType(objType = ModelType.RANDOM) {
        super.SetObjectType(objType);
        this.addSuplementaryData();
    }

    Generate(type=ModelType.UNDEFINED) {
        super.Generate(type);
        this.initializeColor({});
    }

}