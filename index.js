'use strict';

const TYPE_LOCAL_MEMORY = 'Local memory';
const TYPE_MEM_CACHED = 'Memcached';

function easyCacheManager(typeParam, timeoutParam, endpointCacheParam, promiseParam) {

    let self = {};

    self.type = typeParam || TYPE_LOCAL_MEMORY;
    self.timeout = timeoutParam || -1;
    self.endpointCache = endpointCacheParam || 'localhost';
    self.promise = promiseParam || require('bluebird');

    if (self.type === TYPE_LOCAL_MEMORY) {
        let localCache = require('./storageModules/localMemory').lm;
        self.cacheLib = localCache(self.timeout, self.promise);
    } else if (self.type === TYPE_MEM_CACHED) {
        let memcached = require('./storageModules/memcached').memc;
        self.cacheLib = memcached(self.endpointCache, self.timeout, self.promise);
    }

    self.getObject = (key) => {
        return self.cacheLib.getObject(key);
    };


    self.setObject = (key, objectCache, options) => {
        return self.cacheLib.setObject(key, objectCache, options);
    };

    self.close = () => {
        if (self.type === TYPE_MEM_CACHED)
            return self.cacheLib.close();
    };

    return self;
}

module.exports = easyCacheManager;