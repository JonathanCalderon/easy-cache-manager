/* jslint es6 */

'use strict';

function memcached(endpointParam, timeoutParam) {

    let mc = require('mc');
    let Promise = require('bluebird');

    let endpoint = endpointParam;
    let timeout = timeoutParam;

    let MemcacheClient = new mc.Client(endpoint);
    MemcacheClient = Promise.promisifyAll(MemcacheClient, {
        suffix: "AS"
    });

    MemcacheClient.connectAS().then(function () {
        console.log("Connected to memcache");
    });


    function getObject(key) {
        return MemcacheClient.getAS(key).then(resp => {
            return JSON.parse(resp[key]);
        }).catch(err => {
            return null;
        });
    }

    function setObject(key, objectCache, options) {
        let timeoutAct = options.timeout || (timeout == -1) ? 0 : timeout;
        return MemcacheClient.setAS(key, JSON.stringify(objectCache), {
            flags: 0,
            exptime: timeoutAct
        }).then(function (resp) {
            return resp;
        });
    }
}

module.exports = {
    memc: memcached
}