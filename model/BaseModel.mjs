import { ModelType, ModelSpec } from "./datatypes.mjs";
import { RandomObjectGenerator } from "../lib/utils/RandomObjectGenerator.mjs";

export class BaseModel {

    constructor(objType=ModelType.UNDEFINED, model=ModelSpec.Generic) {
        this.model = model;
        this.data = {
            position: this.model.StartPosition,
        };
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
        let vTypes, randGen = new RandomObjectGenerator();
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
            // TODO: Find out if and how it is possible and why this code
        }

        this.objectType = oType;
        this.data.type = this.GetObjectTypeString();
        this.GenerateGrammar();
    }

    GetData() {
        return this.data;
    }

    SetData(data={}) {
        this.data = data;
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
            case ModelType.AMBIGUOUS_ZILNAROLBAR: return 'ambiguous-zilnarolbar';
            default: return 'undefined';
        }
    }

    SetObjectTypeByString(s = 'undefined') {
        if (ModelType[s.toUpperCase()] !== undefined) {
            this.objectType = ModelType[s.toUpperCase()];
        }
        else {
            switch(s) {
                case 'hybrid-namubonho':
                    return this.SetObjectType(ModelType.AMBIGUOUS_NAMUBONHO);
                case 'ambiguous-zilnarolbar':
                    return this.SetObjectType(ModelType.AMBIGUOUS_ZILNAROLBAR);
                default:
                    throw Error(`ModelType ${s} not recognized`);
            }
        }
    }

    SetModelFromData(data={}) {
        switch(data.type) {
            case 'namu': case 'bonho:': case 'hybrid-namubonho':
                this.model = ModelSpec.NamuBonho;
                break;
            case 'wug': case 'tug':
                this.model = ModelSpec.WugTug;
                break;
            case 'zilnar': case 'olbar': case 'ambiguous-zilnarolbar':
                this.model = ModelSpec.ZilnarOlbar;
                break;
            default:
                return;
        }
    }

    LoadFromData(data={}) {
        this.SetData(data);
        this.SetModelFromData(data);
        this.SetObjectTypeByString(data.type);
    }

    GenerateGrammar() {
        /*if (this.data.type == 'hybrid-namubonho') {
            console.log(".: ISSUE :.");
        }*/
        this.grammar = {
            specific: this.model.Grammar[
                titCaseWord(this.data.type).replace(
                    /[\w]+\-/i,
                    ""
                )
            ],
            generic: this.model.Grammar.Generic,
        };
    }

    GetGrammarForm(form='', spec='specific', blank=false) {
        if (blank) {
            return this.grammar[spec][form].replace(/./gi, '_');
        }
        return this.grammar[spec][form];
    }

    GetGrammar(spec='') {
        if (spec=='') {
            return this.grammar;
        }

        return this.grammar[spec];
    }

}

//export default BaseModel;