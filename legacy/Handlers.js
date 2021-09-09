//import { ModelType, WugTug, ZilnarOlbar, ConceptualModel } from "./ConceptualModel.js";
//import { cloneDeep } from './lib/lodash.js';
import './extlib/lodash.js';

export var Revision = {
    General: {},
    Handlers: {
        major: 0,
        minor: 2,
        rev: 38,
        timestamp: '2021-08-13 4:34PM',
    }
};

const loadUrlData = (url, callback, options={}) => fetch(url).then(
    (resp) => resp.json()
).then(
    (resp) => callback(resp, options)
).catch(
    (err) => console.log(`Error fetching url=${url}. Details: `, err)
);

const loadDataArray = (classType, array, frmInitializer) => {
    var ret = [];
    for (let i of array) {
        var cur = new classType(frmInitializer);
        cur.LoadFromData(i);
        ret.push(cur);
    }
    return ret;
};

function prepareData(td, CM) {
    var ret = {
        learning: {
            namubonho: [],
            wugtug: [],
            zilnarolbar: [],
        },
        association: {
            association: [],
        },
        trial: {
            trial: [],
        },
    };

    ret.learning.namubonho = loadDataArray(
        CM.classes.NamuBonho,
        td.learning.namubonho,
        CM.datatypes.ModelType.RANDOM_NAMUBONHO
    );
    ret.learning.wugtug = loadDataArray(
        CM.classes.WugTug,
        td.learning.wugtug,
        CM.datatypes.ModelType.RANDOM_WUGTUG
    );
    ret.learning.zilnarolbar = loadDataArray(
        CM.classes.ZilnarOlbar,
        td.learning.zilnarolbar,
        CM.datatypes.ModelType.RANDOM_ZILNAROLBAR
    );
    ret.association.association = loadDataArray(
        CM.classes.ZilnarOlbar,
        td.association.association,
        CM.datatypes.ModelType.RANDOM_ZILNAROLBAR
    );
    ret.trial.trial = loadDataArray(
        CM.classes.ZilnarOlbar,
        td.trial.trial,
        CM.datatypes.ModelType.RANDOM_ZILNAROLBAR
    );

    return ret;

//    data.trialdata

}

const GenerateLoopData = (n, classType, dataType) => {
    var ret = [];
    while (ret.length < n) {
        let nObj = new classType(dataType);
        ret.push(nObj);
        //console.log("new item=",n);
    }
    return ret;
};

const GenerateZOData = (n, CM, nb=[], wt=[], gen_wt=false, type=CM.datatypes.ModelType.UNDEFINED) => {
    var ret = [], _wt = [];
    var ModelType = CM.datatypes.ModelType;
    if (!gen_wt) {
        _wt = wt;
    }

    if ( // check if there are enough NBs and, if WTs won't be generated, check
         // if the WTs list length matches the NBs list length
        (!gen_wt && nb.length != wt.length) ||
        n > nb.length
    ) {
        throw Error (
            `Invalid parameters to generate ZilnarOlbars: n=${
                n
            }, nb.length=${
                nb.length
            }, wt.length=${
                wt.length
            }`
        );
    }

    while (ret.length < n) {
        let objType = type, i=ret.length;
        if (type == ModelType.UNDEFINED) {
            switch(nb[i].GetObjectTypeString()) {
                case 'namu':
                    objType = ModelType.ZILNAR;
                    break;
                case 'bonho':
                    objType = ModelType.OLBAR;
                    break;
                default:
                    objType = ModelType.RANDOM_ZILNAROLBAR_AMBIGUOUSOBJECTALLOWED;
            }
        }
        let nZo = new CM.classes.ZilnarOlbar(
            objType, false, _.cloneDeep(nb[i]), null
        );
        if (gen_wt) {
            let wtType = ModelType.UNDEFINED;
            if (nZo.objectType & ModelType.ZILNAR) {
                wtType = ModelType.WUG;
            }
            if (nZo.objectType & ModelType.OLBAR) {
                wtType = ModelType.TUG;
            }
            _wt.push(new CM.classes.WugTug(wtType));
        }
        //let nZo = new ZilnarOlbar(objType, false, nb[i], wt[i]);
        nZo.subject = _wt[i];
        ret.push(nZo);
    }

    return ret;
};

const revString = (major, minor, rev) => `${major}.${minor}.${rev}`;
const revSet = (revInfo) => revString(
    revInfo.major, 
    revInfo.minor, 
    revInfo.rev
);

const getObjPath = (obj, [f, ...l]) => {
    if (obj === undefined) {
        return obj;
    }
    if (l.length == 0) {
        return obj[f];
    }
    else {
        return getObjPath(obj[f], l);
    }
};

