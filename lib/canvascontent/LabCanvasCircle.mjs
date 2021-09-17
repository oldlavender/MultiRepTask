import { LabCanvasCommonShape, shape_defaults } from "./LabCanvasCommonShape.mjs";

export const circle_defaults = {
    ...shape_defaults,
    id: 'unamed-circle'
};

export class LabCanvasCircle extends LabCanvasCommonShape {

    constructor(
        dimension, left=circle_defaults.left, top=circle_defaults.top, 
        angle=circle_defaults.angle, fill=circle_defaults.fill, 
        id=circle_defaults.id
    ) {
        super(
            'circle', dimension, null, null, left, top, angle, fill, id, true
        );
    }
}