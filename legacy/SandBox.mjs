import "./lib/lab.js";
import { ConceptualModel, NamuBonho } from "./ConceptualModel.js";
import { ScreenObjects, Screens } from "./ScreenObjects.js";
import { Revision, Handlers } from "./Handlers.js";
import { move, MoveLab } from "./plugins/move.lab.mjs";
//import control from "./data/control.trialdata.js";

Revision.SandBox = {
    major: 0,
    minor: 2,
    rev: 43,
    timestamp: '2021-08-18 4:37PM',
};
Revision.General.major = 0;
Revision.General.minor = 4;
Revision.General.rev = 142;
Revision.General.timestamp = '2021-08-14 9:01PM';

// retrieve data
//var control = fetch("./data/control.trialdata.json")
var control = Handlers.utils.loadUrlData("./data/control.trialdata.json");

console.log("control=", control);
var trialdata = control.trialdata;

/*console.log(".: TEST EXPERIMENT PREPARATION SECTION :.");

var s1 = new lab.flow.Sequence({
    title: 'MultiRepTest',
    datastore: new lab.data.Store(),
    plugins: [
        new Handlers.classes.EventMgr({
            title: 'root',
            log: false,
        }),
        new lab.plugins.Debug(),
    ],
    content: [
        new lab.flow.Loop({
            title: 'loop',
            template: new lab.flow.Sequence({
                content: [
                    new lab.html.Screen({
                        content: "${parameters.a}",
                        responses: {
                            'keypress(g)': 'resp',
                            'keypress(Space)': 'advance',
                            'keypress(h)': 'advance',
                        },
                        correctResponse: 'resp',
                        timeout: 5000,
                        messageHandlers: {
                            'after:end': Handlers.handlers.generic.increase_streaks,
                        },
                    }),//trial
                    new lab.html.Screen({
                        content: "Correct? ${ state.correct } <br/> Time: ${ state.duration } <br/> Ended on: ${ state.response }",
                        responses: {
                            'keypress(Space)': 'advance',
                        },
                        timeout: 20000,
                        tardy: true,
                        messageHandlers: {
                            'after:end': Handlers.handlerGenerators.end_streaks(5),
                        },
                    }),//fb1
                    //new lab.canvas.Screen({}),//fb2
                ],
                plugins: [
                    new Handlers.classes.EventMgr({
                        title: 'loopSeq',
                        log: false,
                        verbose: true,
                    }),
                ],
            }),
            templateParameters: [
                { a: 'hahahaa', b: 'fasdfasdf' },
                { a: 'hahsdfahaa', b: 'fasdfasdf' },
                { a: 'hahsdfahaa', b: 'fasdfasdf' },
                { a: 'h3ahaa', b: 'fasdfasdf' },
                { a: 'hahy98dahaa', b: 'fasdfasdf' },
                { a: 'hhh89d78aa', b: 'fasdfasdf' },
                { a: 'hh8fh098fh09faa', b: 'fasdfasdf' },
                { a: 'h97bdsfahahaa', b: 'fasdfasdf' },
                { a: 'hahbs9df8vahaa', b: 'fasdfasdf' },
                { a: 'h7hs8df9a', b: 'fasdfasdf' },
                { a: 'huafhs9d8h0a', b: 'fasdfasdf' },
                { a: 'haf0s9d8', b: 'fasdfasdf' },
                { a: '7uhsd089ewr', b: 'fasdfasdf' },
                { a: 'UFH09aar09fha', b: 'fasdfasdf' },
                { a: 'fah098fh0934', b: 'fasdfasdf' },
            ],
            shuffle: true,
            messageHandlers: {
                'after:prepare': Handlers.handlers.generic.setup_streaks,
            },
        }),
        new lab.html.Screen({
            content: 'bye bye',
        }),
    ],
    messageHandlers: {
        'after:end': function() {
            this.options.datastore.download();
        }
    },
});

console.log(".: TEST EXPERIMENT RUN SECTION :.");

s1.prepare();
s1.run();
*/
console.log(".: EXPERIMENT PREPARATION SECTION :.");
console.log("Revision Info:", Revision);

var loop_log = false;

/*var namubonho_s1 = Handlers.utils.GenerateLoopData(
    500,
    ConceptualModel.classes.NamuBonho,
    ConceptualModel.datatypes.ModelType.RANDOM_NAMUBONHO
); 
var wugtug_s1 = Handlers.utils.GenerateLoopData(
    500,
    ConceptualModel.classes.WugTug,
    ConceptualModel.datatypes.RANDOM_WUGTUG
);*/

console.log(trialdata);

var loop_namubonho_learning = ScreenObjects.templates.generic.flow.loop(
    Screens.sequence.namubonho_learning,
    trialdata.learning.namubonho,
    true,
    15,
    'namubonho_loop',
    [
        new Handlers.classes.EventMgr({
            title: 'namubonho_loop',
            log: loop_log,
        }),
    ]
);

var loop_wugtug_learning = ScreenObjects.templates.generic.flow.loop(
    Screens.sequence.wugtug_learning,
    trialdata.learning.wugtug,
    true,
    15,
    'wugtug_loop',
    [
        new Handlers.classes.EventMgr({
            title: 'wugtug_loop',
            log: loop_log,
        }),
    ]
);

var loop_zilnarolbar_learning = ScreenObjects.templates.generic.flow.loop(
    Screens.sequence.zilnarolbar_learning,
    trialdata.learning.zilnarolbar,
    true,
    15,
    'zilnarolbar_loop',
    [
        new Handlers.classes.EventMgr({
            title: 'zilnarolbar_loop',
            log: loop_log,
        }),
    ]
);

loop_namubonho_learning.on('after:prepare', Handlers.handlers.generic.setup_streaks);
loop_wugtug_learning.on('after:prepare', Handlers.handlers.generic.setup_streaks);
loop_zilnarolbar_learning.on('after:prepare', Handlers.handlers.generic.setup_streaks);

var study = new lab.flow.Sequence({
    title: 'MultiRepTest',
    datastore: new lab.data.Store(),
    plugins: [
        new Handlers.classes.EventMgr({
            title: 'root',
            log: loop_log,
        }),
    ],
    content: [
        Screens.presentation.welcome,/*
        loop_namubonho_,
        */
        loop_namubonho_learning,
        loop_wugtug_learning,
        loop_zilnarolbar_learning,
    ],
    messageHandlers: {
        'after:end': function() {
            this.options.datastore.download();
        }
    },
});

console.log("study=", study);

study.prepare();
study.run();

/**
 *                 ^THE CODE ABOVE is the future experimental code
 * 
 *        THE CODE BELOW is a set of tests for objects and misc stuff
 */



console.log(".: EXPERIMENT RUN SECTION :.");