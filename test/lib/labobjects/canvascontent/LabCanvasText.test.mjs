import { LabCanvasText, text_defaults } from "../../../../lib/labobjects/canvascontent/LabCanvasText.mjs";

var lcr = [];

describe(
    "LabCanvasText",
    ()=>{
        test(
            "LabCanvasSquare constructor must set passed values or ".concat(
                "defaults when parameters are not passed, except for ",
                "the mandatory parameters."
            ),
            ()=>{
                /*
                    .text
                    .fontSize (optional, default 32)
                    .fontStyle (optional, default 'normal')
                    .fontWeight (optional, default 'normal')
                    .fontFamily (optional, default 'sans-serif')
                    .textAlign (optional, default 'center')
                    .lineHeight (optional, default 1.16)
                */
                const t1 = 'hello!', t2 = 'world';
                lcr.push(new LabCanvasText(t1));
                expect(lcr[0].text).toEqual(t1);
                expect(lcr[0].fontSize).toEqual(text_defaults.fontSize);
                expect(lcr[0].fontStyle).toEqual(text_defaults.fontStyle);
                expect(lcr[0].fontWeight).toEqual(text_defaults.fontWeight);
                expect(lcr[0].fontFamily).toEqual(text_defaults.fontFamily);
                expect(lcr[0].textAlign).toEqual(text_defaults.textAlign);
                expect(lcr[0].lineHeight).toEqual(text_defaults.lineHeight);

                lcr.push(new LabCanvasText(
                    t2, -300, 100, 'left', 16, 1.16, 'bold', 'italic', 'serif'
                ));
                expect(lcr[1].text).toEqual(t2);
                expect(lcr[1].left).toEqual(-300);
                expect(lcr[1].top).toEqual(100);
                expect(lcr[1].fontSize).toEqual(16);
                expect(lcr[1].fontStyle).toEqual('italic');
                expect(lcr[1].fontWeight).toEqual('bold');
                expect(lcr[1].fontFamily).toEqual('serif');
                expect(lcr[1].textAlign).toEqual('left');
                expect(lcr[1].lineHeight).toEqual(1.16);
            }
        );
    }
);