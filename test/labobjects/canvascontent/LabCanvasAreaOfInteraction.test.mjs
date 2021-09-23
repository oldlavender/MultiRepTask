import { LabCanvasAreaOfInteraction, aoi_defaults } from "../../../lib/labobjects/canvascontent/LabCanvasAreaOfInteraction.mjs";
import { LabCanvasRectangle } from "../../../lib/labobjects/canvascontent/LabCanvasRectangle.mjs";

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
                lcr.push(new LabCanvasAreaOfInteraction('x', 130, 100));
                lcr.push(new LabCanvasAreaOfInteraction(
                    'y', 160, 120, -300, 10, 90, 'just-a-random-aoi'
                ));
                expect(lcr[0].label).toBe('x');
                expect(lcr[0].width).toBe(130);
                expect(lcr[0].height).toBe(100);
                expect(lcr[0].left).toEqual(aoi_defaults.left);
                expect(lcr[0].top).toEqual(aoi_defaults.top);
                expect(lcr[0].angle).toEqual(aoi_defaults.angle);
                expect(lcr[0].id).toBe('aoi_x');
                expect(lcr[0]).not.toHaveProperty('fill');

                expect(lcr[1].label).toBe('y');
                expect(lcr[1].width).toBe(160);
                expect(lcr[1].height).toBe(120);
                expect(lcr[1].left).toEqual(-300);
                expect(lcr[1].top).toEqual(10);
                expect(lcr[1].angle).toEqual(90);
                expect(lcr[1].id).toBe('just-a-random-aoi');
                expect(lcr[1]).not.toHaveProperty('fill');
                
            }
        );
        test( //TODO: 
            "Method FromCommonShape must produce an AOI with same config",
            () => {
                const test_coords = {
                    width: 160, height: 120, left: -300, top: 10, angle: 90,
                    color: 'orange', id: 'yet-another-random-aoi',
                    label: 'z'
                };
                var rect = new LabCanvasRectangle(
                    test_coords.width, test_coords.height, test_coords.left
                ).fillProperties(test_coords);
                lcr.push(new LabCanvasAreaOfInteraction(test_coords.label));
                lcr[2].FromTemplate(rect);
                expect(lcr[2].width).toEqual(test_coords.width);
                expect(lcr[2].height).toEqual(test_coords.height);
                expect(lcr[2].left).toEqual(test_coords.left);
                expect(lcr[2].top).toEqual(test_coords.top);
                expect(lcr[2].angle).toEqual(test_coords.angle);
                expect(lcr[2].id).toEqual(`copy_of_${test_coords.id}`);
                expect(lcr[2]).not.toHaveProperty('fill');

            }
        );
    }
);