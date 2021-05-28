//import "./lib/lab.js";
//import "./lib/lab.fallback.js";
import { RawScreenObjects, ScreenObjects } from "./ScreenObjects.js";

var randGen = new lab.util.Random();
var namuAngles = rangeArray(15, 75);
var bonhoAngles = rangeArray(90+15, 90+75);
var namuStrokeWidth = rangeArray(3, 6);
var bonhoStrokeWidth = rangeArray(9, 12);
var nbTypes = ['namu', 'bonho'];

function rangeArray(start, stop, step=1) {
    var ret = [];
    var s = start;
    while (s <= stop) {
        ret.push(s);
        s += step;
    }
    return ret;
}

function genNamuBonho(ambiguous = false) {
    var type, angle, strokeWidth, retType;
    var nbTypeModel = randGen.choice(nbTypes);

    if (ambiguous) {
        type = 'ambiguous';
    }
    else {
        type = nbTypeModel;
    }

    if (nbTypeModel == 'namu') {
        angle = randGen.choice(namuAngles);
    }
    else {
        angle = randGen.choice(bonhoAngles);
    }

    if ((nbTypeModel == 'namu' && ambiguous) || 
        (nbTypeModel == 'bonho' && !ambiguous)) {
        strokeWidth = randGen.choice(bonhoStrokeWidth);
    }
    else {
        strokeWidth = randGen.choice(namuStrokeWidth);
    }

    var ret = {
        ambiguity: ambiguous,
        type: type,
        angle: angle,
        strokeWidth: strokeWidth,
    };

    return ret;
}

var fx_cross = ScreenObjects.templates.generic.fxcross.center_canvas();
var task_canvas = ScreenObjects.templates.namubonho.task_canvas();
var feedback_screen = ScreenObjects.templates.namubonho.feedback_screen();

task_canvas.options.messageHandlers = {
    'before:prepare': function() {
        if (!this.aggregateParameters.ambiguity) {
            this.options.correctResponse = this.aggregateParameters.type;
        }
    },
};

feedback_screen.options.messageHandlers = {
    'before:prepare': function() {
        var correct = this.options.datastore.state.correct;
        var timely = (this.options.datastore.state.ended_on == 'response');
        
        //sanity check:
        if (!timely || this.aggregateParameters.ambiguity) correct = false; 
        // ^ this is necessary as datastore.state is keeping old data
        var score = 0;
        var msg, tit;

        //console.log('feedback_screen@before:prepare');
        if (correct) score = score + 2;
        if (timely) score = score + 1;
        if (this.aggregateParameters.ambiguity) score = score + 4;

        switch(score) {
            /*case 0: //wrong answer and out of time (impossible)
                this.parameters.bgColor = 'red';
                tit = 'RESPOSTA INCORRETA E FORA DO LIMITE DE TEMPO!';
                msg = 'A sua resposta est&aacute; incorreta e levou mais do ';
                msg += 'que os 5 segundos delimitados. Tente responder de ';
                msg += 'forma mais precisa e em menos de 5 segundos nas ';
                msg += 'pr&oacute;ximas vezes!';
                break;*/
            case 1: //in time but wrong
                this.parameters.bgColor = 'orange';
                tit = 'RESPOSTA INCORRETA!';
                msg = 'A sua resposta est&aacute; incorreta. Tente responder';
                msg += ' de forma mais precisa nas pr&oacute;ximas vezes!';
                break;
            /*case 2:
                this.parameters.bgColor = 'yellow';
                this.parameters.fgColor = 'black';
                tit = 'RESPOSTA FORA DO LIMITE DE TEMPO!';
                msg = 'A sua resposta est&aacute; correta, por&eacute;m voc';
                msg += '&acirc; demorou mais do que os 5 segundos delimitados';
                msg += '. Tente responder mais r&aacute;pido nas pr&oacute;xi';
                msg += 'mas vezes!';
                break;*/
            case 3:
                this.parameters.bgColor = 'green';
                tit = 'RESPOSTA CORRETA, PARAB&Eacute;NS!';
                msg = 'A sua resposta est&aacute; perfeita: correta e dentro';
                msg += ' do tempo proposto. Continue assim nas pr&oacute;xi';
                msg += 'mas vezes!';
                break;
            case 2: case 4: case 0: //out of time, ambiguity scenario
                this.parameters.bgColor = 'yellow';
                this.parameters.fgColor = 'black';
                tit = 'RESPOSTA FORA DO LIMITE DE TEMPO';
                msg = 'A sua resposta demorou mais do que os 5 segundos que ';
                msg += 'foram delimitados. Tente responder mais r&aacute;pido';
                msg += ' nas pr&oacute;ximas vezes!';
                break;
            case 5: //in time, ambiguity scenario
                this.parameters.bgColor = 'green';
                tit = 'RESPOSTA EM TEMPO ACEIT&Aacute;VEL!';
                msg = 'A sua resposta est&aacute; dentro do limite de tempo ';
                msg += 'aceit&aacute;vel. Continue assim nas pr&oacute;ximas ';
                msg += 'vezes!';
                break;
        }
        //console.log("score=",score);

        if (!this.aggregateParameters.ambiguity) {
            this.options.parameters.fbExpected = this.aggregateParameters.type;
        }
        this.options.parameters.fbMessage = msg;
        this.options.parameters.fbTitle = tit;
        if (timely) {
            this.options.parameters.fbAnswered = 
                this.options.datastore.state.response;
        }
        else {
            this.options.parameters.fbAnswered = '<Sem Resposta>';
        }
        
        this.options.parameters.responseTime =
            this.options.datastore.state.duration / 1000.0;

        /*console.log("parameters=",this.options.parameters);
        console.log("datastore=",this.options.datastore);*/
    },
};

