import { LabCanvasCircle, circle_defaults } from "../../lib/canvascontent/LabCanvasCircle.mjs";

var lcr = [];

describe(
    "LabCanvasCircle",
    ()=>{
        test(
            "LabCanvasCircle constructor must set passed values or ".concat(
                "defaults when parameters are not passed, except for ",
                "the mandatory parameters"
            ),
            ()=>{
                lcr.push(new LabCanvasCircle(80));
                lcr.push(new LabCanvasCircle(
                    120, -300, 10, 90, 'orange', 'just-a-random-circle'
                ));
                expect(lcr[0].width).toBe(80);
                expect(lcr[0].height).toBe(80);
                expect(lcr[0].dimensions).toBe(80);
                expect(lcr[0].left).toBe(circle_defaults.left);
                expect(lcr[0].top).toBe(circle_defaults.top);
                expect(lcr[0].angle).toBe(circle_defaults.angle);
                expect(lcr[0].fill).toBe(circle_defaults.fill);
                expect(lcr[0].id).toBe(circle_defaults.id);

                expect(lcr[1].width).toBe(120);
                expect(lcr[1].height).toBe(120);
                expect(lcr[1].dimensions).toBe(120);
                expect(lcr[1].left).toBe(-300);
                expect(lcr[1].top).toBe(10);
                expect(lcr[1].angle).toBe(90);
                expect(lcr[1].fill).toBe('orange');
                expect(lcr[1].id).toBe('just-a-random-circle');
            }
        );
    }
);