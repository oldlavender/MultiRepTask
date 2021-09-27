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

    /**
     * Set a response label for the specified event and type.
     * @param {string|LabCanvasAreaOfInteraction} event The event string or
     *      LabCanvasAreaOfInteraction to be associated with the specified
     *      response label.
     * @param {string} response_label The response label to be associated
     *      with the specified event.
     * @param {string} [type='raw'] The type of the event, a string 
     *      containing one of the possible values: 'raw', 'key', 'click' or
     *      'aoi'. If type is absent or a adifferent string is passed it
     *      defaults to 'raw'.
     *      
     * @returns a reference to the response object.
     */
    SetResponse(event, response_label, type='raw') {
        var prefix = '', suffix = '';
        switch(type) {
            case 'click': prefix = 'click '; break;
            case 'aoi': 
                prefix = 'click @'; 
                if (event.constructor == LabCanvasAreaOfInteraction) {
                    event = event.label;
                }
                break;
            case 'key': prefix = 'keypress('; suffix=')'; break;
            // @ASSUMPTION: if type is undefined it will default.
        }
        return this.SetRawResponse(event, response_label, prefix, suffix);
    }

    /**
     * Set an identical response label for multiple events of a certain type.
     * @param {string[]|LabCanvasAreaOfInteraction[]} events A list (array)
     *      of events to be associated with the specified response label.
     * @param {string} response_label The response label to be associated with
     *      the specified list of events.
     * @param {string} [type='raw'] The type of the events, a string 
     *      containing one of the possible values: 'raw', 'key', 'click' or
     *      'aoi'. If type is absent or a adifferent string is passed it
     *      defaults to 'raw'.
     * @returns a reference to the response object.
     */
    SetResponses(events=[], response_label, type) {
        for (let i of events) {
            this.SetResponse(i, response_label, type);
        }
        return this;
    }

    /**
     * Set a response label for the specified key press.
     * @param {string} key the key name to be associated with the specified
     *      response label.
     * @param {string} response_label The response label to be associated
     *      with the specified event.
     * @returns a reference to the response object.
     */
    SetKeyResponse(key, response_label) {
        return this.SetResponse(key, response_label, 'key');
    }

    /**
     * Set a response label for the specified aoi (click event).
     * @param {string|LabCanvasAreaOfInteraction} aoi the aoi or aoi label
     *      string to be associated with the specified response label.
     * @param {string} response_label The response label to be associated
     *      with the specified aoi.
     * @returns a reference to the response object.
     */
    SetAoiResponse(aoi, response_label) {
        return this.SetResponse(aoi, response_label, 'aoi');
    }

    /**
     * Set a response label for the specified click event.
     * @param {string} element the event string containing the clicable
     *      element to be associated with the specified responselabel.
     * @param {string} response_label The response label to be associated
     *      with the specified click event.
     * @returns a reference to the response object.
     */
    SetClickResponse(element, response_label) {
        return this.SetResponse(element, response_label, 'click');
    }

    /**
     * Set a response label for the specified keys (key press events).
     * @param {string[]} keys the list of the key names to be associated with
     *      the specified response label.
     * @param {string} response_label The response label to be associated
     *      with the specified key press events.
     * @returns a reference to the response object.
     */
    SetKeyResponses(keys=[], response_label) {
        return this.SetResponses(keys, response_label, 'key');
    }

    /**
     * Set a response label for the specified click events.
     * @param {string[]} keys a list (array) of
     *      the elements to be associated with the specified response label.
     * @param {string} response_label The response label to be associated
     *      with the specified click events.
     * @returns a reference to the response object.
     */
    SetClickResponses(elements=[], response_label) {
        return this.SetResponses(elements, response_label, 'click');
    }

    /**
     * Set a response label for the specified aois (click events).
     * @param {string[]|LabCanvasAreaOfInteraction[]} keys a list (array) of
     *      the aois or aoi labels to be associated with the specified
     *      response label.
     * @param {string} response_label The response label to be associated
     *      with the specified event.
     * @returns a reference to the response object.
     */
    SetAoiResponses(aois=[], response_label) {
        return this.SetResponses(aois, response_label, 'aoi');
    }

}