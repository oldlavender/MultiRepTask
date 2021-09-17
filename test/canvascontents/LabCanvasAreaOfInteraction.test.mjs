import { LabCanvasAreaOfInteraction, aoi_defaults } from "../../lib/canvascontent/LabCanvasAreaOfInteraction.mjs";

var lcr = [];

describe(
    "LabCanvasAreaOfInteraction",
    ()=>{
        test(
            "LabCanvasAreaOfInteraction constructor must set passed values or ".concat(
                "defaults when parameters are not passed, except for ",
                "the mandatory parameters"
            ),
            ()=>{
                lcr.push(new LabCanvasAreaOfInteraction(130, 100));
                lcr.push(new LabCanvasAreaOfInteraction(
                    160, 120, -300, 10, 90, 'just-a-random-aoi'
                ));
                expect(lcr[0].width).toBe(130);
                expect(lcr[0].height).toBe(100);
                expect(lcr[0].left).toEqual(aoi_defaults.left);
                expect(lcr[0].top).toEqual(aoi_defaults.top);
                expect(lcr[0].angle).toEqual(aoi_defaults.angle);
                expect(lcr[0].fill).toBe(aoi_defaults.fill);
                expect(lcr[0].id).toBe(aoi_defaults.id);

                expect(lcr[1].width).toBe(160);
                expect(lcr[1].height).toBe(120);
                expect(lcr[1].left).toEqual(-300);
                expect(lcr[1].top).toEqual(10);
                expect(lcr[1].angle).toEqual(90);
                expect(lcr[1].fill).toBe(aoi_defaults.fill);
                expect(lcr[1].id).toBe('just-a-random-aoi');
            }
        );
    }
);