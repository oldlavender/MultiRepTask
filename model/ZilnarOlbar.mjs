import { BaseModel } from "./BaseModel.mjs";
import { NamuBonho } from "./NamuBonho.mjs";
import { WugTug } from "./WugTug.mjs";
import { RandomObjectGenerator } from "../lib/utils/RandomObjectGenerator.mjs";

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