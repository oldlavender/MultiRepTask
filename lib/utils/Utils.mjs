

// util functions

export const getsub = (obj, sub="") => sub.split(
    '.'
).reduce(
    (prev, cur) => prev ? prev[cur] : undefined,
    obj
); 

export const objectMerge = (x={}, y={}, y_pref='', sep='.', x_pref='') => {
    var ret = {};
    let pSep = x_pref == '' ? '' : sep;

    for (let [k,v] of Object.entries(x)) {
        ret[`${x_pref}${pSep}${k}`] = v;
    }

    pSep = y_pref == '' ? '' : sep;
    for (let [k,v] of Object.entries(y)) {
        ret[`${x_pref}${pSep}${k}`] = v;
    }
    return ret;
};

export const titCaseWord = ([fst, ...rst]) => fst.toUpperCase() + rst.join(
    ''
).toLowerCase();

export const combineFlags = (arr = []) => {
    var ret = 0xffff;
    for (let i in arr) {
        ret = (0xffff & arr[i] & ret);
    }
    return ret;
};

export const Utils = {
    getsub: getsub,
    objectMerge: objectMerge,
    titCaseWord: titCaseWord,
    combineFlags: combineFlags,
};

export default Utils;