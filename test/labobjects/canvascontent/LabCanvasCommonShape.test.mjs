import { LabCanvasCommonShape, shape_defaults } from "../../../lib/labobjects/canvascontent/LabCanvasCommonShape.mjs";

var lcr = [];

describe(
    "Class LabCanvasCommonShape",
    ()=>{
        test(
            "Constructor must set passed values or defaults when no ".concat(
                "parameters are passed, except for the mandatory parameters."
            ),
            ()=>{
                lcr.push(new LabCanvasCommonShape(
                    "square", true, {}, 60, null, null, 
                    -30, 40, 0, 'orange', 'sq1'
                )); //must take 60 as height and width, linked
                expect(lcr[0].type).toBe('square');
                expect(lcr[0].width).toBe(60);
                expect(lcr[0].height).toBe(60);
                expect(lcr[0].dimensions).toBe(60);
                expect(lcr[0].left).toEqual(-30);
                expect(lcr[0].top).toEqual(40);
                expect(lcr[0].angle).toEqual(0);
                expect(lcr[0].fill).toBe('orange');
                expect(lcr[0].id).toBe('sq1');
                
                lcr.push(new LabCanvasCommonShape(
                    "circle", true, {}, null, 90, null, 
                    -75, 80, 45, 'yellow', 'c1'
                )); //must take 90 as height and width, linked
                expect(lcr[1].type).toBe('circle');
                expect(lcr[1].width).toBe(90);
                expect(lcr[1].height).toBe(90);
                expect(lcr[1].dimensions).toBe(90);
                expect(lcr[1].left).toEqual(-75);
                expect(lcr[1].top).toEqual(80);
                expect(lcr[1].angle).toEqual(45);
                expect(lcr[1].fill).toBe('yellow');
                expect(lcr[1].id).toBe('c1');

                lcr.push(new LabCanvasCommonShape(
                    "square", true, {}, 40, 55, 125, 
                    -160, 180, 90, '#888844', 'sq2'
                )); //must take 40 as height and width, linked, and ignore
                // the 55 and the 125
                expect(lcr[2].type).toBe('square');
                expect(lcr[2].width).toBe(40);
                expect(lcr[2].height).toBe(40);
                expect(lcr[2].dimensions).toBe(40);
                expect(lcr[2].left).toEqual(-160);
                expect(lcr[2].top).toEqual(180);
                expect(lcr[2].angle).toEqual(90);
                expect(lcr[2].fill).toBe('#888844');
                expect(lcr[2].id).toBe('sq2');
                
                lcr.push(new LabCanvasCommonShape(
                    "rect", false, {}, null, 60, 20//everything else as default
                )); //equalsides defaults to false
                expect(lcr[3].type).toBe('rect');
                expect(lcr[3].width).toBe(60);
                expect(lcr[3].height).toBe(20);
                expect(lcr[3]).not.toHaveProperty('dimensions');
                expect(lcr[3].left).toEqual(shape_defaults.left);
                expect(lcr[3].top).toEqual(shape_defaults.top);
                expect(lcr[3].angle).toEqual(shape_defaults.angle);
                expect(lcr[3].fill).toBe(shape_defaults.fill);
                expect(lcr[3].id).toBe(shape_defaults.id);

                lcr.push(new LabCanvasCommonShape(    //must ignore the 50 and
                    "ellipse", false, {}, 50, 120, 80 //take the 120 & the 80
                )); //equalsides defaults to false 
                expect(lcr[4].type).toBe('ellipse');
                expect(lcr[4].width).toBe(120);
                expect(lcr[4].height).toBe(80);
                expect(lcr[4]).not.toHaveProperty('dimensions');
                expect(lcr[4].left).toEqual(shape_defaults.left);
                expect(lcr[4].top).toEqual(shape_defaults.top);
                expect(lcr[4].angle).toEqual(shape_defaults.angle);
                expect(lcr[4].fill).toBe(shape_defaults.fill);
                expect(lcr[4].id).toBe(shape_defaults.id);

            }
        );
        test(
            "The properties dimensions, height and width must be ".concat(
                "linked when constructed with equalsides, and ",
                "independent otherwise."
            ),
            ()=>{
                lcr[0].width = 666;
                expect(lcr[0].width).toBe(666);
                expect(lcr[0].height).toBe(666);
                expect(lcr[0].dimensions).toBe(666);
                lcr[0].dimensions = 999;
                expect(lcr[0].width).toBe(999);
                expect(lcr[0].height).toBe(999);
                expect(lcr[0].dimensions).toBe(999);
                lcr[0].height = 333;
                expect(lcr[0].width).toBe(333);
                expect(lcr[0].height).toBe(333);
                expect(lcr[0].dimensions).toBe(333);

                lcr[3].dimensions = 666; //60,20
                expect(lcr[3].width).not.toBe(666);
                expect(lcr[3].height).not.toBe(666);

                lcr[3].width = 666;
                expect(lcr[3].height).not.toBe(666);

                lcr[3].height = 999;
                expect(lcr[3].width).not.toBe(999);
            }
        );
    }
);