import { describe, expect, test, it, jest } from "@jest/globals";

import { RandomObjectGenerator } from "../../lib/utils/RandomObjectGenerator.mjs";
import { ModelType } from "../../model/datatypes.mjs";


describe(
    "lib/utils/RandomObjectGenerator.mjs",
    ()=>{
        test(
            "Constructor must assign properties as expected",
            ()=>{
                var rg1 = new RandomObjectGenerator();
                expect(rg1.initialized).toBe(false); //no sample set
                expect(rg1.hasShift).toBe(false);
                expect(rg1.shift).toBe(0);
                expect(rg1.shiftCondition).toBe(ModelType.UNDEFINED);
                expect(rg1.custom).toBe(false);

                var rg2 = new RandomObjectGenerator(1, 5);
                expect(rg2.randRange).toStrictEqual([1,2,3,4,5]);
                expect(rg2.initialized).toBe(true);

                var rg3 = new RandomObjectGenerator(7, 49, 5, ModelType.BONHO, 7);
                expect(rg3.randRange).toStrictEqual([7,14,21,28,35,42,49]);
                expect(rg3.hasShift).toBe(true);
                expect(rg3.shift).toBe(5);
                expect(rg3.shiftCondition).toBe(ModelType.BONHO);
            }
        );
        test(
            "SetCustomArray must set the array and relevant properties",
            ()=>{
                var rg1 = new RandomObjectGenerator();
                rg1.SetCustomArray([1,2,3,4,5]);
                expect(rg1.randRange).toStrictEqual([1,2,3,4,5]);
                expect(rg1.initialized).toBe(true);
                expect(rg1.custom).toBe(true);
                expect(rg1.hasShift).toBe(false);
            }
        );

        test(
            "Generate must produce balanced results",
            ()=>{
                var a=0, b=0, total=10000, p, q, min=0.45;
                var rg1 = new RandomObjectGenerator();
                rg1.SetCustomArray(['a', 'b']);
                for (let i = 0; i < total; i++) {
                    let cur = rg1.Generate();
                    if (cur == 'a') a++;
                    if (cur == 'b') b++;
                }
                p = a / total;
                q= 1 - p;
                expect(p).toBeGreaterThan(min);
                expect(q).toBeGreaterThan(min);
            }
        );
    }
);