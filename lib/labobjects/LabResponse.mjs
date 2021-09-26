import { LabCanvasAreaOfInteraction } from "./canvascontent/LabCanvasAreaOfInteraction.mjs";

/**
 * 
 * Representation of a response object as used by lab.js
 * 
 */
export class LabResponse {

    /**
     * Response object for lab.js
     * @param {object} template A template containing predefined responses
     *      (optional).
     */
    constructor(template={}) {
        for (let i of Object.keys(template)) {
            this[i] = template[i];
        }
    }

    /**
     * Set a response label for the specified (raw) event.
     * @param {string} event the event string to be associated with the 
     *      specified response.
     * @param {string} response_label The response label to be associated
     *      with the specified event.
     * @param {string} [prefix=''] An optional string prefixing the event
     *      name (defaults to empty string).
     * @param {string} [suffix=''] An optional string suffixing the event 
     *      name.
     * @returns a reference to the response object.
     */
    SetRawResponse(event, response_label, prefix='', suffix='') {
        this[`${prefix}${event}${suffix}`] = response_label;
        return this;
    }

}