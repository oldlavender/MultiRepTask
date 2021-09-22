import { LabCanvasSquare, square_defaults } from "../../../lib/labobjects/canvascontent/LabCanvasSquare.mjs";

var lcr = [];

describe(
    "LabCanvasSquare",
    ()=>{
        test(
            "LabCanvasSquare constructor must set passed values or ".concat(
                "defaults when parameters are not passed, except for ",
                "the mandatory parameters."
            ),
            ()=>{
                lcr.push(new LabCanvasSquare(80));
                expect(lcr[0].width).toBe(80);
                expect(lcr[0].height).toBe(80);
                expect(lcr[0].dimensions).toBe(80);
                expect(lcr[0].left).toBe(square_defaults.left);
                expect(lcr[0].top).toBe(square_defaults.top);
                expect(lcr[0].angle).toBe(square_defaults.angle);
                expect(lcr[0].fill).toBe(square_defaults.fill);
                expect(lcr[0].id).toBe(square_defaults.id);

                lcr.push(new LabCanvasSquare(
                    120, -300, 10, 90, 'orange', 'just-a-random-square'
                ));
                expect(lcr[1].width).toBe(120);
                expect(lcr[1].height).toBe(120);
                expect(lcr[1].dimensions).toBe(120);
                expect(lcr[1].left).toBe(-300);
                expect(lcr[1].top).toBe(10);
                expect(lcr[1].angle).toBe(90);
                expect(lcr[1].fill).toBe('orange');
                expect(lcr[1].id).toBe('just-a-random-square');
            }
        );
    }
);