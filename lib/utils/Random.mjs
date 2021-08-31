/**
 * 
 * Work on a better Random engine later, take that into account:
 * - https://www.pcg-random.org/posts/bounded-rands.html
 * - https://pthree.org/2018/06/13/why-the-multiply-and-floor-rng-method-is-biased/
 * - https://github.com/lodash/lodash/issues/5099
 * - https://www.w3schools.com/js/js_bitwise.asp
 * 
 * 
 */
export class Random {
    constructor(sample=[]) {
        this.internaldata = {};
        if (sample.length > 0) {
            this.sample = sample;
        }
    }

    genDec() {
        return Math.random();
    }

    /*genInt(max) {
        if (max < 1) {
            throw new Error("Value of max should be positive and non-zero");
        }
        const mult = 2**32; //for 32bits
        var rn, lim = Math.floor(mult/max) * max;
        do {
            rn = Math.floor(Math.random() * 2**32);
            console.log(`New attempt: mul max=${max} lim=${lim} rn=${rn} (rn>=lim: ${rn>=lim})`);
        }
        while (rn >= lim);
        return lim % max;
    }*/

    genInt(max) {
        if 
    }

    choose() {
        return this.sample[this.genInt(this.sample.length)];
    }

    set sample(sample=[]) {
        this.internaldata.sample = sample;
    }

    get sample() {
        return this.internaldata.sample;
    }
}