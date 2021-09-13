import { ScreenObjects, Screens } from "./ScreenObjects.js";
import { Handlers, Revision } from "./Handlers.js";
import { BaseModel, ConceptualModel, ModelSpec, ModelType } from "./ConceptualModel.js";
//import "./lib/FileSaver.js";
//import {saveAs} from "./lib/FileSaver.js";

//var a = saveAs();

var nb = Handlers.utils.GenerateLoopData(
    250,
    ConceptualModel.classes.NamuBonho,
    ConceptualModel.datatypes.ModelType.NAMU
);
nb = nb.concat(
    Handlers.utils.GenerateLoopData(
        250,
        ConceptualModel.classes.NamuBonho,
        ConceptualModel.datatypes.ModelType.BONHO
    )
);
console.log("nb=", nb);

var wt = Handlers.utils.GenerateLoopData(
    250,
    ConceptualModel.classes.WugTug,
    ConceptualModel.datatypes.ModelType.WUG
);
wt = wt.concat(
    Handlers.utils.GenerateLoopData(
        250,
        ConceptualModel.classes.WugTug,
        ConceptualModel.datatypes.ModelType.TUG
    )
);

var zo = Handlers.utils.GenerateZOData(500, ConceptualModel, nb, wt);

var trial_rel_nb = Handlers.utils.GenerateLoopData(
    8,
    ConceptualModel.classes.NamuBonho,
    ConceptualModel.datatypes.ModelType.AMBIGUOUS_NAMUBONHO
);

var trial_rel_frames = Handlers.utils.GenerateZOData(
    8,
    ConceptualModel,
    trial_rel_nb,
    null,
    true,
    ModelType.ZILNAR
).concat(
    Handlers.utils.GenerateZOData(
        8,
        ConceptualModel,
        trial_rel_nb,
        null,
        true,
        ModelType.OLBAR
    )
);

var trial_org_frames = [];
var sentTypes = Object.keys(ModelSpec.ZilnarOlbar.SentenceModels);
var sentTypesOrder = [
    sentTypes[0],
    sentTypes[0],
    sentTypes[1],
    sentTypes[1],
    sentTypes[0],
    sentTypes[0],
    sentTypes[1],
    sentTypes[1],
    sentTypes[0],
    sentTypes[1],
    sentTypes[0],
    sentTypes[1],
    sentTypes[0],
    sentTypes[1],
    sentTypes[0],
    sentTypes[1],
];

for (let i = 0; i < 8; i++) {
    var ii = i+8;
    trial_rel_frames[i].AnnotateSentence('generic', sentTypesOrder[i], 'object');
    trial_rel_frames[ii].AnnotateSentence('specific', sentTypesOrder[ii], 'object');
    trial_org_frames.push(
        trial_rel_frames[i],
        trial_rel_frames[ii]
    );
}

var trial_distractors_namu = Handlers.utils.GenerateLoopData(
    12,
    ConceptualModel.classes.NamuBonho,
    ConceptualModel.datatypes.ModelType.NAMU
);
var trial_distractors_bonho = Handlers.utils.GenerateLoopData(
    12,
    ConceptualModel.classes.NamuBonho,
    ConceptualModel.datatypes.ModelType.BONHO
);

var trial_distractors_fZilnar = Handlers.utils.GenerateZOData(
    12,
    ConceptualModel,
    trial_distractors_namu,
    null,
    true,
    ModelType.ZILNAR
);

var trial_distractors_fOlbar = Handlers.utils.GenerateZOData(
    12,
    ConceptualModel,
    trial_distractors_bonho,
    null,
    true,
    ModelType.OLBAR
);

for (let i = 0; i<3; i++) {
    for (let j = 0; j < 8; j++) {
        let cell = 8*i + j;
        let idx = cell % 12;
        let oeRow = j % 2; //0, 1
        let oeCol = i % 2;
        let oeCell = cell%2;
        let curList = oeRow==0 ? 
                        trial_distractors_fZilnar : 
                        trial_distractors_fOlbar;
        let sType, sRef, sBlank;
        // cur[idx] is the current ZilnarOlbar being pushed
        if (oeCol == 0) { //even col
            if (oeRow == 0) { //even col, even row
                sBlank = 'subject';
            }
            else { //even col, odd row
                sBlank = 'verb';
            }
        }
        else { //odd col
            if (oeRow == 0) { //odd col, even row
                sBlank = 'verb';
            }
            else { //odd col, odd row
                sBlank = 'subject';
            }
        }
        switch(i) {
            case 0:
                if (j < 4) {
                    sType = sentTypes[0];
                }
                else {
                    sType = sentTypes[1];
                }
                break;
            case 1:
                switch (j) {
                    case 0: case 1: case 4: case 5:
                        sType = sentTypes[0];
                        break;
                    case 2: case 3: case 6: case 7:
                        sType = sentTypes[1];
                        break;
                }
                break;
            case 2:
                if (oeRow == 0) {
                    sType = sentTypes[0];
                }
                else {
                    sType = sentTypes[1];
                }
                break;
        }
        curList[idx].AnnotateSentence(
            oeCell==0 ? 'generic' : 'specific', 
            sType, 
            sBlank
        );
        trial_org_frames.push(curList[idx]);
    }
    /*let ii = i+8, iii = ii + 8;
    var blank, blankk, blankki; //avoiding criminal organization suffixes :D
    if (i%2 == 0) {
        blank = 'subject';
        blankki = 'subject';
        blankk = 'verb';
    }
    else {
        blank = 'verb';
        blankki = 'verb';
        blankk = 'subject';
    }
    trial_org_frames.push(
        trial_distractors_frames[i],
        trial_distractors_frames[ii],
        trial_distractors_frames[iii]
    );*/
}

var org_distractor_frames = trial_org_frames.slice(16, 40);

console.log("wt=", wt);

var trialdata = {
    learning: {
        namubonho: nb,
        wugtug: wt,
        zilnarolbar: zo,
    },
    association: {
        association: org_distractor_frames.concat(
            org_distractor_frames.slice(0,8)
        ),
    },
    trial: {
        trial: trial_org_frames,
    },
};

const dataOnly = (key, value) => {
    if (value instanceof BaseModel) {
        return value.GetData();
    }
    return value;
};

var json_exp = JSON.stringify(
    {trialdata: trialdata}, 
    dataOnly, 
    1
);
//var data = "data:text/json;charset=utf-8," + encodeURIComponent(json_exp);
var dwl = new Blob([json_exp], {
    type : 'application/json',
});

saveAs(dwl, "trialdata.json");

/*
var bonho_learning = ;


var namu_learning = ;

var wug_learning = Handlers.utils.GenerateLoopData(
    250,
    ConceptualModel.classes.WugTug,
    ConceptualModel.datatypes.ModelType.WUG
);



var loop_wugtug_learning = ScreenObjects.templates.generic.flow.loop(
    Screens.sequence.wugtug_learning,
    Handlers.utils.GenerateLoopData(
        3,
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
        5,
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
);*/