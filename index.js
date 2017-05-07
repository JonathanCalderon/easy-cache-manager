/* jslint es6 */

'use strict';

function easyCacheManager(typeParam, timeoutParam, endpointCacheParam) {

    const TYPE_LOCAL_MEMORY = 'Local memory';
    const TYPE_MEM_CACHED = 'Memcached';

    let type = typeParam || TYPE_LOCAL_MEMORY;
    let timeout = timeoutParam || -1;
    let endpointCache = endpointCacheParam || 'localhost';


    let cacheLib;
    if (type === TYPE_LOCAL_MEMORY) {
        let localCache = require('./storageModules/localMemory');
        cacheLib = localCache(timeout);
    } else if (type === TYPE_MEM_CACHED) {
        let memcached = require('./storageModules/memcached');
        cacheLib = memcached(endpointCache, timeout);
    }

    function getObject(key) {
        return cacheLib.getObject(key);
    }


    function setObject(key, objectCache, options) {
        return cacheLib.setObject(key, objectCache, options);
    }

}

module.exports = {
    ecm: easyCacheManager
};