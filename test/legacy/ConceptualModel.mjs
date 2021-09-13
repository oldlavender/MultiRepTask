import { ConceptualModel, NamuBonho } from "../ConceptualModel.js";
import { ScreenObjects, Screens } from "../ScreenObjects.js";
import { Revision, Handlers } from "../Handlers.js";
import { move, MoveLab } from "../plugins/move.lab.mjs";

console.log(".: NAMU-BONHO SECTION :.");

var namu = new ConceptualModel.classes.NamuBonho(ConceptualModel.datatypes.ModelType.NAMU);
var bonho = new ConceptualModel.classes.NamuBonho(ConceptualModel.datatypes.ModelType.BONHO);
var hybrid = new ConceptualModel.classes.NamuBonho(ConceptualModel.datatypes.ModelType.AMBIGUOUS_NAMUBONHO);
var any_nb = new ConceptualModel.classes.NamuBonho(ConceptualModel.datatypes.ModelType.RANDOM_NAMUBONHO);

var namu_data = namu.GetData();
var bonho_data = namu.GetDataCopy();

console.log("namu=", namu);
console.log("bonho=", bonho);
console.log("hybrid=", hybrid);
console.log("any_nb=", any_nb);

namu.Generate(ConceptualModel.datatypes.ModelType.BONHO);
bonho.Generate(ConceptualModel.datatypes.ModelType.RANDOM_NAMUBONHO_HYBRIDALLOWED);

console.log("new namu=", namu);
console.log("new bonho=", bonho);

console.log(".: WUG-TUG SECTION :.");

var wug = new ConceptualModel.classes.WugTug(ConceptualModel.datatypes.ModelType.WUG);
var tug = new ConceptualModel.classes.WugTug(ConceptualModel.datatypes.ModelType.TUG);
var any_wt = new ConceptualModel.classes.WugTug(ConceptualModel.datatypes.ModelType.RANDOM_WUGTUG);

console.log("wug=", wug);
console.log("tug=", tug);
console.log("any_wt=", any_wt);

wug.Generate(ConceptualModel.datatypes.ModelType.RANDOM_WUGTUG);

console.log("new wug=", wug);

console.log(".: ZILNAR-OLBAR SECTION :.");

var zilnar = new ConceptualModel.classes.ZilnarOlbar(
    ConceptualModel.datatypes.ModelType.ZILNAR
);
var olbar = new ConceptualModel.classes.ZilnarOlbar(
    ConceptualModel.datatypes.ModelType.OLBAR
);
var any_zo = new ConceptualModel.classes.ZilnarOlbar(
    ConceptualModel.datatypes.ModelType.RANDOM_ZILNAROLBAR
);

console.log("zilnar=", zilnar);
console.log("olbar=", olbar);
console.log("any_zo=", any_zo);