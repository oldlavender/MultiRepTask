import { LabCanvasAreaOfInteraction } from "../../labobjects/canvascontent/LabCanvasAreaOfInteraction.mjs";
import { LabCanvasCircle } from "../../labobjects/canvascontent/LabCanvasCircle.mjs";
import { LabCanvasText } from "../../labobjects/canvascontent/LabCanvasText.mjs";

/**
 * Return an array of canvas elements to produce a button.
 * 
 * @param {string} label The button label, for identification and 
 *      reference purposes.
 * @param {string} text The button text, as it should appear to the user.
 * @param {string} fgcolor The button foreground color in hex, rgb() or color
 *      name.
 * @param {string} bgcolor The button background color in hex, rgb() or color
 *      name.
 * @param {number} size The button size (width and height).
 * @param {number} left The button left position.
 * @param {number} top The button top position.
 * @returns An array containing the button elements.
 */
export function ScreenButton (
    label, text, fgcolor, bgcolor, size, left, top
) {
    var circ = new LabCanvasCircle(
        size, left, top, 0, bgcolor, `btn_${label}_circ`
    );
    var text = new LabCanvasText(text).Sets({
        fill: fgcolor, fontSize: (28/65)*size, id: `btn_${label}_text`
    });
    var aoi = new LabCanvasAreaOfInteraction(label).FromTemplate(circ).Sets({
        id: `btn_${label}_aoi`
    });
    circ.LinkProperty('left', [text, aoi], true, true);
    circ.LinkProperty('top', [text, aoi], true, true);
    circ.LinkProperty('width', aoi, true, true);
    circ.LinkProperty('height', aoi, true, true);

    return [circ, text, aoi];
}

/**
 * Produces a response object associating a set of keyboard keys to a certain
 *      label.
 * @param {string} label The response label to be associated with the keys.
 * @param {string[]} [keys=[]] The array of keyboard keys to be associated
 *      with the specified response label.
 * @returns The produced object.
 */
export function ResponseKeyLabel(label, keys=[]) {
    ret = {};
    for (let i of keys) {
        ret[`keypress(${i})`] = label;
    }

    return ret;
}