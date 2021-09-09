import { describe, expect, test, it, jest } from "@jest/globals";
import { LabCanvasContent } from "../../lib/canvascontent/LabCanvasContent.mjs";

var lcc = [];

describe(
    "LabCanvasCOntent",
    ()=>{
        test(
            "...",
            ()=>{

            }
        );
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
                    new LabCanvasContent(1)
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
            "Methods evoked by the constructor must work properly",
            ()=>{

            }
        );
    }
);