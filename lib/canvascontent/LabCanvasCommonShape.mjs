import { LabCanvasContent } from "./LabCanvasContent.mjs";

export const shape_defaults = {
    id: 'unamed-shape',
    left: 0,
    top: 0,
    angle: 0,
    fill: 'black',
};

/**
 * 
 * 
 * Abstraction Layer for Common Shapes Using LabCanvasContent, whose purpose
 *      is avoiding the repetition of very similar codes for basic geometric
 *      shapes (i.e. Rectangles, Ellipses, Squares, etc)
 * @extends LabCanvasContent
 * 
 */

export class LabCanvasCommonShape extends LabCanvasContent {

    /**
     * Constructs a new LabCanvasCommonShape. If equalsides is set to true,
     *      the shape takes preferably dimensions as height and width, 
     *      ignoring those parameters, or uses height if dimension is null,
     *      ignoring just height. In this case, a property named dimensions
     *      will be created linked to height and width properties. If it is 
     *      false, ignores the dimension parameter and creates two independent
     *      properties width and height. All other parameters are set as
     *      properties with received parameters or defaults.
     *
     * @param {string} type The type of the shape
     * @param {number} dimensions The dimensions, when shape has equal sides,
     *      ignored otherwise (hint: pass null if not intended to be used).
     * @param {number} width Shape width, mandatory when sides
     *      are not equal, also used when sides are equal and dimensions
     *      is not set, otherwise ignored (hint: pass null if not intended to
     *      be used)
     * @param {number} height Shape height, mandatory when sides are not equal,
     *      and ignored when they are (hint: pass null if not intended to be 
     *      used).
     * @param {number} [left=0] The horizontal (x) position as in lab.js 
     *      coordinate system (default: 0, which is the canvas center)
     * @param {number} [top=0] The vertical (y) position as in lab.js 
     *      coordinate system (default: 0, which is the canvas center)
     * @param {number} [angle=0] The inclination angle (default: 0, which 
     *      means a horizontally disposed shape)
     * @param {string} [fill=black] The fill color as string, hex or rgb(r,g,b)
     *      format (default: 'black')
     * @param {string} [id=unamed-shape] The object id for identification 
     *      purposes (default: 'unamed-shape')
     * @param {boolean} [equalsides=false] Boolean determining whether sides
     *      are necessarily equal, as in a square or a circle, or not, as in a
     *      rectangle or an ellipse (false by default)
     * 
     */
    constructor(
        type, dimensions, width, height, left=shape_defaults.left,
        top=shape_defaults.top, angle=shape_defaults.angle,
        fill=shape_defaults.fill, id=shape_defaults.id, equalsides=false
    ) {
        height = equalsides ? (dimensions ?? width) : (height ?? dimensions);
        width = equalsides ? (dimensions ?? width) : (width ?? dimensions);
        var values = {id, left, top, width, height, angle, fill};
        if (equalsides) {
            values['dimensions'] = dimensions ?? width;
        }
        super(type, shape_defaults, values);
        this.setMandatory(["width", "height"]);
        this.addProperties(["angle", "stroke", "strokeWidth", "fill"]);

        if (equalsides) {
            this.setMandatory(["dimensions"]);
            this.addEquivalence(null, ['dimensions', 'height', 'width']);
        }
        
    }
}