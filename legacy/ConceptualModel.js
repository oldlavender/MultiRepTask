/*import {
    RawScreenObjects, 
    ScreenObjects, 
    Screens
} from "./ScreenObjects.js";
import "./extlib/lab.js.js";
import { Revision } from "./Handlers.js";
//import { lab } from "./lib/lab.js";
import "./extlib/lodash.js.js";

Revision.ConceptualModel = {
    major: 0,
    minor: 2,
    rev: 45,
    timestamp: '2021-08-18 5:10PM',
};

// util prototypes
String.prototype.fillTemplate = function(pars) {
    var fillTemplate;
    const keys = Object.keys(pars);
    const values = Object.values(pars);
    fillTemplate = new Function(...keys, `return \`${this}\`;`);
    return fillTemplate(...values);
};

const s = 'baguio';
String.prototype[s] = function([...pars]) {
    return this.concat(pars);
}

const objectMerge = (x={}, y={}, y_pref='', sep='.', x_pref='') => {
    var ret = {};
    let pSep = x_pref == '' ? '' : sep;

    for (let [k,v] of Object.entries(x)) {
        ret[`${x_pref}${pSep}${k}`] = v;
    }

    pSep = y_pref == '' ? '' : sep;
    for (let [k,v] of Object.entries(y)) {
        ret[`${x_pref}${pSep}${k}`] = v;
    }
    return ret;
};

// util functions
const titCaseWord = ([fst, ...rst]) => 
    fst.toUpperCase() + rst.join('').toLowerCase();

const combineFlags = (arr = []) => {
    var ret = 0xffff;
    for (let i in arr) {
        ret = (0xffff & arr[i] & ret);
    }
    return ret;
};

//////////////////

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
    get AMBIGUOUS(){
        return this.HYBRID;
    },
    get AMBIGUOUS_NAMUBONHO() {
        return this.HYBRID | this.NAMU | this.BONHO;
    },
    get AMBIGUOUS_ZILNAR() {
        return this.AMBIGUOUS | this.ZILNAR;
    },
    get AMBIGUOUS_OLBAR() {
        return this.AMBIGUOUS | this.OLBAR;
    },
    get RANDOM_NAMUBONHO_HYBRIDALLOWED() {
        return this.AMBIGUOUS_NAMUBONHO | this.RANDOM;
    },
    get RANDOM_ZILNAROLBAR_AMBIGUOUSOBJECTALLOWED() {
        return this.AMBIGUOUS | this.ZILNAR | this.OLBAR | this.RANDOM;
    },
    get RANDOM_NAMUBONHO() {
        return this.NAMU | this.BONHO | this.RANDOM;
    },
    get RANDOM_WUGTUG() {
        return this.WUG | this.TUG | this.RANDOM;
    },
    get RANDOM_ZILNAROLBAR() {
        return this.ZILNAR | this.OLBAR | this.RANDOM;
    },
};

//export const ModelTypeStr = {
    //'undefined': ModelT
//};

/**
 * 
 * @class   RandomObjectGenerator   Manages the generation of random object specs
 * 
 *//*
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
        StartPosition: {
            x: 0,
            y: 0,
        },
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
        Grammar: {
            Namu: {
                singular: 'namu',
                plural: 'namus',
            },
            Bonho: {
                singular: 'bonho',
                plural: 'bonhos'
            },
            Generic: {
                singular: 'objeto',
                plural: 'objetos',
            },
        },
        StartPosition: {
            x: 0,
            y: 0,
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
        Grammar: {
            Wug: {
                singular: 'wug',
                plural: 'wugs',
            },
            Tug: {
                singular: 'tug',
                plural: 'tugs',
            },
            Generic: {
                singular: 'personagem',
                plural: 'personagens',
            },
        },
        StartPosition: {
            x: 0,
            y: 0,
        },
    },
    ZilnarOlbar: {
        AllowedModelTypes: [
            ModelType.ZILNAR, 
            ModelType.OLBAR, 
            ModelType.AMBIGUOUS_ZILNAR, 
            ModelType.AMBIGUOUS_OLBAR
        ],
        ViableModelTypes: [
            ModelType.ZILNAR, 
            ModelType.OLBAR
        ],
        ViableHybridModelTypes: [
            ModelType.AMBIGUOUS_ZILNAR, 
            ModelType.AMBIGUOUS_OLBAR
        ],
        ArgumentSpec: {
            Zilnar: {
                ViableObjectTypes: [ModelType.NAMU, ModelType.AMBIGUOUS_NAMUBONHO],
                StrictObjectTypes: [ModelType.NAMU],
                ViableAgentTypes: [ModelType.WUG],
                StrictAgentTypes: [ModelType.WUG],
            },
            Olbar: {
                ViableObjectTypes: [ModelType.BONHO, ModelType.AMBIGUOUS_NAMUBONHO],
                StrictObjectTypes: [ModelType.BONHO],
                ViableAgentTypes: [ModelType.TUG],
                StrictAgentTypes: [ModelType.TUG],
            },
        },
        UpdaterSpec: {
            Zilnar: {
                left: {
                    id: 'horizontal-movement',
                    type: 'Linear',
                    duration: 500,
                    start: -218,
                    end: 307,
                },
                top: {
                    id: 'vertical-movement',
                    type: 'Arc',
                    duration: 500,
                    start: 0,
                    end: 0,
                    middle: -150,
                },
            },
            Olbar: {
                left: {
                    id: 'horizontal-movement',
                    type: 'Linear',
                    duration: 500,
                    start: -179,
                    end: 346,
                },
            },
        },
        Grammar: {
            Zilnar: {
                infinitive: 'zilnar',
                participle: 'zilnado',
                past_3rd_sing: 'zilnou',
                gerund: 'zilnando',
            },
            Olbar: {
                infinitive: 'olbar',
                participle: 'olbado',
                past_3rd_sing: 'olbou',
                gerund: 'olbando',
            },
            Generic: {
                infinitive: 'movimentar',
                participle: 'movimentado',
                past_3rd_sing: 'movimentou',
                gerund: 'movimentando',
            },
        },
        SentenceModels: {
            fullActive: 'O ${subject.singular} '.concat(
                '${verb.past_3rd_sing} o ${object.singular}'
            ),
            fullPassive: 'O ${object.singular} '.concat(
                ' foi ${verb.participle} pelo ${subject.singular}'
            ),
        },
        StartPosition: {
            x: -227,
            y: 0,
        },
    },
};

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
     *//*
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
     *//*
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
        }*//*
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

/**
 * 
 * @class   NamuBonho   Models instances of Namus and Bonhos
 * 
 *//*
 export class NamuBonho extends BaseModel {

    /**
     * 
     * @abstract 
     * 
     *//*
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

export class ZilnarOlbar extends BaseModel {
    constructor(
        frmType = ModelType.UNDEFINED,
        genArgs = true,
        object = null, 
        subject = null
    ) {
        super(frmType, ModelSpec.ZilnarOlbar);
        this.blanked = '';
        this.initialize(genArgs, object, subject);
        // NOTE: For this class, hybrid means more like ambiguous, but the
        // same parameters are used as hybrid for the sake of simplicity
    }
    
    SetObjectType(frmType = ModelType.UNDEFINED) {
        super.SetObjectType(frmType);
        this.updaters = this.calculateUpdaters();
    }

    calculateUpdaters() {
        if (this.objectType & ModelType.ZILNAR) {
            return this.model.UpdaterSpec.Zilnar;
        }
        else if (this.objectType & ModelType.OLBAR) {
            return this.model.UpdaterSpec.Olbar;
        }
        return {};
    }

    initialize(genArgs, object, subject) {
        var obj = object, sbj = subject;

        if (genArgs) {
            this.GenerateArguments();
        }
        else {
            this.object = obj;
            this.subject = sbj;
        }
    }

    GenerateArguments() {
        var base = this.model.ArgumentSpec[titCaseWord(
            this.GetObjectTypeString().replace(/[\w]+\-/i, "")
            //removes 'ambiguous-' or 'anything-' from the string if present
        )];
        var objPoll, sbjPoll = base.StrictAgentTypes;

        if (this.hybrid) {
            objPoll = base.ViableObjectTypes;
        }
        else {
            objPoll = base.StrictObjectTypes;
        }

        this.object = new NamuBonho(combineFlags(objPoll));
        this.subject = new WugTug(combineFlags(sbjPoll));
    }

    LoadFromData(data={}) {
        super.LoadFromData(data);
        this.updaters = data.updaters || {};
        this.sentence = data.sentence || {
            full: '',
            blank: '',
        };
        this.blanked = data.blanked || '';
        this.object.LoadFromData(data.object);
        this.subject.LoadFromData(data.subject);
    }

    CalculateLabels(blankClass='') {
        switch(blankClass) {
            case 'verb':
                return ['Zilnar', 'Olbar'];
            case 'subject':
                return ['Wug', 'Tug'];
            case 'object':
                return ['Namu', 'Bonho'];
            default:
                return [];
        }
    }

    GetCustomSentence(sentence="", type='specific', blank=false, blankClass='') {
        var blkRe, blnkCls='', sentc = sentence;
        if (blank) {
            blnkCls = blankClass != '' ? blankClass : this.blanked;
            blkRe = new RegExp(
                "\\$[\\s]*\\{[\\s]*".concat(
                    blnkCls, "\\.[\\w]+[\\s]*\\}"
                ),
                'i'
            );
            var matches = sentc.match(blkRe);
            for (let i of matches) {
                sentc = sentc.replace(
                    blkRe, 
                    i.replace(/./gi, '_')
                );
            }
        }

        var tplData = {
            verb: this.GetGrammar(type),
            subject: this.subject.GetGrammar(type),
            object: this.object.GetGrammar(type),
        };
        return sentc.fillTemplate(tplData);
    }

    GetTemplatedSentence(template='', type='specific', blank=false, blankClass='') {
        return this.GetCustomSentence(
            this.model.SentenceModels[template],
            type,
            blank,
            blankClass
        );
    }

    SetBlank(blank='') {
        if (blank == '' && this.blanked != '') {
            return this.blanked;
        }
        switch (blank) {
            case 'object': case 'subject': case 'verb':
                this.blanked = blank;
                return blank;
            default:
                var rBlankGen = new RandomObjectGenerator();
                rBlankGen.SetCustomArray(
                    ['object', 'subject', 'verb']
                );
                var bClass = rBlankGen.Generate();
                this.blanked = bClass;
                return bClass;
        }
    }

    GetRandomSentenceModel(blank=false, type='specific') { //remove unused prms
        var templOptions = Object.keys(this.model.SentenceModels);
        var bClass = '', rTemplGen = new RandomObjectGenerator();
        rTemplGen.SetCustomArray(templOptions);
        return rTemplGen.Generate();
        /*
        if (blank) {
            bClass = this.SetBlank(); 
        }

        return this.GetTemplatedSentence(
            rTemplGen.Generate(),
            type,
            bClass
        );*/ //TODO: Remove this code later
        //TODO: Separate template random selection from blank class selection
        /*
    }

    AnnotateSentence(type='specific', sentence='', blank_class='') {
        var sentc = sentence, sentcModel='', hasTpl = false, blankCls;
        var sentcs = {
            full: '',
            blank: '',
        };

        if (blank_class == '' && this.blanked == '') {
            blankCls = this.SetBlank(); //randomly assign blank argument
        }
        else {
            blankCls = this.SetBlank(blank_class);
        }

        hasTpl = this.model.SentenceModels.hasOwnProperty(sentence);

        if (sentence == '' || hasTpl ) {//uses model, randomly assign if needed
            sentcModel = hasTpl ? sentence : this.GetRandomSentenceModel();
            sentcs.full = this.GetTemplatedSentence(sentcModel, type, false);
            sentcs.blank = this.GetTemplatedSentence(sentcModel, type, true, blankCls);
        }
        else { //it's a custom sentence, use it
            sentcs.full = this.GetCustomSentence(sentence, type, false);
            sentcs.blank = this.GetCustomSentence(sentence, type, true, blankCls);
        }

        this.sentence = sentcs;
        this.data.sentence = this.sentence;
        this.data.label = this.CalculateLabels(blankCls) || [];
        this.data.blanked = this.blanked;
        this.data.blanked_data = this.CalculateBlankedData() || {};
    }

    CalculateBlankedData() {
        switch(this.blanked) {
            case 'verb':
                return _.cloneDeep(this.data);
            case 'object':
                return this.data.object;
            case 'subject':
                return this.data.subject;
        }
    }

    set object(obj) {
        if (obj instanceof NamuBonho) {
            this._object = obj;
            //this._object. 
            if (this._object.hybrid) {
                this._object.SetPerspective(
                    this.model.ArgumentSpec[
                        titCaseWord(
                            this.GetObjectTypeString()
                        )
                    ].StrictObjectTypes[0]
                );
            }
            this.data.object = obj.GetData();
        }
    }

    set subject(sbj) {
        if (sbj instanceof WugTug) {
            this._subject = sbj;
            this.data.subject = sbj.GetData();
        }
    }

    set updaters(upd) {
        this._updaters = upd || {};
        this.data.updaters = this._updaters;
    }

    get object() {
        return this._object;
    }

    get subject() {
        return this._subject;
    }

    get updaters() {
        return this._updaters;
    }

}

*/
/*
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
        ZilnarOlbar: ZilnarOlbar,
    },
};*/