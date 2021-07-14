import "./ScreenObjects.js";
import "./lib/lab.js";
import { Revision } from "./Handlers.js";
//import { lab } from "./lib/lab.js";

Revision.ConceptualModel = {
    major: 0,
    minor: 0,
    rev: 24,
    timestamp: '2021-07-13 11:07PM',
};

export const ModelType = {
    UNDEFINED: 0x0000,
    RANDOM: 0x0001,
    HYBRID: 0x0002,
    NAMU: 0x0004,
    BONHO: 0x0008,
    WUG: 0x0010,
    TUG: 0x0020,
    ZILNAR: 0x0040,
    OLBAR: 0x0080,
    get AMBIGUOUS_NAMUBONHO() {
        return this.HYBRID | this.NAMU | this.BONHO;
    },
    get RANDOM_NAMUBONHO_HYBRIDALLOWED() {
        return this.AMBIGUOUS_NAMUBONHO | this.RANDOM;
    },
    get RANDOM_NAMUBONHO() {
        return this.NAMU | this.BONHO | this.RANDOM;
    },
    get RANDOM_WUGTUG() {
        return this.WUG | this.TUG | this.RANDOM;
    }
};

/**
 * 
 * @class   RandomObjectGenerator   Manages the generation of random object specs
 * 
 */
 export class RandomObjectGenerator {
    constructor(min=0, 
                max=0, 
                shiftSize=0, 
                shiftCond=ModelType.UNDEFINED,
                step=1) {
        this.randGenerator = new lab.util.Random();
        this.initialized = false;
        this.hasShift = false;
        this.shift = 0;
        this.shiftCondition = ModelType.UNDEFINED;
        this.custom = false;

        if (min != max) {
            this.SetRange(min, max);
        }

        if (shiftSize != 0) {
            this.SetShift(shiftSize, shiftCond);
        }
    }

    SetCustomArray(ca=[]) {
        this.custom = true;
        this.randRange = ca;
        this.hasShift = false;
    }

    SetRange(start, stop, step=1) {
        this.randRange = [];
        var s = start;
        while (s <= stop) {
            this.randRange.push(s);
            s += step;
        }

        this.initialized = true;
    }

    SetShiftCondition(condition) {
        this.shiftCondition = condition;
    }

    SetShift(size, condition=ModelType.UNDEFINED) {
        if (size == 0) {
            this.hasShift = false;
            return;
        }

        this.hasShift = true;
        this.shift = size;
        this.SetShiftCondition(condition);
    }

    SetShiftOnDiff(baseval1, baseval2, condition=ModelType.UNDEFINED) {
        this.SetShift(baseval2 - baseval1, condition);
    }

    Generate(conditionEval=ModelType.UNDEFINED) {
        let ret = this.randGenerator.choice(this.randRange);

        if (this.hasShift && this.shiftCondition & conditionEval) {
            ret += this.shift;
        }

        return ret;
    }
}

export const ModelSpec = {
    Generic: {
        AllowedModelTypes: [],
        ViableModelTypes: [],
        ViableHybridModelTypes: [],
    },
    NamuBonho: {
        AllowedModelTypes: [ModelType.NAMU, ModelType.BONHO, ModelType.AMBIGUOUS_NAMUBONHO],
        ViableModelTypes: [ModelType.NAMU, ModelType.BONHO],
        ViableHybridModelTypes: [ModelType.NAMU, ModelType.BONHO, ModelType.AMBIGUOUS_NAMUBONHO],
        RectangleWidth: {
            Namu: {
                min: 35,
                max: 55,
            },
            Bonho: {
                min: 85,
                max: 105,
            },
        },
        EllipseWidth: {
            Namu: {
                min: 65,
                max: 90,
            },
            Bonho: {
                min: 105,
                max: 130,
            }
        },
    },
    WugTug: {
        AllowedModelTypes: [ModelType.WUG, ModelType.TUG],
        ViableModelTypes: [ModelType.WUG, ModelType.TUG],
        ViableHybridModelTypes: [],
        DefaultColor: {
            red: 0x88,
            green: 0x88,
            blue: 0x88,
        },
        ImageSpec: {
            Wug: {
                filename: './images/wug_template.png',
                width: 129, //original: 216
                height: 120, //original: 201
            },
            Tug: {
                filename: './images/tug_template.png',
                width: 187, //original: 446
                height: 120, //original: 286
            },
        },
    },
};

export class BaseModel {

    constructor(objType=ModelType.UNDEFINED, model=ModelSpec.Generic) {
        this.data = {
            //object: this,
        };
        this.model = model;
        this.SetObjectType(objType);
    }

    /**
     * 
     * @summary             Sets hybrid status according to the object type
     * @param {*}   type    Specifies the model type to base the hybrid status
     * 
     */
    SetHybrid(type=ModelType.UNDEFINED) {
        if (type & ModelType.HYBRID) {
            this.hybrid = true;
        }
        else {
            this.hybrid = false;
        }
    }

    /**
     * 
     * @abstract          Method to be specialized by children classes
     * @summary           Generates a new object with random specification
     * @param {*}   type  Specifies the model type to be generated or uses the
     *                      current model if undefined (default behavior)
     */
    Generate (type=ModelType.UNDEFINED) {
        if (type != ModelType.UNDEFINED) {
            this.SetObjectType(type);
        }
    }

