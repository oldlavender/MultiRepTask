import { ModelType } from "../../model/datatypes.mjs";
import {sample} from "lodash";


/**
 * 
 * @class   RandomObjectGenerator   Manages the generation of random object specs
 * 
 */
 export class RandomObjectGenerator {
     
    /**
     * @summary Constructs a RandomObjectGenerator set up to generate from a range of values
     * @param min mininum value for the range
     * @param max maximum value for the range
     * @param shiftSize shift size to add to the selected value if shiftCond condition is met
     * @param shiftCond a conditional value to be checked against when Generate() is called
     * @param step the step size for range
     */
    constructor(min=0, 
                max=0, 
                shiftSize=0, 
                shiftCond=ModelType.UNDEFINED,
                step=1) {
        this.initialized = false;
        this.hasShift = false;
        this.shift = 0;
        this.shiftCondition = ModelType.UNDEFINED;
        this.custom = false;

        if (min != max) {
            this.SetRange(min, max, step);
        }

        if (shiftSize != 0) {
            this.SetShift(shiftSize, shiftCond);
        }
    }

    /**
     * @summary sets a custom array to be used instead of generated range array
     * @param ca the custom array
     */
    SetCustomArray(ca=[]) {
        this.custom = true;
        this.randRange = ca;
        this.hasShift = false;
        this.initialized = true;
    }

    /**
     * @summary set a range to pool random value from
     * @param start minimum/start value
     * @param stop maximum/stop value
     * @param step increment size
     */
    SetRange(start, stop, step=1) {
        this.randRange = [];
        var s = start;
        while (s <= stop) {
            this.randRange.push(s);
            s += step;
        }

        this.initialized = true;
    }

    /**
     * @summary sets a shift condition to add a certain amount to the selected value by Generate()
     * @param condition the value to be checked against
     */
    SetShiftCondition(condition) {
        this.shiftCondition = condition;
    }

    /**
     * @summary set how much to shift 
     * @param size the size of the shift
     * @param condition the value to be checked against to shift
     * @returns 
     */
    SetShift(size, condition=ModelType.UNDEFINED) {
        if (size == 0) {
            this.hasShift = false;
            return;
        }

        this.hasShift = true;
        this.shift = size;
        if (condition != ModelType.UNDEFINED) {
            this.SetShiftCondition(condition);
        }
    }

    /**
     * @summary set shift based on a difference of values (baseval1 - baseval2)
     * @param baseval1 first value
     * @param baseval2 second value
     * @param condition the value
     */
    SetShiftOnDiff(baseval1, baseval2, condition=ModelType.UNDEFINED) {
        this.SetShift(baseval2 - baseval1, condition);
    }

    /**
     * @summary generates a random value according to class internal parameters
     * @param conditionEval condition to be checked against if conditional evaluation is defined
     * @returns a random value added by the shift size if shiftCondition matches conditionEval
     */
    Generate(conditionEval=ModelType.UNDEFINED) {
        if (!this.initialized) return undefined;
        let ret = sample(this.randRange);

        if (
            !this.custom && //make sure we're not summing on custom array
            this.hasShift && 
            this.shiftCondition & 
            conditionEval
        ) {
            ret += this.shift;
        }

        return ret;
    }
}