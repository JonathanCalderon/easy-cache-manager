'use strict';

const TYPE_LOCAL_MEMORY = 'Local memory';
const TYPE_MEM_CACHED = 'Memcached';

function easyCacheManager(options) {

    let self = {};
    if (!options)
        options = {};
    self.source = options.source || TYPE_LOCAL_MEMORY;
    self.timeout = options.timeout || -1;
    self.endpointCache = options.host || 'localhost';
    self.promise = options.promise || require('bluebird');
    self.globalPrefix = options.prefix || "";

    if (self.source === TYPE_LOCAL_MEMORY) {
        let localCache = require('./storageModules/localMemory').lm;
        self.cacheLib = localCache(self.timeout, self.promise);
    } else if (self.source === TYPE_MEM_CACHED) {
        let memcached = require('./storageModules/memcached').memc;
        self.cacheLib = memcached(self.endpointCache, self.timeout, self.promise);
    }

    self.getObject = (key) => {
        return self.cacheLib.getObject(self.globalPrefix + key);
    };


    self.setObject = (key, objectCache, options) => {
        return self.cacheLib.setObject(self.globalPrefix + key, objectCache, options);
    };

    self.close = () => {
        if (self.source === TYPE_MEM_CACHED)
            return self.cacheLib.close();
    };

    return self;
}

module.exports = easyCacheManager;