    RandomlyAssignType() {
        let vTypes, randGen = new lab.util.Random();
        if (this.hybrid) {
            vTypes = this.model.ViableHybridModelTypes;
        }
        else {
            vTypes = this.model.ViableModelTypes;
        }
        return randGen.choice(vTypes);
    }

    SetObjectType(objType = ModelType.RANDOM) {
        let oType;
        this.SetHybrid(objType);
        if (objType & ModelType.RANDOM) {
            oType = this.RandomlyAssignType();
            this.SetHybrid(oType); //Redefine for the new assigned type
        }
        else if (objType != ModelType.UNDEFINED) {
            oType = objType;
        }

        if (objType == ModelType.UNDEFINED) {
            return;
        }

        this.objectType = oType;
        this.data.type = this.GetObjectTypeString();
    }

    GetData() {
        return this.data;
    }

    GetDataCopy() {
        let ret = {};
        for (const [key, value] of Object.entries(this.data)) {
            ret[key] = value;
        }
        return ret;
    }

    GetObjectTypeString() {
        switch (this.objectType) {
            case ModelType.BONHO: return 'bonho';
            case ModelType.NAMU: return 'namu';
            case ModelType.WUG: return 'wug';
            case ModelType.TUG: return 'tug';
            case ModelType.OLBAR: return 'olbar';
            case ModelType.ZILNAR: return 'zilnar';
            case ModelType.AMBIGUOUS_NAMUBONHO: return 'hybrid-namubonho';
            default: return 'undefined';
        }
    }
}

/**
 * 
 * @class   NamuBonho   Models instances of Namus and Bonhos
 * 
 */
 export class NamuBonho extends BaseModel {

    /**
     * 
     * @abstract 
     * 
     */
    constructor(objType = ModelType.UNDEFINED, rectWidth=-1, ellipseWidth=-1) {
        super(objType, ModelSpec.NamuBonho);
        if (rectWidth < 0 && ellipseWidth < 0) {
            this.Generate(objType);
        }
        if (rectWidth > 0) {
            this.SetRectangleWidth(rectWidth);
        }
        if (ellipseWidth > 0) {
            this.SetEllipseWidth(ellipseWidth);
        }
        
    }

    determineType(type=ModelType.UNDEFINED) {
        if (type == ModelType.UNDEFINED) {
            return this.objectType;
        }
        else {
            return type;
        }
    }

    RandomlyAssignRectangleWidth(type=ModelType.UNDEFINED) {
        var cType = this.determineType(type);

        let rgen = new RandomObjectGenerator(
            ModelSpec.NamuBonho.RectangleWidth.Namu.min,
            ModelSpec.NamuBonho.RectangleWidth.Namu.max
        );

        rgen.SetShiftOnDiff(
            ModelSpec.NamuBonho.RectangleWidth.Namu.min,
            ModelSpec.NamuBonho.RectangleWidth.Bonho.min,
            ModelType.BONHO
        );

        return rgen.Generate(cType);
    }

    RandomlyAssignEllipseWidth(type=ModelType.UNDEFINED) {
        var cType = this.determineType(type);

        let rgen = new RandomObjectGenerator(
            ModelSpec.NamuBonho.EllipseWidth.Namu.min,
            ModelSpec.NamuBonho.EllipseWidth.Namu.max
        );
        rgen.SetShiftOnDiff(
            ModelSpec.NamuBonho.EllipseWidth.Namu.min,
            ModelSpec.NamuBonho.EllipseWidth.Bonho.min,
            ModelType.BONHO
        );

        return rgen.Generate(cType);
    }

    SetRectangleWidth(width=-1) {
        let w = width;
        if (w < 0) {
            w = this.RandomlyAssignRectangleWidth();
        }

        this.data.rectangleWidth = w;

        // @TODO: implement validation in a future
    }
    SetEllipseWidth(width=-1) {
        let w = width;
        if (w < 0) {
            w = this.RandomlyAssignEllipseWidth();
        }

        this.data.ellipseWidth = w;
        // @TODO: implement validation in a future
    }

    Generate(type=ModelType.UNDEFINED) {
        super.Generate(type);
        if (!this.hybrid) {
            this.SetRectangleWidth(this.RandomlyAssignRectangleWidth());
            this.SetEllipseWidth(this.RandomlyAssignEllipseWidth());
        }
        else {
            var rGen, model_a, model_b;
            rGen = new RandomObjectGenerator();
            rGen.SetCustomArray(this.model.ViableModelTypes);
            model_a = rGen.Generate();
            if (model_a == ModelType.NAMU) {
                model_b = ModelType.BONHO;
            }
            else {
                model_b = ModelType.NAMU;
            }
            this.SetRectangleWidth(this.RandomlyAssignRectangleWidth(model_a));
            this.SetEllipseWidth(this.RandomlyAssignEllipseWidth(model_b));
        }

    }
}

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

export var ConceptualModel = {
    datatypes: {
        ModelType: ModelType,
    },
    specs: {
        ModelSpec: ModelSpec,
    },
    util: {
        RandomObjectGenerator: RandomObjectGenerator,
    },
    classes: {
        BaseModel: BaseModel,
        NamuBonho: NamuBonho,
        WugTug: WugTug,
    },
};