const isLooksLike = require('./isLooksLike');
const isPrimitive = require('./isPrimitive');

module.exports = function deepFind(a, b) {
    if (typeof a !== 'object' || !a) {
        return false;
    }
    if (isLooksLike(a, b)) {
        return true;
    }

    return Object.keys(a).some(key => {
        if (key === 'parent') {
            return false;
        }
        const aVal = a[key];
        if (Array.isArray(aVal)) {
            return aVal.some(item => deepFind(item, b));
        }
        if (typeof aVal === 'object') {
            return deepFind(aVal, b);
        }
        if (isPrimitive(aVal)) {
            return aVal === b;
        }

        return false;
    })


}