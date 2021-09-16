import { LabCanvasEllipse, ellipse_defaults } from "../../lib/canvascontent/LabCanvasEllipse.mjs";

var lcr = [];

describe(
    "LabCanvasEllipse",
    ()=>{
        test(
            "LabCanvasEllipse constructor must set passed values or ".concat(
                "defaults when parameters are not passed, except for ",
                "the mandatory parameters"
            ),
            ()=>{
                lcr.push(new LabCanvasEllipse(130, 100));
                lcr.push(new LabCanvasEllipse(
                    160, 120, -300, 10, 90, 'orange', 'just-a-random-ellipse'
                ));
                expect(lcr[0].width).toBe(130);
                expect(lcr[0].height).toBe(100);
                expect(lcr[0].left).toEqual(ellipse_defaults.left);
                expect(lcr[0].top).toEqual(ellipse_defaults.top);
                expect(lcr[0].angle).toEqual(ellipse_defaults.angle);
                expect(lcr[0].fill).toBe(ellipse_defaults.fill);
                expect(lcr[0].id).toBe(ellipse_defaults.id);

                expect(lcr[1].width).toBe(160);
                expect(lcr[1].height).toBe(120);
                expect(lcr[1].left).toEqual(-300);
                expect(lcr[1].top).toEqual(10);
                expect(lcr[1].angle).toEqual(90);
                expect(lcr[1].fill).toBe('orange');
                expect(lcr[1].id).toBe('just-a-random-ellipse');
            }
        );
    }
);