var preTrials = [], trials = [], rChoices = [true,false,true];
while (preTrials.length < 15 && trials.length < 15) {
    preTrials.push(genNamuBonho(false));
    var nbTrial = genNamuBonho(randGen.choice(rChoices)); //likely ambiguous
    nbTrial.ambiguity = true; //Tells it's ambiguous even if not true
    trials.push(nbTrial);
}

var trialFlow = new lab.flow.Sequence({
    title: 'trialSequence',
    datacommit: false,
    content: [fx_cross, task_canvas, feedback_screen],
});

var commit_screen = ScreenObjects.templates.generic.pages.html_page(
    "ConceptTestPages/thanks.html",
    false,
    {
        'click #download': 'download',
    }
);
commit_screen.options.timeout = 10;
commit_screen.options.title = 'commitScreen';

var study = new lab.flow.Sequence({
    title: 'root@ConceptTest',
    datastore: new lab.data.Store(),
    plugins: [
        new lab.plugins.Metadata(),
        //new lab.plugins.Debug(),
        new lab.plugins.Transmit({
            url: 'backend/datastore.php',
        }),
    ],
    content: [
        ScreenObjects.templates.generic.pages.html_page(
            "ConceptTestPages/welcome.html"
        ),
        ScreenObjects.templates.generic.pages.html_page(
            "ConceptTestPages/instructions-1.html"
        ),
        ScreenObjects.templates.generic.pages.html_page(
            "ConceptTestPages/instructions-2.html"
        ),
        ScreenObjects.templates.generic.pages.html_page(
            "ConceptTestPages/namubonho-learning.html"
        ),
        new lab.flow.Loop({
            title: 'preTrialLoop',
            template: trialFlow,
            templateParameters: preTrials,
            shuffle: true,
            parameters: {},
        }),
        ScreenObjects.templates.generic.pages.html_page(
            "ConceptTestPages/intertrial.html"
        ),
        ScreenObjects.templates.generic.pages.html_page(
            "ConceptTestPages/namubonho-pretrial.html"
        ),
        new lab.flow.Loop({
            title: 'trialLoop',
            template: trialFlow,
            templateParameters: trials,
            shuffle: true,
            parameters: {},
        }),
        commit_screen,
    ],
    messageHandlers: {
        'after:end': function() {
            this.options.datastore.download();
        }
    },
});

study.run();