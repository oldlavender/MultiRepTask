import { describe, expect, test } from "@jest/globals";
import { LabCanvasContent } from "../../lib/canvascontent/LabCanvasContent.mjs";

var lcc = [];

describe(
    "LabCanvasCOntent",
    ()=>{
        test(
            "Constructor must set properties correctly and validate errors",
            ()=>{
                lcc.push(new LabCanvasContent(
                    "untyped",
                    {
                        top: 0,
                        left: 0,
                        strokeWidth: 1,
                    },
                    {
                        left: -300,
                        text: 'Heyy',
                    }
                ));
                expect(
                    ()=>new LabCanvasContent(1)
                ).toThrowError(/.*\(\):\ ([\w]+) must be a string/);
                var exp_mandatory = ['id', 'left', 'top', 'type'];
                var exp_reserved = [
                    '_properties', '_reserved', '_default', 
                    '_mandatory', '_explicit', '_type', '_locked', 
                    '_equivalence', '_externalink'
                ];
                var exp_locked = [];
                
                expect(lcc[0]._type).toBe("untyped");
                expect(lcc[0]._mandatory.length).toEqual(exp_mandatory.length);
                expect(lcc[0]._mandatory).toEqual(
                    expect.arrayContaining(exp_mandatory)
                );
                expect(lcc[0]._reserved.length).toEqual(exp_reserved.length);
                expect(lcc[0]._reserved).toEqual(
                    expect.arrayContaining(exp_reserved)
                );
                expect(lcc[0]._locked.length).toEqual(exp_locked.length);
                expect(lcc[0]._locked).toEqual(
                    expect.arrayContaining(exp_locked)
                );
                // values expected to default
                expect(lcc[0].top).toBe(0);
                expect(lcc[0].strokeWidth).toBe(1);
                // values expected to be set
                expect(lcc[0].left).toBe(-300);
                expect(lcc[0].text).toBe('Heyy');
            }
        );
        test(
            "The validateString method must throw an error if the ".concat(
                "s parameter is not a string"
            ),
            ()=>{
                lcc.push(new LabCanvasContent('i-text'));
                expect(
                    ()=>lcc[1].validateString(1, "name", "context")
                ).toThrowError(/.*::context\(\): name must be a string/);
                expect(()=>lcc[1].validateString("", "name", "")).not.toThrow();
            }
        );
        test(
            "The IsComplete method must return  true if ".concat(
                "all mandatory options are filled"
            ),
            ()=>{
                var vals = {
                    left: 0,
                    top: 0,
                };
                lcc.push(new LabCanvasContent(
                    "i-text",
                    {id:'whatever1', ...vals}, //defaults
                    {} //values, empty
                ));
                lcc.push(new LabCanvasContent(
                    "i-text",
                    {},
                    {id: 'whatever2', ...vals}
                ));

                expect(lcc[0].IsComplete()).toBe(false);
                expect(lcc[1].IsComplete()).toBe(false);
                expect(lcc[2].IsComplete()).toBe(true);
                expect(lcc[3].IsComplete()).toBe(true);

            }
        );
        test(
            "Method addProperties must add a single property or an ".concat(
                "array of them, and method addProperty must add a single  ",
                "one; in both cases with proper modes"
            ),
            ()=>{
                lcc[0].addProperty("monkey");
                expect(lcc[0].hasOwnProperty("monkey")).toEqual(true);
                lcc[0].addProperty("cat", {configurable: false});
                // if configurable is setting properly, there should be an
                //   exception when setting the same property again
                expect(
                    ()=>lcc[0].addProperty("cat", {configurable: true})
                ).toThrowError(
                    /.*previously set unconfigurable property.*\(id=.*\)/
                );
                lcc[0].addProperties("dog");
                expect(lcc[0].hasOwnProperty('dog')).toEqual(true);
                lcc[0].addProperties(["zebra", 'horse']);
                expect(lcc[0].hasOwnProperty('zebra')).toEqual(true);
                expect(lcc[0].hasOwnProperty("horse")).toEqual(true);
                lcc[0].addProperties(
                    {
                        "wolf": { configurable: false },
                        "giraffe": { configurable: true },
                    }, 
                    {
                        enumerable: true,
                    }
                );
                expect(lcc[0].hasOwnProperty("wolf")).toEqual(true);
                expect(lcc[0].hasOwnProperty("giraffe")).toEqual(true);
                expect(
                    ()=>lcc[0].addProperty("wolf", {configurable: true})
                ).toThrow();
                expect(
                    ()=>lcc[0].addProperty("giraffe", {enumerable: false})
                ).not.toThrow();
                
            }
        );
        test(
            "setDefaults() must set initial values",
            ()=>{
                lcc[2].setDefaults({
                    angle: 0,
                    fill: 'black',
                });
                expect(lcc[2].angle).toEqual(0);
                expect(lcc[2].fill).toEqual('black');
            }
        );
        test(
            "fillProperties() must set values according to the ".concat(
                "object argument if properties exist and return the object ",
                "so it's easier to add extra parameters"
            ),
            ()=>{
                var lcc2 = lcc[2].fillProperties({
                    angle: 150,
                    top: -300,
                    invalidproperty: 0,
                });
                expect(lcc2.angle).toEqual(150);
                expect(lcc[2].top).toEqual(-300);
                expect(lcc2.hasOwnProperty('invalidproperty')).toEqual(false);
                expect(lcc[2].invalidproperty).toBeUndefined();
                expect(lcc2).toBe(lcc[2]);
            }
        );
        test(
            "setMandatory() must make the property mandatory, and ".concat(
                "explicitly necessary when specified."
            ),
            ()=>{
                lcc[3].setMandatory("peacock"); //lcc[3] is no longer complete
                expect(lcc[3].IsComplete()).toEqual(false);
                expect(lcc[3].hasOwnProperty("peacock")).toEqual(true);
                lcc[2].setMandatory("lion", true);
                lcc[2].setDefaults({lion: "rrrrowwww"});
                expect(lcc[2].IsComplete()).toEqual(false);
            }
        );
        test(
            "addEquivalence() must 'link' two objects values (metaphorically)", 
            ()=>{
                lcc[3].addProperties([
                    'pigeon', 'dragon', 'bee', 'ladybug', 'fox', 'mouse'
                ]);
                lcc[3].addEquivalence('pigeon', ['dragon', 'bee']); //one-way
                lcc[3].pigeon = 666;
                expect(lcc[3].dragon).toEqual(666);
                expect(lcc[3].bee).toEqual(666);
                expect(lcc[3].pigeon).toEqual(666);
                lcc[3].dragon = 555; //should not impact others
                expect(lcc[3].dragon).toEqual(555);
                expect(lcc[3].bee).toEqual(666);
                expect(lcc[3].pigeon).toEqual(666);

                lcc[3].addEquivalence(null, ['ladybug', 'fox', 'mouse']);
                lcc[3].ladybug = 999; // should impact all three
                expect(lcc[3].fox).toEqual(999);
                expect(lcc[3].ladybug).toEqual(999);
                expect(lcc[3].mouse).toEqual(999);
                lcc[3].fox = 666;
                expect(lcc[3].fox).toEqual(666);
                expect(lcc[3].ladybug).toEqual(666);
                expect(lcc[3].mouse).toEqual(666);
                lcc[3].mouse = 777;
                expect(lcc[3].fox).toEqual(777);
                expect(lcc[3].ladybug).toEqual(777);
                expect(lcc[3].mouse).toEqual(777);
            }
        );
        test(
            "Only the appropriate properties must be enumerable",
            ()=>{
                lcc.push(new LabCanvasContent('polygon'));
                lcc[4].addProperties(['apple', 'pineapple']);
                lcc[4].fillProperties({
                    pineapple: 666,
                    apple: 666,
                    pen: 666, //should be ignored
                });
                var expected_keys = [
                    'id', 'left', 'top', 'type', // hard-coded properties
                    'apple', 'pineapple', //the ones we added
                ];

                expect(lcc[4].pineapple).toEqual(666);
                expect(lcc[4].apple).toEqual(666);
                expect(lcc[4].hasOwnProperty('pen')).toEqual(false);
                expect(Object.keys(lcc[4])).toEqual(
                    expect.arrayContaining(expected_keys)
                );
                
            }
        );
        test(
            "fromLabCanvasObjectTemplate method must load a ".concat(
                "perfect copy of the argument object and throw errors when ",
                "the argument type is not an instance of LabCanvasObject"
            ),
            ()=>{
                var expected_keys = [
                    'id', 'left', 'top', 'type', // hard-coded properties
                    'apple', 'pineapple', // the ones we added before
                ];
                lcc[4].reserveProperties('_test_reserved', []);
                lcc.push(new LabCanvasContent('polygon'));
                expect(()=>lcc[5].fromLabCanvasObjectTemplate({})).toThrow(
                    /.*fromLabCanvasObjectTemplate.*not an instance of.*/
                );
                expect(
                    ()=>lcc[5].fromLabCanvasObjectTemplate(lcc[3])
                ).toThrow(/.*Cannot.*instance of type.*into.*of type.*/);
                expect(
                    ()=>lcc[5].fromLabCanvasObjectTemplate(lcc[4])
                ).not.toThrow();
                lcc[5].fromLabCanvasObjectTemplate(lcc[4]);
                expect(Object.keys(lcc[5])).toEqual(
                    expect.arrayContaining(Object.keys(lcc[4]))
                );
                expect(lcc[5]._reserved).toEqual(
                    expect.arrayContaining(['_test_reserved'])
                );
                expect(lcc[5].pineapple).toEqual(666);
                expect(lcc[5].apple).toEqual(666);
            }
        );
        test(
            "Method FromTemplate must load a perfect copy of".concat(
                " the passed object with proper type validation"
            ),
            ()=>{
                lcc.push(
                    new LabCanvasContent('polygon'),
                    new LabCanvasContent('square'),
                );

                lcc[6].FromTemplate(lcc[5]);
                expect(Object.keys(lcc[6])).toEqual(
                    expect.arrayContaining(Object.keys(lcc[5]))
                );
                
                const badtemplate = () => lcc[7].FromTemplate(['invalid']);
                expect(badtemplate).toThrow(/.*::FromTemplate.*Unsupp.*type.*/);

                lcc[7].FromTemplate({type: 'square', watermelon: 666}, 'nid');
                expect(lcc[7].watermelon).toEqual(666);
                expect(lcc[7].id).toEqual('nid');
            }
        );
        test(
            "Method has() must indicate whether a property exists or not",
            ()=>{
                expect(lcc[4].has('pineapple')).toEqual(true);
                expect(lcc[4].has("hfasduofasoiduhi")).toEqual(false);
            }
        );
        test(
            "Method lockProperty must set a property not ".concat(
                "writeable, permanently or not, accordint to request"
            ),
            ()=>{
                lcc[4].lockProperty("pineapple");
                // permanent should be false by default
                lcc[4].pineapple = 999; //should not work, the value must not
                                        // change, but no exception is thrown
                expect(lcc[4].pineapple).toEqual(666);
            }
        );
        test(
            "Class must work with handy 1-line construction/attribution", 
            () => {
                var handy1 = new LabCanvasContent("square").FromTemplate(
                    lcc[7]
                ).fillProperties({watermelon: 5});
                expect(handy1.watermelon).toEqual(5);
            }
        );
    }
);