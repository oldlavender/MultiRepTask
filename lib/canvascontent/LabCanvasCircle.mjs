import { LabCanvasCommonShape, shape_defaults } from "./LabCanvasCommonShape.mjs";

export const circle_defaults = {
    ...shape_defaults,
    id: 'unamed-circle'
};

/**
 * Implements a circle for the lab.js canvas
 * @extends LabCanvasCommonShape
 * 
 */
export class LabCanvasCircle extends LabCanvasCommonShape {

    /**
     * 
     * @param {number} width Circle width (mandatory)
     * @param {number} height Circle height (mandatory)
     * @param {number} [left=0] The horizontal (x) position as in lab.js 
     *      coordinate system (default: 0, the canvas horizontal center)
     * @param {number} [top=0] The vertical (y) position as in lab.js 
     *      coordinate system (default: 0, the canvas vertical center)
     * @param {number} [angle=0] The inclination angle (default: 0, which 
     *      means a horizontally disposed shape)
     * @param {string} [fill=black] The fill color as string, hex or 
     *      rgb(r,g,b) format (default: 'black')
     * @param {string} [id=unamed-rectangle] The object id for identification 
     *      purposes (default: 'unamed-circle')
     * 
     */
    constructor(
        dimension, left=undefined, top=undefined, angle=undefined, 
        fill=undefined, id=undefined
    ) {
        super(
            'circle', true, circle_defaults, dimension, null, null, 
            left, top, angle, fill, id
        );
    }
}