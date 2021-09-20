import { LabCanvasContent } from "./LabCanvasContent.mjs";

export const shape_defaults = {
    id: 'unamed-shape',
    left: 0,
    top: 0,
    angle: 0,
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
     * 
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
     * @param {boolean} equalsides Boolean determining whether sides
     *      are necessarily equal, as in a square or a circle, or not, as in a
     *      rectangle or an ellipse (false by default).
     * @param {object} defaults Object containing default values for the
     *      canvas object.
     * @param {number} dimensions The dimensions, when shape has 
     *      equal sides, ignored otherwise (hint: pass null if not intended 
     *      to be used).
     * @param {number} width Shape width, mandatory for completion
     *      when sides are not equal, also used when sides are equal and
     *      dimensions is not set, otherwise ignored (hint: pass undefined if
     *      not intended to be used).
     * @param {number} height Shape height, mandatory when sides
     *      are not equal, and ignored when they are (hint: pass undefined if
     *      not intended to be used).
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
     * @param {boolean} [renderable=true] Whether the shape is meant to be
     *      rendered, and therefore has fill
     * 
     */
    constructor(
        type, equalsides, defaults, dimensions=undefined, width=undefined, 
        height=undefined, left=undefined, top=undefined, angle=undefined, 
        fill=undefined, id=undefined, renderable=true
    ) {
        height = equalsides ? (dimensions || width) : (height || dimensions);
        width = equalsides ? (dimensions || width) : (width || dimensions);
        var values = {id, left, top, width, height, angle};
        if (equalsides) values['dimensions'] = dimensions ?? width;
        if (renderable) values['fill'] = fill;
        else delete shape_defaults.fill;
        super(type, {...shape_defaults, ...defaults}, values);
        this.setMandatory(["width", "height"]);
        this.addProperties(["angle"]);

        if (renderable) {
            this.addProperties(["stroke", "strokeWidth", "fill"]);
        }

        if (equalsides) {
            this.setMandatory(["dimensions"]);
            this.addEquivalence(null, ['dimensions', 'height', 'width']);
        }

        this.reserveProperties('_equalsides', equalsides, false);
        this.reserveProperties('_renderable', renderable, false);
        
    }

    HasEqualSides() {
        return this._equalsides;
    }

    IsRenderable() {
        return this._renderable;
    }
}