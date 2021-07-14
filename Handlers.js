export var Revision = {
    General: {},
    Handlers: {
        major: 0,
        minor: 0,
        rev: 12,
        timestamp: '2021-07-14 1:16AM',
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

class EventMgr {
    constructor(options) {
      this.title = options.title;
    }
  
    handle(context, event) {
      console.log(`Component ${ this.title } 
                   received ${ event }. 
                   Context= ${context}`);
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
    console.log(`nb: [${this.options.title}]:
                hybrid=${this.aggregateParameters.hybrid}
                type=${this.aggregateParameters.data.type}
                data=`,
                this.aggregateParameters.data,
                `
                this.aggregateParameters=`,
                this.aggregateParameters
                );
                //this=${JSON.stringify(this)}`);
    if (!this.aggregateParameters.hybrid) {
        this.options.correctResponse = this.aggregateParameters.data.type;
    }
    console.log(`nb: [${this.options.title}]:
                Correct response set to: [${this.options.correctResponse}]
                this.options=`,
                this.options);
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
    },
    classes: {
        EventMgr: EventMgr,
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