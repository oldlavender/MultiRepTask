import { LabCanvasCommonShape, shape_defaults } from "./LabCanvasCommonShape.mjs";

export const ellipse_defaults = {
    ...shape_defaults,
    id: 'unamed-ellipse',
};

/**
 * 
 * An ellipse object for the lab.js canvas
 * @extends LabCanvasCommonShape
 * 
 */
export class LabCanvasEllipse extends LabCanvasCommonShape {

    /**
     * 
     * @param {number} width Ellipse width (mandatory)
     * @param {number} height Ellipse height (mandatory)
     * @param {number} [left=0] The horizontal (x) position as in lab.js 
     *      coordinate system (default: 0, the canvas horizontal center)
     * @param {number} [top=0] The vertical (y) position as in lab.js 
     *      coordinate system (default: 0, the canvas vertical center)
     * @param {number} [angle=0] The inclination angle (default: 0, which 
     *      means a horizontally disposed shape)
     * @param {string} [fill=black] The fill color as string, hex or 
     *      rgb(r,g,b) format (default: 'black')
     * @param {string} [id=unamed-ellipse] The object id for identification 
     *      purposes (default: 'unamed-ellipse')
     * 
     */
    constructor (
        width, height, left=ellipse_defaults.left, top=ellipse_defaults.top, 
        angle=ellipse_defaults.angle, fill=ellipse_defaults.fill, 
        id=ellipse_defaults.id
    ) {
        super('ellipse', null, width, height, left, top, angle, fill, id);
    }
}

