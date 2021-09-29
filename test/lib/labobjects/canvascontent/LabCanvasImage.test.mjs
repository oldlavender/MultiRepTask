import { describe, test, expect } from "@jest/globals";
import {
    LabCanvasImage, image_defaults 
} from "../../../../lib/labobjects/canvascontent/LabCanvasImage.mjs";

var lcr = [];

describe("LabCanvasImage", () => {
    test("LabCanvasImage constructor must set passed values or ".concat(
        "defaults when parameters are not passed, except for the",
        "mandatory parameters."
    ), () => {

        lcr.push(new LabCanvasImage('image.png'));

        expect(lcr[0]).toHaveProperty('src', 'image.png');
        expect(lcr[0]).toHaveProperty('width', image_defaults.width);
        expect(lcr[0]).toHaveProperty('height', image_defaults.height);
        expect(lcr[0]).toHaveProperty('autoScale', image_defaults.autoScale);
        expect(lcr[0]).toHaveProperty('left', image_defaults.left);
        expect(lcr[0]).toHaveProperty('top', image_defaults.top);
        expect(lcr[0]).toHaveProperty('angle', image_defaults.angle);
        expect(lcr[0]).toHaveProperty('fill', image_defaults.fill);
        expect(lcr[0]).toHaveProperty('id', image_defaults.id);


        lcr.push(new LabCanvasImage(
            'anotherimage.jpg', 240, 180, undefined, 
            -200, -80, 90, 'green', 'anotherimage'
        ));

        expect(lcr[1]).toHaveProperty('src', 'anotherimage.jpg');
        expect(lcr[1]).toHaveProperty('width', 240);
        expect(lcr[1]).toHaveProperty('height', 180);
        expect(lcr[1]).toHaveProperty('autoScale', undefined);
        expect(lcr[1]).toHaveProperty('left', -200);
        expect(lcr[1]).toHaveProperty('top', -80);
        expect(lcr[1]).toHaveProperty('angle', 90);
        expect(lcr[1]).toHaveProperty('fill', 'green');
        expect(lcr[1]).toHaveProperty('id', 'anotherimage');


        lcr.push(new LabCanvasImage(
            'yetanotherimage.jpg', 300, 200, 'width', 
            -250, -50, 45, 'red', 'yetanotherimage'
        ));

        expect(lcr[2]).toHaveProperty('src', 'yetanotherimage.jpg');
        expect(lcr[2]).toHaveProperty('width', undefined); //autoScale=width
        expect(lcr[2]).toHaveProperty('height', 200);
        expect(lcr[2]).toHaveProperty('autoScale', 'width');
        expect(lcr[2]).toHaveProperty('left', -250);
        expect(lcr[2]).toHaveProperty('top', -50);
        expect(lcr[2]).toHaveProperty('angle', 45);
        expect(lcr[2]).toHaveProperty('fill', 'red');
        expect(lcr[2]).toHaveProperty('id', 'yetanotherimage');
    });
});