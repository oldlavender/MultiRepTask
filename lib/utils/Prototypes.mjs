/**
 * DEPRECATED: Not a good practice to install prototypes in standard functions.
 */

const fillTemplate = function(pars) {
    var fillTemplate;
    const keys = Object.keys(pars);
    const values = Object.values(pars);
    fillTemplate = new Function(...keys, `return \`${this}\`;`);
    return fillTemplate(...values);
};

const loader = function(obj, protObject={}) {
    for (i of Object.keys(protObject)) {
        obj.prototype[i] = protObject[i];
    }
};

const Prototypes = {
    String: {
        fillTemplate: fillTemplate,
    },
    Object: {},
    loader: loader,
};

export default prototypes;