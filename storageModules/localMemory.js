/* jslint es6 */

'use strict';

function localMemory(timeoutParam, promiseParam) {

    let Promise = promiseParam;
    let self = {};
    self.objects = {};
    self.timeout = timeoutParam;

    self.getObject = (key) => {
        return new Promise(
            (resolve, reject) => {
                if (self.objects[key] && self.objects[key].object)
                    resolve(self.objects[key].object);
                else resolve(null);
            }
        );
    }

    self.setObject = (key, objectCache, options) => {
        let timeoutAct = (options && options.timeout) || self.timeout;
        self.objects[key] = {
            object: objectCache,
            timeoutAct: timeoutAct
        }
        return new Promise((resolve, reject) => {
            resolve('ok');
        });
    }

    return self;
}

module.exports = {
    lm: localMemory
}