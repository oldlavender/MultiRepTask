import { LabCanvasRectangle } from "../../lib/canvascontent/LabCanvasRectangle.mjs";

var lcr = [];

describe(
    "",
    ()=>{
        test(
            "LabCanvasRectangle constructor must set passed values or ".concat(
                "defaults when parameters are not passed, except for ",
                "the mandatory parameters"
            ),
            ()=>{
                lcr.push(new LabCanvasRectangle(130, 100));
                lcr.push(new LabCanvasRectangle(
                    160, 120, -300, 10, 90, 'orange', 'just-a-random-rectangle'
                ));
                expect(lcr[0].width).toBe(130);
                expect(lcr[0].height).toBe(100);
                expect(lcr[0].left).toEqual(0);
                expect(lcr[0].top).toEqual(0);
                expect(lcr[0].angle).toEqual(0);
                expect(lcr[0].fill).toBe('black');
                expect(lcr[0].id).toBe('unamed-rectangle');

                expect(lcr[1].width).toBe(160);
                expect(lcr[1].height).toBe(120);
                expect(lcr[1].left).toEqual(-300);
                expect(lcr[1].top).toEqual(10);
                expect(lcr[1].angle).toEqual(90);
                expect(lcr[1].fill).toBe('orange');
                expect(lcr[1].id).toBe('just-a-random-rectangle');
            }
        );
    }
);