class EventMgr {
    constructor(options={}) {
      this.title = options.title || 'unamed-EventMgr';
      if (options.log === undefined) {
          this.log = true;
      }
      else {
        this.log = options.log;
      }

    }
  
    handle(context, event) {
        if (this.log == true) {
            console.log(`Component ${ this.title } 
                received ${ event }. 
                Context= ${context}`);
        }
    }
}

class UpdaterSetup {
    constructor(options={}) {
        this.installEvent = options.installEvent || 'before:prepare';
        this.updaters = options.updaters || {};
        this.log = options.log === undefined ? true : options.log;
        this.verbose = options.verbose === undefined ? true : options.verbose;
        this.title = options.title || 'untitled-UpdaterInstaller';
        this.prepared = false;
        this.updatersPath = options.updatersPath || 
                            'data.updaters';
        this.destination = options.destinationContentIds || [];
        this.screen = options.screen || null;
    }

    handle(context, event) {
        if (event == 'plugin:init' && !this.prepared) {
            this.Prepare(context);
        }
        if (event == this.installEvent) {
            this.Setup(context);
        }
        if (this.log == true) {
            this.EventLog(context, event);
        }
    }

    Prepare(context) {
        //this.prepared = true;
        //this.screen = context; // WTF!! For wharever reasons it's causing
                                 // an exception if this line is present!
        this.prepared = true;
        this.Log(
            'info', 
            "Has been sucessfully prepared", 
            "UpdaterSetup::Prepare"
        );
    }

    Setup(context) {
        /*console.log(
            "UpdaterSetup::Setup()",
            "\n\tcontext=", context,
            "\n\tthis.screen=", this.screen,
            "\n\n   "
        );*/
        
        var updaters = getObjPath(
            context.aggregateParameters,
            this.updatersPath.split('.')
        );
        
        var dst = [];

        for (let i of this.destination) {
            for (let j of context.options.content) {
                if (!(j instanceof Object)) continue;
                if ( //this.destination[i] == context.options.content[j].id
                    i == j.id
                ) {
                    // It's a match!
                    /*console.log("i=",i, ", j=", j, " destination=",
                    this.destination,
                ", content=",context.options.content); */ 
                    /*this.Log(
                        'info',
                        `Setting up updater for object id=${i.id}`,
                        "UpdaterSetup.Setup()"
                    );*/
                    j.updaters = updaters;
                }
            }
        }

    }

    EventLog(context, event) {
        console.log(`${this.title}: received a '${event}' event.
            context=`, context,`
            this=`, this);
    }

    Log(level, message, prefix="", details="") {
        var out, suffix = "";
        if (prefix.length > 0) {
            out = `${level}\t[${prefix}] ${message}`;
        }
        if (details.length > 0) {
            out += `\n\t\t\t\t${details}`;
        }
        if (this.verbose) {
            suffix = `\n\t\t\t\tthis=`;
        }
        switch(level) {
            case 'warn':
                console.warn(out, suffix, this.verbose ? this : '');
                break;
            case 'error':
            case 'fatal':
                console.error(out, suffix, this.verbose ? this : '');
                break;
            default: //'info' and others
                if (this.log) {
                    console.log(out, suffix, this.verbose ? this : '');
                }
                
        }
    }

}

function welcome_beforePrepare() {
    let info = revSet(this.parameters.Revision.General);
    info += ` [last update: ${ this.parameters.Revision.General.timestamp }]`;
    for (const [scriptTitle, scriptData] of Object.entries(
        this.parameters.Revision
        )) {
            if (scriptTitle == 'General') continue;
            info += `<br/> ${scriptTitle}` + revSet(scriptData);
            info += ` [last update: ${ scriptData.timestamp }]`;
    }
    this.parameters.RevInfo = info;
}

function learning_loadParametersBeforePrepare() {
    if (!this.aggregateParameters.hybrid) {
        this.options.correctResponse = this.aggregateParameters.data.type;
    }

}

function trial_loadParametersBeforePrepare() {
    /*console.log(`nb: [${this.options.title}]:
                hybrid=${this.aggregateParameters.hybrid}
                type=${this.aggregateParameters.data.type}
                data=`,
                this.aggregateParameters.data,
                `
                this.aggregateParameters=`,
                this.aggregateParameters
                );*/
                //this=${JSON.stringify(this)}`);
    if (!this.aggregateParameters.hybrid) {
        //this.options.correctResponse = this.aggregateParameters.data.type;
    }
    /*console.log(`nb: [${this.options.title}]:
                Correct response set to: [${this.options.correctResponse}]
                this.options=`,
                this.options);*/
}

