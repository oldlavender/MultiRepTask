import { LabCanvasCommonShape, shape_defaults } from "./LabCanvasCommonShape.mjs";

export const aoi_defaults = {
    ...shape_defaults,
    id: 'unamed-aoi',
    fill: 'rgba(0, 0, 0, 0.2)',
};

/**
 * 
 * Implements an area of interaction for the lab.js canvas
 * @extends LabCanvasCommonShape
 * 
 */
export class LabCanvasAreaOfInteraction extends LabCanvasCommonShape {

    /**
     * 
     * @param {number} width AreaOfInteraction width (mandatory)
     * @param {number} height AreaOfInteraction height (mandatory)
     * @param {number} [left=0] The horizontal (x) position as in lab.js 
     *      coordinate system (default: 0, the canvas horizontal center)
     * @param {number} [top=0] The vertical (y) position as in lab.js 
     *      coordinate system (default: 0, the canvas vertical center)
     * @param {number} [angle=0] The inclination angle (default: 0, which 
     *      means a horizontally disposed shape)
     * @param {string} [id=unamed-aoi] The object id for identification 
     *      purposes (default: 'unamed-aoi')
     * 
     */
    constructor (
        width, height, left=aoi_defaults.left, top=aoi_defaults.top, 
        angle=aoi_defaults.angle, id=aoi_defaults.id
    ) {
        /* The fill color is not necessary outside lab.js builder, but it
            would be a lot of work to remove this property here and still
            inherit LabCanvasCommonShape, so we made it builder-compatible
            already! Also, this would be the only class using 
            LabCanvasCommonShape to not have a fill property, therefore
            totally inconvenient to remove its support.
        */
        super(
            'aoi', null, width, height, left, top,
            angle, aoi_defaults.fill, id
        );
    }
}

