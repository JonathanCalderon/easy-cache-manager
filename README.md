# easy-cache-manager
This package allows you to easily manage your application cache, using MemCached. Soon local memory and redis storage are going to be supported.

## Instalation
```
npm install easy-cache-manager [--save|-g]
```
## Setting up
Currently there is two modes of cache that you can use: local memory and memcached. You can choose which one are you going to use.
#### * Memcached
```
var ecm = require('easy-cache-manager');
var EasyCacheManager = new ECM ('Memcached' [,<timeout>,<host>]);
```
**Note**: If you do not provide a *timeout* parameter, the object will be in memory as long as the process is running. Also, if you do not provide a *host* parameter, the default value is *localhost*. It is require to have installed memcached for the host given.

## Usage

There are 2 functions: get object and set object.
#### 1. Get Object
This method return the object in cache with the given key
```
EasyCacheManager.getObject(key).then(function(objCache){
    // objCache can be null
}).catch(function(err){
    // connection or internal libraries error
});
```
#### 2. Set object
This method sets an object in the cache service. *options* object is optional.
```
EasyCacheManager.setObject(key, object[,options]).then(function(resp){
    // resp is an 'ok' message
}).catch(function(err){
    // connection or internal libraries error
});
```
**Options object**
```
{
    timeout: 1494277474 // Unix standar
}
```