import { describe, expect, test, it, jest } from "@jest/globals";
import { LabResponse } from "../../../lib/labobjects/LabResponse.mjs";

const rtemplates = [
    {
        'keypress(Z)': 'zebra',
    },
];
var resp;

describe("LabResponse", () => {
    test("Constructor must incorporate the passed object, if any", () => {
        resp = new LabResponse(rtemplates[0]);
        console.log(resp); //@TODO: Remove it 
        expect(resp).toHaveProperty('keypress(Z)', 'zebra');
    });
    test("Method SetRawResponse must properly set the specified ".concat(
        " response labels to the specified events."
    ), () => {
        resp.SetRawResponse("click div.hahaha", 'hahaha');
        expect(resp).toHaveProperty(['click div.hahaha'], 'hahaha');
    });
    test("Methods SetResponse and SetResponses must correctly".concat(
        " add the specified responses to the specified events according",
        " to their specified types"
    ), () => {
        resp.SetResponse("click @somearea", "somearea");
        // 'raw' when type is not specified
        expect(resp).toHaveProperty('click @somearea', 'somearea');

        resp.SetResponse('someaoi', 'somearea', 'aoi');
        expect(resp).toHaveProperty('click @someaoi', 'somearea');

        resp.SetResponse('Space', 'next', 'key');
        expect(resp).toHaveProperty('keypress(Space)', 'next');

        resp.SetResponse('div.close', 'close', 'click');
        expect(resp).toHaveProperty(['click div.close'], 'close');

        resp.SetResponses(['Esc', 'Q'], 'exit', 'key');
        expect(resp).toHaveProperty('keypress(Esc)', 'exit');
        expect(resp).toHaveProperty('keypress(Q)', 'exit');
    });
    test("Handy calls must work properly, as Set...() methods must".concat(
        " return reference to the object"
    ), () => {
        var rsp = 'resp1';
        var r = new LabResponse().SetAoiResponses(
            ['d_button', 'j_button'], 'resp1'
        ).SetKeyResponses(['D', 'J'], 'resp1').SetClickResponses([
            '#el1', '#el2'
        ], 'resp1').SetAoiResponse('exit', 'exit').SetClickResponse(
            '#exit', 'exit'
        ).SetKeyResponse('Esc', 'exit');

        expect(r).toHaveProperty('click @d_button', rsp);
        expect(r).toHaveProperty('click @j_button', rsp);
        expect(r).toHaveProperty('keypress(D)', rsp);
        expect(r).toHaveProperty('keypress(J)', rsp);
        expect(r).toHaveProperty('click #el1', rsp);
        expect(r).toHaveProperty('click #el2', rsp);
        expect(r).toHaveProperty('click @exit', 'exit');
        expect(r).toHaveProperty('click #exit', 'exit');
        expect(r).toHaveProperty('keypress(Esc)', 'exit');

    });
});