import { describe, expect, test, it, jest } from "@jest/globals";
import { LabResponse } from "../../lib/labobjects/LabResponse.mjs";

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

    });
});