const objectMerge = (x={}, y={}, y_pref='', sep='.', x_pref='') => {
    var ret = {};
    let pSep = x_pref == '' ? '' : sep;

    for (let [k,v] of Object.entries(x)) {
        ret[`${x_pref}${pSep}${k}`] = v;
    }

    pSep = y_pref == '' ? '' : sep;
    for (let [k,v] of Object.entries(y)) {
        ret[`${y_pref}${pSep}${k}`] = v;
    }
    return ret;
};

String.prototype.fillTemplate = function(pars) {
    var fillTemplate;
    const keys = Object.keys(pars);
    const values = Object.values(pars);
    fillTemplate = new Function(...keys, `return \`${this}\`;`);
    return fillTemplate(...values);
};

var a = {
    hahaha: 1,
};

a['heheehhohoho'] = 5;
a.trend = 555;

var b = {
    c: 423,
    d: 2342,
};

var c = {
    e: "hehehe",
};

//var d = objectMerge(a, b, 'b', '.','a');
var d = {
    a: a,
    b: b,
    c: c,
};

console.log(a['test.hahaha']);
console.log(a);
console.log(b);
console.log(c);
console.log(d);

for (let [k, v] of Object.entries(d)) {
    console.log(`${k}=${v}`);
}

console.log(".: NOW THIS :.");
console.log("d=", d);
var template = "a.hahaha=${a.hahaha}, b.c=${b.c}";
console.log(template.fillTemplate(d));
