import { LabCanvasCommonShape, shape_defaults } from "./LabCanvasCommonShape.mjs";

export const square_defaults = {
    ...shape_defaults,
    id: 'unamed-square'
};

/**
 * Implements a square for the lab.js canvas
 * @extends LabCanvasCommonShape
 * 
 */
export class LabCanvasSquare extends LabCanvasCommonShape {

    /**
     * 
     * @param {number} width Square width (mandatory)
     * @param {number} height Square height (mandatory)
     * @param {number} [left=0] The horizontal (x) position as in lab.js 
     *      coordinate system (default: 0, the canvas horizontal center)
     * @param {number} [top=0] The vertical (y) position as in lab.js 
     *      coordinate system (default: 0, the canvas vertical center)
     * @param {number} [angle=0] The inclination angle (default: 0, which 
     *      means a horizontally disposed shape)
     * @param {string} [fill=black] The fill color as string, hex or 
     *      rgb(r,g,b) format (default: 'black')
     * @param {string} [id=unamed-rectangle] The object id for identification 
     *      purposes (default: 'unamed-square')
     * 
     */
    constructor(
        dimension, left=square_defaults.left, top=square_defaults.top, 
        angle=square_defaults.angle, fill=square_defaults.fill, 
        id=square_defaults.id
    ) {
        super('rect', dimension, null, null, left, top, angle, fill, id, true);
    }
}