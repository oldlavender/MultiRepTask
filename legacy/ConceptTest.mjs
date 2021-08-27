//import "./lib/lab.js";
//import "./lib/lab.fallback.js";
import { RawScreenObjects, ScreenObjects, Revision } from "./ScreenObjects.js";

Revision.ConceptTest = {
    major: 0,
    minor: 2,
    rev: 52,
    timestamp: '2021-06-08 6:39PM',
};
Revision.General = {
    major: 0,
    minor: 2,
    rev: 73,
    timestamp: '2021-06-08 6:39PM',
};

var randGen = new lab.util.Random();

const namuAngles = rangeArray(15, 75);
const bonhoAngles = rangeArray(90+15, 90+75);
const namu_p1Widths = rangeArray(65, 90); //ellipse
const bonho_p1Widths = rangeArray(105, 130); //ellipse
const namu_p2Widths = rangeArray(35, 55); //rect
const bonho_p2Widths = rangeArray(85, 105); //rect
// old approach with lines, kept for compatibility
// will be removed soon
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
    var type, angle, p1Angle, p2Angle, p1Width, p2Width, strokeWidth, retType;
    var nbTypeModel = randGen.choice(nbTypes);

    if (ambiguous) {
        type = 'ambiguous';
    }
    else {
        type = nbTypeModel;
    }

    if (nbTypeModel == 'namu') {
        p1Width = randGen.choice(namu_p1Widths);
    }
    else {
        p1Width = randGen.choice(bonho_p1Widths);
    }

    if ((nbTypeModel == 'namu' && ambiguous) || 
        (nbTypeModel == 'bonho' && !ambiguous)) {
        // generate contradictory/ambiguous stimuli
        //p2Angle = randGen.choice(bonhoAngles); //kept for log purposes
        p2Width = randGen.choice(bonho_p2Widths);
    }
    else {
        // generate convergente/unambiguous stimuli
        // p2Angle = randGen.choice(namuAngles); //kept for log purposes
        p2Width = randGen.choice(namu_p2Widths);
    }

    var ret = {
        ambiguity: ambiguous,
        type: type,
        p1Angle: p1Angle,
        p1Width: p1Width,
        p2Width: p2Width,
        p2Angle: p2Angle,
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
        var status, hint, tit;

        //console.log('feedback_screen@before:prepare');
        //console.log('this=', this);
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
                status = "está incorreta";
                hint = "Tente responder de forma mais precisa";
                //msg = 'A sua resposta está incorreta. Tente responder';
                //msg += ' de forma mais precisa nas próximas vezes!';
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
                tit = 'RESPOSTA CORRETA, PARABÉNS!';
                status = "perfeita: correta e dentro do tempo proposto";
                hint = "Continue assim";
                //msg = 'A sua resposta está perfeita: correta e dentro';
                //msg += ' do tempo proposto. Continue assim nas próximas';
                //msg += 'vezes!';
                break;
            case 2: case 4: case 0: //out of time, ambiguity scenario
                this.parameters.bgColor = 'yellow';
                this.parameters.fgColor = 'black';
                tit = 'RESPOSTA FORA DO LIMITE DE TEMPO';
                status = "demorou mais do que os 5 segundos delimitados";
                hint = "Tente responder mais rápido";
                //msg = 'A sua resposta demorou mais do que os 5 segundos que ';
                //msg += 'foram delimitados. Tente responder mais rápido';
                //msg += ' nas próximas vezes!';
                break;
            case 5: //in time, ambiguity scenario
                this.parameters.bgColor = 'lightblue';
                this.parameters.fgColor = 'black';
                tit = 'RESPOSTA EM TEMPO ACEITÁVEL!';
                status = "está dentro do limite de tempo";
                hint = "Continue assim";
                //msg = 'A sua resposta está dentro do limite de tempo ';
                //msg += 'aceitável. Continue assim nas próximas ';
                //msg += 'vezes!';
                break;
        }
        //console.log("score=",score);

        if (!this.aggregateParameters.ambiguity) {
            this.options.parameters.fbExpected = this.aggregateParameters.type;
        }
        // disabled: use structured messages instead!
        // this.options.parameters.fbMessage = msg;
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
    },
    'run': function() {
        this.options.parameters.screenWidth = this.options.canvas.width;
        this.options.parameters.screenHeight = this.options.canvas.height;
        console.log(this.options.title,":show");
        console.log("this.options.content=", this.options.content);
    },
    'show': function(){
        
    },
};

var preTrials = [], trials = [], rChoices = [true,false,true];
const trialsPerLoop = 20; // Number of trials per loop
while (preTrials.length < trialsPerLoop && trials.length < trialsPerLoop) {
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

var welcomeScreen = ScreenObjects.templates.generic.pages.html_page(
    "ConceptTestPages/welcome.html"
);
welcomeScreen.options.parameters = {
    ScreenObjectsRev: `${
        Revision.ScreenObjects.major
    }.${
        Revision.ScreenObjects.minor
    }.${
        Revision.ScreenObjects.rev
    }`,
    ScreenObjectsTS: Revision.ScreenObjects.timestamp,
    ConceptTestRev: `${
        Revision.ConceptTest.major
    }.${
        Revision.ConceptTest.minor
    }.${
        Revision.ConceptTest.rev
    }`,
    ConceptTestTS: Revision.ConceptTest.timestamp,
    Rev: `${
        Revision.General.major
    }.${
        Revision.General.minor
    }.${
        Revision.General.rev
    }`,
    TS: Revision.General.timestamp,
};

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
        welcomeScreen,
        /*ScreenObjects.templates.generic.pages.html_page(
            "ConceptTestPages/instructions-1.html"
        ),*/ //removed for computer-only usage
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

console.log("parameters=", welcomeScreen.options.parameters);