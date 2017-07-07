'use strict';

function memcached(endpointParam, timeoutParam, promiseParam) {

    let mc = require('mc');
    let Promise = promiseParam;

    var self = {};
    self.endpoint = endpointParam;
    self.timeout = timeoutParam;

    self.MemcacheClient = new mc.Client(self.endpoint);
    self.MemcacheClient = Promise.promisifyAll(self.MemcacheClient, {
        suffix: "AS"
    });

    self.MemcacheClient.connectAS().then(function () {
        console.log("Connected to memcache");
    });


    self.getObject = (key) => {
        return self.MemcacheClient.getAS(key).then(resp => {
            return JSON.parse(resp[key]);
        }).catch(err => {
            return null;
        });
    };

    self.close = () => {
        return self.mc.disconnect();
    };

    self.setObject = (key, objectCache, options) => {
        let timeoutAct = self.timeout;
        if (options && options.timeout)
            timeoutAct = options.timeout;
        if (timeoutAct == -1)
            timeoutAct = 0;
        return self.MemcacheClient.setAS(key, JSON.stringify(objectCache), {
            flags: 0,
            exptime: timeoutAct
        }).then(function (resp) {
            return 'ok';
        });
    };

    return self;
}

module.exports = {
    memc: memcached
};