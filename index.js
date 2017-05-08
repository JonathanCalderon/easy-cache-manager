/* jslint es6 */

'use strict';

const TYPE_LOCAL_MEMORY = 'Local memory';
const TYPE_MEM_CACHED = 'Memcached';

function easyCacheManager(typeParam, timeoutParam, endpointCacheParam) {

    let self = {};

    self.type = typeParam || TYPE_LOCAL_MEMORY;
    self.timeout = timeoutParam || -1;
    self.endpointCache = endpointCacheParam || 'localhost';

    self.cacheLib;
    if (self.type === TYPE_LOCAL_MEMORY) {
        let localCache = require('./storageModules/localMemory').lc;
        self.cacheLib = localCache(self.timeout);
    } else if (self.type === TYPE_MEM_CACHED) {
        let memcached = require('./storageModules/memcached').memc;
        self.cacheLib = memcached(self.endpointCache, self.timeout);
    }

    self.getObject = (key) => {
        return self.cacheLib.getObject(key);
    }


    self.setObject = (key, objectCache, options) => {
        return self.cacheLib.setObject(key, objectCache, options);
    }

    return self;
}

module.exports = easyCacheManager;