function feedback_loadParametersBeforePrepare(correctness=true) {
    var correct = this.options.datastore.state.correct;
    var timely = (this.options.datastore.state.ended_on == 'response');

    //sanity check:
    //if (!timely || !correctness) correct = false; 
    // ^ this is necessary as datastore.state is keeping old data
    var score = 0;
    var status, hint, tit;

    //console.log('feedback_screen@before:prepare');
    //console.log('this=', this);
    if (correct && correctness) score = score + 2;
    if (timely) score = score + 1;
    if (!correctness) score = score + 4;

    console.log(
        `feedback: correct=${correct} timely=${
            timely
        } correctness=${correctness} score=${score}`,
        "state=", this.options.datastore.state
    );
    switch(score) {
        case 1: //in time but wrong
            this.parameters.bgColor = 'red';
            tit = 'RESPOSTA INCORRETA!';
            status = "está incorreta";
            hint = "Tente responder de forma mais precisa";
            break;
        case 3:
            this.parameters.bgColor = 'green';
            tit = 'RESPOSTA CORRETA, PARABÉNS!';
            status = "perfeita: correta e dentro do tempo proposto";
            hint = "Continue assim";
            break;
        case 2: case 4: case 0: //out of time, ambiguity scenario
            this.parameters.bgColor = 'yellow';
            this.parameters.fgColor = 'black';
            tit = 'RESPOSTA FORA DO LIMITE DE TEMPO';
            status = "demorou mais do que os 5 segundos delimitados";
            hint = "Tente responder mais rápido";
            break;
        case 5: //in time, ambiguity scenario
            this.parameters.bgColor = 'lightblue';
            this.parameters.fgColor = 'black';
            tit = 'RESPOSTA EM TEMPO ACEITÁVEL!';
            status = "está dentro do limite de tempo";
            hint = "Continue assim";
            break;
    }
    //console.log("score=",score);

    if (correctness) {
        this.options.parameters.fbExpected = this.aggregateParameters.data.type;
    }
    this.options.parameters.fbTitle = tit;
    this.options.parameters.fbStatusMessage = status;
    this.options.parameters.fbHintMessage = hint;
    if (timely) {
        this.options.parameters.fbAnswered = 
            this.options.datastore.state.response;
    }
    else {
        this.options.parameters.fbAnswered = '<Sem Resposta>';
    }
    
    var rt = this.options.datastore.state.duration / 1000.0;
    this.options.parameters.responseTime = rt.toFixed(2);

    /*console.log("parameters=",this.options.parameters);
    console.log("datastore=",this.options.datastore);*/
}

function feedback_loadParametersBeforePrepare_nocorrection() {
    feedback_loadParametersBeforePrepare.call(this, false);
}

function generic_loghandler() {
    console.log("[", this.options.title, "] this.parameters=", this.parameters);
}

function setup_streaks() {
    this.options.datastore.state.streaks = 0;
}

function increase_streaks() {
    //console.log("state=",this.options.datastore.state);
    if (this.options.datastore.state.correct &&
        this.options.datastore.state.ended_on == 'response') {
        this.options.datastore.state.streaks++;
    }
    else {
        this.options.datastore.state.streaks = 0;
    }
}

const end_streaks = (streaks_stop=-1) => function() {
    if (this.options.datastore.state.streaks >= streaks_stop) {
        //console.log("this=", this);
        //this.end('complete_stream');//was causing long interruption or infloop
        //this.parent.end('complete_stream');
        this.parent.parent.end('complete_stream');
        this.options.datastore.state.streaks = 0;
    }
};

export const Handlers = {
    utils: {
        GenerateLoopData: GenerateLoopData,
        revString: revString,
        revSet: revSet,
        getObjPath: getObjPath,
        GenerateZOData: GenerateZOData,
        loadUrlData: loadUrlData,
        prepareData: prepareData,
    },
    classes: {
        EventMgr: EventMgr,
        UpdaterSetup: UpdaterSetup,
    },
    handlers: {
        welcome: {
            before_prepare: welcome_beforePrepare,
        },
        namubonho: {
            trial_before_prepare: undefined, //deprecated
            fb_before_prepare: undefined, //deprecated
        },
        generic: {
            log_handler: generic_loghandler,
            fb_before_prepare: feedback_loadParametersBeforePrepare,
            fb_before_prepare_nc: feedback_loadParametersBeforePrepare_nocorrection,
            learning_before_prepare: learning_loadParametersBeforePrepare,
            trial_before_prepare: trial_loadParametersBeforePrepare,
            setup_streaks: setup_streaks,
            increase_streaks: increase_streaks,
        },
    },
    handlerGenerators: {
        end_streaks: end_streaks,
    },
};