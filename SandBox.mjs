import "./lib/lab.js";
import { ConceptualModel, NamuBonho } from "./ConceptualModel.js";
import { ScreenObjects, Screens } from "./ScreenObjects.js";
import { Revision, Handlers } from "./Handlers.js";
import { move, MoveLab } from "./plugins/move.lab.mjs";

Revision.SandBox = {
    major: 0,
    minor: 0,
    rev: 35,
    timestamp: '2021-08-12 11:44PM',
};
Revision.General.major = 0;
Revision.General.minor = 3;
Revision.General.rev = 142;
Revision.General.timestamp = '2021-08-14 9:01PM';

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



var loop_namubonho_learning = ScreenObjects.templates.generic.flow.loop(
    Screens.sequence.namubonho_learning,
    Handlers.utils.GenerateLoopData(
        5,
        ConceptualModel.classes.NamuBonho,
        ConceptualModel.datatypes.ModelType.RANDOM_NAMUBONHO
    ),
    true,
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
    Handlers.utils.GenerateLoopData(
        5,
        ConceptualModel.classes.WugTug,
        ConceptualModel.datatypes.ModelType.RANDOM_WUGTUG
    ),
    true,
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
    Handlers.utils.GenerateLoopData(
        10,
        ConceptualModel.classes.ZilnarOlbar,
        ConceptualModel.datatypes.ModelType.RANDOM_ZILNAROLBAR
    ),
    true,
    'zilnarolbar_loop',
    [
        new Handlers.classes.EventMgr({
            title: 'zilnarolbar_loop',
            log: loop_log,
        }),
    ]
);

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

study.run();

/**
 *                 ^THE CODE ABOVE is the future experimental code
 * 
 *        THE CODE BELOW is a set of tests for objects and misc stuff
 */



console.log(".: EXPERIMENT RUN SECTION :.");