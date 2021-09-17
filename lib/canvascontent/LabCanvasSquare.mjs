import { LabCanvasCommonShape, shape_defaults } from "./LabCanvasCommonShape.mjs";

export const square_defaults = {
    ...shape_defaults,
    id: 'unamed-square'
};

export class LabCanvasSquare extends LabCanvasCommonShape {

    constructor(
        dimension, left=square_defaults.left, top=square_defaults.top, 
        angle=square_defaults.angle, fill=square_defaults.fill, 
        id=square_defaults.id
    ) {
        super('rect', dimension, null, null, left, top, angle, fill, id, true);
    }
}