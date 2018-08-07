'use strict';

function localMemory(timeoutParam, promiseParam) {

    let Promise = promiseParam;
    let self = {};
    self.objects = {};
    self.timeout = timeoutParam;

    self.getObject = (key) => {
        return new Promise(
            (resolve, reject) => {
                const obj = self.objects[key];
                if (!obj) resolve(null);
                if (obj.timeout < 0 || (new Date()).getTime() - obj.timeCreated <= obj.timeout)
                    resolve(self.objects[key].object);
                else {
                    self.objects[key] = null;
                    resolve(null);
                }
            }
        );
    }

    self.setObject = (key, object, options) => {
        let timeout = (options && options.timeout) || self.timeout;
        self.objects[key] = {
            object,
            timeout,
            timeCreated: (new Date()).getTime()
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