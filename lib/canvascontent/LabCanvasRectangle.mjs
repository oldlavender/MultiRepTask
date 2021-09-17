import { LabCanvasCommonShape, shape_defaults } from "./LabCanvasCommonShape.mjs";

export const rect_defaults = {
    ...shape_defaults,
    id: 'unamed-rectangle',
};

/**
 * 
 * @class LabCanvasRectangle
 * @description Implements a rectangle for the lab.js canvas
 */
export class LabCanvasRectangle extends LabCanvasCommonShape {

    /**
     * 
     * @param width The width of the rectangle (mandatory)
     * @param height The height of the rectangle (mandatory)
     * @param left The horizontal (x) position measured by distance to the left
     * @param top The vertical (y) position measured by distance to the top
     * @param angle The inclination angle
     * @param fill The fill color
     * @param id The object id
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

