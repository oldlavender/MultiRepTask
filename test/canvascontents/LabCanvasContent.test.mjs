import { describe, expect, test, it, jest } from "@jest/globals";
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
                
                expect(lcc[0].type).toBe("untyped");
                expect(lcc[0].mandatory.length).toBe(4);
                expect(lcc[0].reserved.length).toBe(5);
                expect(lcc[0].locked.length).toBe(0);
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
                ).toThrow(); 
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
            "setMandatory() must make the property mandatory",
            ()=>{
                lcc[3].setMandatory("peacock"); //lcc[3] is no longer complete
                expect(lcc[3].IsComplete()).toEqual(false);
            }
        );
    }
);