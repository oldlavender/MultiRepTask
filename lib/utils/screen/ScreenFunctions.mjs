import { LabCanvasAreaOfInteraction } from "../../canvascontent/LabCanvasAreaOfInteraction.mjs";
import { LabCanvasCircle } from "../../canvascontent/LabCanvasCircle.mjs";
import { LabCanvasText } from "../../canvascontent/LabCanvasText.mjs";


/**
 * Return an array of canvas elements to produce a button.
 * @param {string} label The button label.
 * @param {string} fgcolor The button foreground color in hex, rgb() or color
 *      name.
 * @param {string} bgcolor The button background color in hex, rgb() or color
 *      name.
 * @param {number} size The button size (width and height).
 * @param {number} left The button left position.
 * @param {number} top The button top position.
 * @param {number} [aoi_id=label] The button click identifier (defaults to 
 *      the label).
 * @returns An array containing the button elements.
 */
export function ScreenButton (
    label, fgcolor, bgcolor, size, left, top
) {
    var circ = new LabCanvasCircle(
        size, size, left, top, 0, color, `btn_${label}_circ`
    );
    var text = new LabCanvasText(label).FillProperties({
        fill: fgcolor, fontSize: (28/65)*size, id: `btn_${label}_text`
    });
    var aoi = new LabCanvasAreaOfInteraction(
        `btn_${label}_aoi`
    ).FromTemplate(circ).Sets({
        id: `btn_${label}_text`
    });
    circ.LinkProperty('left', [text, aoi]);
    circ.LinkProperty('top', [text, aoi]);
    circ.LinkProperty('width', aoi);
    circ.LinkProperty('height', aoi);

    return [circ, text, aoi];
}
