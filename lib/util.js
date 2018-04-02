'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Created by zhou on 17/10/19.
 */

var checkIf = function checkIf(b, formData, value, data) {
    var is = true;
    if (b === false) {
        is = false;
    } else if (typeof b === 'string') {
        var fn = new Function('$formData', '$value', '$data', 'return ' + b);
        try {
            is = fn(formData, value);
        } catch (e) {}
    }
    return is;
};

exports.checkIf = checkIf;