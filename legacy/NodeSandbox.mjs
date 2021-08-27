const getObjPath = (obj, [f, ...l]) => {
    if (obj === undefined) {
        return obj;
    }
    if (l.length == 0) {
        return obj[f];
    }
    else {
        return getObjPath(obj[f], l);
    }
};

var obj1 = {
    test: {
        testing: {
            hahaha: 55,
        },
    },
};

var path = 'test.testing.hahaha';
var pathArray = path.split('.');
var hahaha = getObjPath(obj1, pathArray);

console.log(`PRE:\thahaha=${hahaha}`);
obj1.test.testing.hahaha = 92;
console.log(`POS:\thahaha=${hahaha}`);