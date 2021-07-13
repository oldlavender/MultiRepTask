import "./lib/lab.js";
import { ConceptualModel } from "./ConceptualModel.js";
import { Revision, ScreenObjects } from "./ScreenObjects.js";

Revision.SandBox = {
    major: 0,
    minor: 0,
    rev: 7,
    timestamp: '2021-07-12 9:13PM',
};
Revision.General = {
    major: 0,
    minor: 3,
    rev: 29,
    timestamp: '2021-07-12 9:13PM',
};

const GenerateLoopData = (n, classType, dataType) => {
    var ret = [];
    while (ret.length < n) {
        ret.push(new classType(dataType));
    }
};
const revString = (major, minor, rev) => `${major}.${minor}.${rev}`;
const revSet = (revInfo) => revString(revInfo.major, revInfo.minor, revInfo.rev);


var namubonho_s1 = GenerateLoopData(
    500,
    ConceptualModel.classes.NamuBonho,
    ConceptualModel.datatypes.ModelType.RANDOM_NAMUBONHO
);
var wugtug_s1 = GenerateLoopData(
    500,
    ConceptualModel.classes.WugTug,
    ConceptualModel.datatypes.RANDOM_WUGTUG
);

class EventMgr {
    constructor(options) {
      this.title = options.title;
    }
  
    handle(context, event) {
      console.log(`Component ${ this.title } received ${ event }. Context= ${context}`);
    }
}

var welcomeScreen = ScreenObjects.templates.generic.pages.html_page(
    "Pages/welcome.html"
);
welcomeScreen.options.parameters = {
    ScreenObjectsRev: revSet(Revision.ScreenObjects),
    ScreenObjectsTS: Revision.ScreenObjects.timestamp,
    ConceptualModelRev: revSet(Revision.ConceptualModel),
    ConceptualModelTS: Revision.ConceptualModel.timestamp,
    SandBoxRev: revSet(Revision.SandBox),
    SandBoxTS: Revision.SandBox.timestamp,
    Rev: revSet(Revision.General),
    TS: Revision.General.timestamp,
};

var study = new lab.flow.Sequence({
    title: 'MultiRepTest',
    datastore: new lab.data.Store(),
    plugins: [
        new EventMgr({
            title: 'root',
        }),
    ],
    content: [
        welcomeScreen,
    ],
    messageHandlers: {

    },
});

study.run();

/**
 *                 ^THE CODE ABOVE is the future experimental code
 * 
 *        THE CODE BELOW is a set of tests for objects and misc stuff
 */

console.log(".: NAMU-BONHO SECTION :.");

var namu = new ConceptualModel.classes.NamuBonho(ConceptualModel.datatypes.ModelType.NAMU);
var bonho = new ConceptualModel.classes.NamuBonho(ConceptualModel.datatypes.ModelType.BONHO);
var hybrid = new ConceptualModel.classes.NamuBonho(ConceptualModel.datatypes.ModelType.AMBIGUOUS_NAMUBONHO);
var any_nb = new ConceptualModel.classes.NamuBonho(ConceptualModel.datatypes.ModelType.RANDOM_NAMUBONHO);

var namu_data = namu.GetData();
var bonho_data = namu.GetDataCopy();

console.log("namu=", namu_data);
console.log("bonho=", bonho_data);
console.log("hybrid=", hybrid.GetData());
console.log("any_nb=", any_nb.GetData());

namu.Generate(ConceptualModel.datatypes.ModelType.BONHO);
bonho.Generate(ConceptualModel.datatypes.ModelType.RANDOM_NAMUBONHO_HYBRIDALLOWED);

console.log("new namu=", namu.GetData());
console.log("new bonho=", bonho.GetData());

console.log(".: WUG-TUG SECTION :.");

var wug = new ConceptualModel.classes.WugTug(ConceptualModel.datatypes.ModelType.WUG);
var tug = new ConceptualModel.classes.WugTug(ConceptualModel.datatypes.ModelType.TUG);
var any_wt = new ConceptualModel.classes.WugTug(ConceptualModel.datatypes.ModelType.RANDOM_WUGTUG);

console.log("wug=", wug.GetData());
console.log("tug=", tug.GetData());
console.log("any_wt=", any_wt.GetData());

wug.Generate(ConceptualModel.datatypes.ModelType.RANDOM_WUGTUG);

console.log("new wug=", wug.GetData());

console.log("Hello, world");/**/