

// util functions

export const getsub = (obj, sub="") => sub.split(
    '.'
).reduce(
    (prev, cur) => prev ? prev[cur] : undefined,
    obj
); 

/*export const objectMerge = (x={}, y={}, y_pref='', sep='.', x_pref='') => {
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
};*/ // ^ @TODO:likely no longer necesary, so check and remove it

export const titCaseWord = ([fst, ...rst]) => fst.toUpperCase() + rst.join(
    ''
).toLowerCase();

export const combineFlags = (arr = []) => arr.reduce(
    (prev, cur) => prev | cur,
    0
);

/*{
    var ret = 0xffff;
    for (let i in arr) {
        ret = (0xffff & arr[i] & ret);
    }
    return ret;

};*/

/*
export const getsub = (obj, sub="") => sub.split(
    '.'
).reduce(
    (prev, cur) => prev ? prev[cur] : undefined,
    obj
); 
*/

export const Utils = {
    getsub: getsub,
    titCaseWord: titCaseWord,
    combineFlags: combineFlags,
};

export default Utils;