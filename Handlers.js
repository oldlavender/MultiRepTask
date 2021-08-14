export var Revision = {
    General: {},
    Handlers: {
        major: 0,
        minor: 0,
        rev: 35,
        timestamp: '2021-08-13 4:34PM',
    }
};
const GenerateLoopData = (n, classType, dataType) => {
    var ret = [];
    while (ret.length < n) {
        let n = new classType(dataType);
        ret.push(n);
        //console.log("new item=",n);
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
        console.log(
            "UpdaterSetup::Setup()",
            "\n\tcontext=", context,
            "\n\tthis.screen=", this.screen,
            "\n\n   "
        );
        
        var updaters = getObjPath(
            context.aggregateParameters,
            this.updatersPath.split('.')
        );
        
        var dst = [];

        for (let i in this.destination) {
            for (let j in context.options.content) {
                if (
                    this.destination[i] == context.options.content[j].id
                ) {
                    // It's a match!
                    this.Log(
                        'info',
                        `Setting up updater for object id=${this.destination[i].id}`,
                        "UpdaterSetup.Setup()"
                    );
                    context.options.content[j].updaters = updaters;
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
        this.options.correctResponse = this.aggregateParameters.data.type;
    }
    /*console.log(`nb: [${this.options.title}]:
                Correct response set to: [${this.options.correctResponse}]
                this.options=`,
                this.options);*/
}

function feedback_loadParametersBeforePrepare() {
    var correct = this.options.datastore.state.correct;
    var timely = (this.options.datastore.state.ended_on == 'response');

    //sanity check:
    if (!timely || this.aggregateParameters.hybrid) correct = false; 
    // ^ this is necessary as datastore.state is keeping old data
    var score = 0;
    var status, hint, tit;

    //console.log('feedback_screen@before:prepare');
    //console.log('this=', this);
    if (correct) score = score + 2;
    if (timely) score = score + 1;
    if (this.aggregateParameters.hybrid) score = score + 4;

    switch(score) {
        case 1: //in time but wrong
            this.parameters.bgColor = 'orange';
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

    if (!this.aggregateParameters.hybrid) {
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

function generic_loghandler() {
    console.log("[", this.options.title, "] this.parameters=", this.parameters);
}

export const Handlers = {
    utils: {
        GenerateLoopData: GenerateLoopData,
        revString: revString,
        revSet: revSet,
        getObjPath: getObjPath,
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
            trial_before_prepare: trial_loadParametersBeforePrepare,
        },
    },
};