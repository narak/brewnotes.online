/**
 * Converts an KV pair into an array.
 * @param  {Object} o         Object to convert
 * @param  {String} keyName   Key name to use for the key
 * @param  {String} valueName Key name to use for the value
 * @return {Array}            Array of objects
 */
export default function objectToKVArray(o, keyName, valueName) {
    keyName = keyName || 'key';
    valueName = valueName || 'value';

    let arr = [];
    Object.keys(o).forEach(function(k) {
        let m = {};
        m[keyName] = k;
        m[valueName] = o[k];
        arr.push(m);
    });
    return arr;
}
