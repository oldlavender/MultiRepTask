import { describe, expect, test, it, jest } from "@jest/globals";
import { Response } from "../../../lib/utils/screen/ScreenFunctions.mjs";
import { ScreenButton } from "../../../lib/utils/screen/ScreenFunctions.mjs";

var sb = [];
var circ, text, aoi;
var resps = [];

describe("ScreenFunctions", ()=>{
    test("ScreenButton function must produce a new button with a ".concat(
        " circle, a text and an AOI"
    ), ()=>{
        var btn_config = {
            label: 'left', text: 'L', size: 70, 
            bgcolor: 'red', fgcolor: 'yellow', left: 0, top: 0,
        };
        sb.push(ScreenButton(
            btn_config.label, btn_config.text, 
            btn_config.fgcolor, btn_config.bgcolor,
            btn_config.size, btn_config.left, btn_config.top
        ));
        circ = sb[0][0]; text = sb[0][1]; aoi = sb[0][2];
        expect(circ.dimensions).toEqual(btn_config.size);
        expect(circ.left).toEqual(btn_config.left);
        expect(circ.top).toEqual(btn_config.top);
        expect(circ.angle).toEqual(0);
        expect(circ.fill).toEqual(btn_config.bgcolor);
        expect(circ.id).toMatch(/btn_.*_circ/);

        expect(text.text).toEqual(btn_config.text);
        expect(text.left).toEqual(btn_config.left);
        expect(text.top).toEqual(btn_config.top);
        expect(text.fill).toEqual(btn_config.fgcolor);
        expect(text.fontSize).toEqual((28/65)*btn_config.size);
        expect(text.id).toMatch(/btn_.*_text/);

        expect(aoi.label).toEqual(btn_config.label);
        expect(aoi.width).toEqual(btn_config.size);
        expect(aoi.height).toEqual(btn_config.size);
        expect(aoi.left).toEqual(btn_config.left);
        expect(aoi.top).toEqual(btn_config.top);
        expect(aoi.id).toMatch(/btn_.*_aoi/);
    });
    test("There must be a link established between the properties ".concat(
        "left and top of the three produced objects and between the ",
        "properties width and height of the circle and the AOI."
    ), ()=>{
        circ.left = -666;
        expect(circ.left).toEqual(-666);
        expect(text.left).toEqual(-666);
        expect(aoi.left).toEqual(-666);
        aoi.top = 333;
        expect(circ.top).toEqual(333);
        expect(text.top).toEqual(333);
        expect(aoi.top).toEqual(333);
        text.left = 999;
        expect(circ.left).toEqual(999);
        expect(text.left).toEqual(999);
        expect(aoi.left).toEqual(999);

        circ.width = 400;
        expect(circ.width).toEqual(400);
        expect(aoi.width).toEqual(400);
        aoi.height = 800;
        expect(aoi.height).toEqual(800);
        expect(circ.height).toEqual(800);
    });
    test("The Response() function must create a response object with ".concat(
        "the listed events pointing to the specified response label."
    ), () => {
        resps.push(Response("next", [
            "keypress(Space)", "keypress(Enter)", "keypress(Right)"
        ], Response("exit", ["click #exit", "keypress(Esc)"])));
        expect(resps[0]["keypress(Space)"]).toEqual("next");
        expect(resps[0]["keypress(Enter)"]).toEqual("next");
        expect(resps[0]["keypress(Right)"]).toEqual("next");
        expect(resps[0]["click #exit"]).toEqual("exit");
        expect(resps[0]["keypress(Esc)"]).toEqual("exit");
    });
});