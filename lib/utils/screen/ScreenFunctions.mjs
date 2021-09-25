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


// @T
/**
 * Produces a response object associating a set of responses to a certain
 *      label.
 * @param {string} label The response label to be associated with the 
 *      response.
 * @param {string[]} [responses=[]]  The array of response names to be 
 *      associated to the label. Use key(KEYNAME) for keyboard responses,
 *      prefix AOIs with an at ('@') character, or plain text name for CSS
 *      selectors.
 * @param {object} [response_object={}] An object containing previously
 *      defined response objects. Useful for combining multiple labels or
 *      response types through cascaded calls.
 * @returns The produced response object.
 */
 export function Response(label, responses=[], type='raw', response_object={}) {
     var ret = response_object;
     for (let i of responses) {
         ret[i] = label;
     }

     return ret;
}

/**
 * Produces a response object associating a set of keyboard keys to a certain
 *      label.
 * @param {string} label The response label to be associated with the 
 *      specified keys.
 * @param {string[]} [keys=[]] The array of keyboard keys to be associated
 *      with the specified response label.
 * @param {object} [response_object={}] An object containing previously
 *      defined response objects. Useful for combining multiple labels or
 *      response types through cascaded calls.
 * @returns The produced response object.
 */
export function ResponseKey(label, keys=[], response_object={}) {
    var resps = response_object;
    for (let i of keys) {
        resps.push(`keypress(${i})`);
    }

    return Response(label, resps);
}

/**
 * Produces a response object associating a set of keyboard keys to a certain
 *      label.
 * @param {string} label The response label to be associated with the 
 *      specified keys.
 * @param {string[]} [keys=[]] The array of keyboard keys to be associated
 *      with the specified response label.
 * @param {object} [response_object={}] An object containing previously
 *      defined response objects. Useful for combining multiple labels or
 *      response types through cascaded calls.
 * @returns The produced response object.
 */
 export function ResponseClick(label, click_objects=[], response_object={}) {
    var resps = response_object;
    for (let i of keys) {
        resps.push(`click ${i}`);
    }

    return Response(label, resps);
}

/**
 * 
 * Produce a response object associating a set of aoi names to a certain
 *      label.
 * @param {string} label The response label to be associated with the 
 *      specified AOI labels.
 * @param {string[]} aoi_labels An array containing the AOI labels to be
 *      associated with the specified response label.
 * @param {object} [response_object={}] An object containing previously
 *      defined response objects. Useful for combining multiple labels or
 *      response types through cascaded calls.
 * @returns The produced response object.
 */
export function ResponseAoiLabel(label, aoi_names=[], response_object={}) {
    var resps = response_object;
    for (let i of aoi_names) {
        resps.push(`@${i}`);
    }
    return ResponseClick(label, resps);
}

/**
 * 
 * @param {string} label The response label to be associated with the 
 *      specified AOIs.
 * @param aois 
 * @param {object} [response_object={}] An object containing previously
 *      defined response objects. Useful for combining multiple labels or
 *      response types through cascaded calls.
 * @returns The produced response object.
 */
export function ResponseAoi(label, aois=[], response_object={}) {
    var aoi_names = [];
    for (let i of aois) {
        aoi_names.push(i.label);
    }
    return ResponseAoiName(label, aoi_names);
}