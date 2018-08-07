# easy-cache-manager
This package allows you to easily manage your application cache, using one of two methods: local memory and MemCached.
**Note:** Redis service will be soon provided

## Instalation
```javascript
npm install easy-cache-manager [--save|-g]
```
## Setting up
Currently there is two modes of cache that you can use: local memory and memcached. You can choose which one are you going to use.
 
#### 1. Local Memory
```javascript
const ECM = require('easy-cache-manager');
const EasyCacheManager = new ECM ({
    type: 'Local memory',
    /* THESE PARAMETERS ARE OPTIONAL
        timeout: <timeout in milliseconds>,
        prefix: <String with the prefix for all objects in cache>
    */
});
```
**Note**: If you do not provide a timeout parameter, the object will be in memory as long as the process is running.

#### 2. Memcached
```javascript
const ECM = require('easy-cache-manager');
const EasyCacheManager = new ECM ({
    type: 'Memcached',
    /* THESE PARAMETERS ARE OPTIONAL
        endpoint: <Endpoint of Memcached.>,
        timeout: <timeout in milliseconds>,
        promise: <promise object. Default: require('bluebird')>,
        prefix: <String with the prefix for all objects in cache>
    */
});
```
**Note**: If you do not provide a *timeout* parameter, the object will be in memory as long as the memcached process is running. Also, if you do not provide a *host* parameter, the default value is *localhost*. It is require to have installed memcached for the host given.

## Usage

There are 2 functions: get object and set object.

#### 1. Get Object
This method return the object in cache with the given key
```javascript
EasyCacheManager.getObject(key).then(function(objCache){
    // objCache can be null
}).catch(function(err){
    // connection or internal libraries error
});
```
#### 2. Set object
This method sets an object in the cache service. *options* object is optional.
```javascript
EasyCacheManager.setObject(key, object[,options]).then(function(resp){
    // resp is an 'ok' message
}).catch(function(err){
    // connection or internal libraries error
});
```
**Options object**
```javascript
{
    timeout: 1494277474 // Unix standar
}
```

## Prefix

You can define a global prefix and the library will add it to all the object keys.

**Example**
```javascript
const ECM = require('easy-cache-manager');
const EasyCacheManager = new ECM ({
    type: 'Memcached',
    timeout: 1494277474,
    prefix: 'prefix_'
});
```