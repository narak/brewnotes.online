/**
 * Key mirror implemetation that creates a constants object. Different signature
 * from npm(keyMirror)
 * example: keymirror('CONSTANT1', 'CONSTANT2')
 * @param  {...String} keys n number of strings used to create constants object.
 * @return {Object}         Object where { arg1: arg1, arg2: arg2 }, etc. which
 *                          can be used as constant values.
 */
export default function keyMirror(...keys) {
    let o = {};

    if (__DEV__) {
        const isIE =
            window.navigator.userAgent.indexOf('MSIE ') < 0 ||
            !!navigator.userAgent.match(/Trident.*rv\:11\./);
        if (!isIE) {
            o = new Proxy(
                {},
                {
                    get: function(target, key) {
                        if (target[key]) {
                            return target[key];
                        }

                        // The immutable js formatter chrome extension hits these
                        // keys for every object you attempt to print. Making this
                        // proxy unusable. Skip those.
                        if (!key.startsWith('@@__IMMUTABLE') && key !== '_defaultValues') {
                            throw new Error(
                                `Trying to fetch unknown constant ${key}. ` +
                                    'There is a good chance that there is a typo in your keyMirror ' +
                                    'constant usage. Put a break point on this line and check the ' +
                                    'call stack to see where.'
                            );
                        }
                    },
                }
            );
        }
    }

    keys.forEach(d => (o[d] = d));
    return o;
}
