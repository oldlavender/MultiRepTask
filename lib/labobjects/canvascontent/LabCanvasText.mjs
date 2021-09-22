import { LabCanvasContent } from "./LabCanvasContent.mjs";

export const text_defaults = {
    textAlign: 'center',
    fontSize: 32,
    lineHeight: 1.16,
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontFamily: 'sans-serif',
    fill: 'black',
    id: 'unamed-text'
};

/**
 * Implements a text at the canvas
 * @extends LabCanvasContent
 */
export class LabCanvasText extends LabCanvasContent {

    /**
     * Constructs a new LabCanvasText
     * @param {string} text - The text to be displayed.
     * @param {string} [textAlign='center'] - The text alignment, defaults to
     *      'center'.
     * @param {number} [fontSize =32] - The font size, defaults to 32.
     * @param {number} [lineHeight=1.16 ] - The line height, defaults to 1.16.
     * @param {string} [fontWeight='normal'] - The font weight, defaults to 
     *      'normal'.
     * @param {string} [fontStyle='normal'] - The font style, defaults to
     *      'normal'.
     * @param {string} [fontFamily='sans-serif'] - The font family, defaults
     *      to 'sans-serif'.
     * @param {string} [fill=black] The fill color as string, hex or rgb(r,g,b)
     *      format (default: 'black')
     * @param {string} [id=unamed-text] The object id for identification 
     *      purposes (default: 'unamed-text')
     * 
     */
    constructor(
        text, textAlign=undefined, fontSize=undefined, lineHeight=undefined,
        fontWeight=undefined, fontStyle=undefined, fontFamily=undefined, 
        fill=undefined, id=undefined
    ) {
        /*
            .text
            .fontSize (optional, default 32)
            .fontStyle (optional, default 'normal')
            .fontWeight (optional, default 'normal')
            .fontFamily (optional, default 'sans-serif')
            .textAlign (optional, default 'center')
            .lineHeight (optional, default 1.16)
        */
       var values = {
        text, textAlign, fontSize, lineHeight, 
        fontWeight, fontStyle, fontFamily
       };
       super('i-text', text_defaults, values);
       this.setMandatory(['text']);
       this.addProperties(["stroke", "strokeWidth", "fill"]);
    }

}