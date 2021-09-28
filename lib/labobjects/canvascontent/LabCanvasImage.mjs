import { LabCanvasCommonShape } from "./LabCanvasCommonShape.mjs";

export const image_defaults = {
    width: undefined,
    height: undefined,
    autoScale: undefined,
    left: 0,
    top: 0,
    angle: 0,
    fill: 'black',
    id: 'unamed-image',
};

export class LabCanvasImage extends LabCanvasCommonShape {

    /**
     * Produces a new image representation for lab.js canvas.
     * 
     * @param {string} src Source file name or path (relative to the HTML file
     *      where the experiment's JavaScript is loaded).
     * @param {number} [width] Image width (optional, defaults to image's
     *      original width if undefined).
     * @param {number} [height] Image height (optional, defaults to image's
     *      original height if undefined).
     * @param {string} [autoScale] A dimension to auto-scale. If set, the
     *      specified dimension will be auto-scaled proportional to the other
     *      dimension. Accepted values: 'width' and 'height'. If unset or set
     *      to undefined, it will follow width and height properties or
     *      fallback to the original image values.
     * @param {number} [left=0] The horizontal (x) position as in lab.js 
     *      coordinate system (default: 0, the canvas horizontal center)
     * @param {number} [top=0] The vertical (y) position as in lab.js 
     *      coordinate system (default: 0, the canvas vertical center)
     * @param {number} [angle=0] The inclination angle (default: 0, which 
     *      means a horizontally disposed shape)
     * @param {string} [fill=black] The fill color as string, hex or 
     *      rgb(r,g,b) format (default: 'black')
     * @param {string} [id=unamed-image] The object id for identification 
     *      purposes (default: 'unamed-rectangle')
     * 
     */
    constructor(
        src, width=undefined, height=undefined, autoScale=undefined,
        left=undefined, top=undefined, angle=undefined, 
        fill=undefined, id=undefined
    ) {
        super(
            'image', false, image_defaults, null, 
            width, height, left, top, angle, fill, id
        );
        this.SetMandatory(["src"]);
        this.src = src;
        this.addProperties(['autoScale']);
        if (autoScale != undefined && (
            width === undefined || height === undefined
        )) {
            this.autoScale = autoScale;
        }
    }

}