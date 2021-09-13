import {BaseModel} from "./BaseModel.mjs";
import { RandomObjectGenerator } from "../lib/utils/RandomObjectGenerator.mjs";

/*import datatypes from "./datatypes.mjs";
import BaseModel from "./BaseModel.mjs";

const ModelType = datatypes.ModelType;
const ModelSpec = datatypes.ModelSpec;*/

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

    SetPerspective(perspective) {
        switch(perspective) {
            case 'namu': case ModelType.NAMU:
                this.grammar.specific = this.model.Grammar.Namu;
                break;
            case 'bonho': case ModelType.BONHO:
                this.grammar.specific = this.model.Grammar.Bonho;
        }
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

    LoadFromData(data={}) {
        super.LoadFromData(data);
        this.SetRectangleWidth(data.rectangleWidth);
        this.SetEllipseWidth(data.ellipseWidth);
    }

}
