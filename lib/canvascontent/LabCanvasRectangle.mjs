import { LabCanvasCommonShape, shape_defaults } from "./LabCanvasCommonShape.mjs";

export const rect_defaults = {
    ...shape_defaults,
    id: 'unamed-rectangle',
};

/**
 * 
 * Implements a rectangle for the lab.js canvas
 * @extends LabCanvasCommonShape
 * 
 */
export class LabCanvasRectangle extends LabCanvasCommonShape {

    /**
     * 
     * @param {number} width Rectangle width (mandatory)
     * @param {number} height Rectangle height (mandatory)
     * @param {number} [left=0] The horizontal (x) position as in lab.js 
     *      coordinate system (default: 0, the canvas horizontal center)
     * @param {number} [top=0] The vertical (y) position as in lab.js 
     *      coordinate system (default: 0, the canvas vertical center)
     * @param {number} [angle=0] The inclination angle (default: 0, which 
     *      means a horizontally disposed shape)
     * @param {string} [fill=black] The fill color as string, hex or 
     *      rgb(r,g,b) format (default: 'black')
     * @param {string} [id=unamed-rectangle] The object id for identification 
     *      purposes (default: 'unamed-rectangle')
     * 
     */
    constructor (
        width, height, left=rect_defaults.left, top=rect_defaults.top, 
        angle=rect_defaults.angle, fill=rect_defaults.fill, 
        id=rect_defaults.id
    ) {
        super('rect', null, width, height, left, top, angle, fill, id);
    }
}

