import { LabCanvasSquare } from "../../lib/canvascontent/LabCanvasSquare.mjs";
import { rect_defaults } from "../../lib/canvascontent/LabCanvasRectangle.mjs";

var lcr = [];

describe(
    "LabCanvasSquare",
    ()=>{
        test(
            "LabCanvasRectangle constructor must set passed values or ".concat(
                "defaults when parameters are not passed, except for ",
                "the mandatory parameters"
            ),
            ()=>{
                lcr.push(new LabCanvasSquare(80));
                lcr.push(new LabCanvasSquare(
                    120, -300, 10, 90, 'orange', 'just-a-random-square'
                ));
                expect(lcr[0].width).toBe(80);
                expect(lcr[0].height).toBe(80);
                expect(lcr[0].dimension).toBe(80);
                expect(lcr[0].left).toEqual(rect_defaults.left);
                expect(lcr[0].top).toEqual(rect_defaults.top);
                expect(lcr[0].angle).toEqual(rect_defaults.angle);
                expect(lcr[0].fill).toBe(rect_defaults.fill);
                expect(lcr[0].id).toBe(rect_defaults.id);

                expect(lcr[1].width).toBe(120);
                expect(lcr[1].height).toBe(120);
                expect(lcr[1].dimension).toBe(120);
                expect(lcr[1].left).toEqual(-300);
                expect(lcr[1].top).toEqual(10);
                expect(lcr[1].angle).toEqual(90);
                expect(lcr[1].fill).toBe('orange');
                expect(lcr[1].id).toBe('just-a-random-square');
            }
        );
    }
);