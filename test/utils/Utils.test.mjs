import { describe, expect, test, it, jest } from "@jest/globals";
import { combineFlags } from "../../lib/utils/Utils.mjs";
import { titCaseWord } from "../../lib/utils/Utils.mjs";

import { 
    getsub
 } from "../../lib/utils/Utils.mjs";

describe(
    "lib/utils/Utils.mjs",
    ()=>{
        test(
            "getsub(obj, sub) returns proper sub or undefined ".concat(
                "in case it doesn't exist"
            ),
            ()=>{
                var testObj = {
                    sub: {
                        a: 1,
                        b: 'aadfasd',
                    },
                };
                expect(getsub(testObj, "sub.a")).toBe(testObj.sub.a);
                expect(getsub(testObj, "non-existant-sub.not.here")).toBeUndefined();
            }
        );
        test(
            "titCaseWord(str) should return the string with first".concat(
                " letter capitalized"
            ),
            ()=>{
                expect(titCaseWord("testing")).toBe("Testing");
            }
        );
        test(
            "combineFlags should combine all the bits from an array", 
            ()=>{
                expect(combineFlags([0x01, 0x02, 0x04])).toBe(0x01|0x02|0x04);
                expect(combineFlags([0x01])).toBe(0x01);
            }
        );
    }
);