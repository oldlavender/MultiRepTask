import { LabCanvasCommonShape, shape_defaults } from "./LabCanvasCommonShape.mjs";

// @TODO: Unify Ellipse and Rectangle under GeometricForm

export const ellipse_defaults = {
    ...shape_defaults,
    id: 'unamed-ellipse',
};

/**
 * 
 * @class LabCanvasEllipse
 * @description Implements an ellipse for the lab.js canvas
 */
export class LabCanvasEllipse extends LabCanvasContent {

    /**
     * 
     * @param width The width of the ellipse (mandatory)
     * @param height The height of the ellipse (mandatory)
     * @param left The horizontal (x) position measured by distance to the left
     * @param top The vertical (y) position measured by distance to the top
     * @param angle The inclination angle
     * @param fill The fill color
     * @param id The object id
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

