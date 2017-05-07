/* jslint es6 */

'use strict';

function easyCacheManager(typeParam, timeoutParam, endpointCacheParam) {

    let self = {};
    self.TYPE_LOCAL_MEMORY = 'Local memory';
    self.TYPE_MEM_CACHED = 'Memcached';

    self.type = typeParam || TYPE_LOCAL_MEMORY;
    self.timeout = timeoutParam || -1;
    self.endpointCache = endpointCacheParam || 'localhost';

    self.cacheLib;
    if (self.type === TYPE_LOCAL_MEMORY) {
        let localCache = require('./storageModules/localMemory').lc;
        self.cacheLib = localCache(timeout);
    } else if (self.type === TYPE_MEM_CACHED) {
        let memcached = require('./storageModules/memcached').memc;
        self.cacheLib = memcached(endpointCache, timeout);
    }

    self.getObject = (key) => {
        return self.cacheLib.getObject(key);
    }


    self.setObject = (key, objectCache, options) => {
        return self.cacheLib.setObject(key, objectCache, options);
    }

    return self;
}

module.exports = {
    ecm: easyCacheManager
};