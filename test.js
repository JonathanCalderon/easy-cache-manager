const ECM = require('./index.js');
const EasyCacheManager = new ECM({
    timeout: 11000
});

EasyCacheManager.setObject('test_key', {
    name: 'name',
    test: 1
}).then((resp) => {

    EasyCacheManager.getObject('test_key').then(function (objCache) {
        console.log('1 objCache', objCache);
        setTimeout(() => {
            EasyCacheManager.getObject('test_key').then(obj2 => console.log('obj2', obj2, obj2 === objCache));
        }, 10000);
    })
}).catch(function (err) {
    // connection or internal libraries error
    console.error(err);
});