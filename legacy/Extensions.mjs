import "./node_modules/lab.js/dist/lab.js";
import { lab } from "./node_modules/lab.js/dist/lab.js";

class MRLearningLoop extends lab.flow.Loop {
    constructor(options={}) {
        super({
            conditionalStop: false,
            stopConditionMode: 'none', // 'none', 'streaks'
            streaksBreak: 0,
            ...options,
        });
    }

    // NEXT: test whether


}