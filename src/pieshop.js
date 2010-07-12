var get_global_object, exp=null;
try { 
    exp = exports;
    get_global_object = require('./namespace').get_global_object;
} catch(Error) {}

(function (global) {
    var registry = {},
        exporter = global.getExporter(),
        core = global.require('core');
    for(var i in core) {
        console.log(i);
        if(core.hasOwnProperty(i)) {
            exporter(i, core[i]);
        }
    }
})(get_global_object('pieshop', exp));
