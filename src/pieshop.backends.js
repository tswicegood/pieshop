var get_global_object, exp=null;
try {
    exp = exports;
    get_global_object = require('./namespace').get_global_object;
} catch(Error) {}

(function (global) {
    var exporter = global.getExporter('backends');
    var CompiledQuery = function(backend, data) {
        this.backend = backend;
        this.data = data;
    };
    var dict_copy = function(x) { for(var i in x) { if (x.hasOwnProperty(i)) { this[i] = x[i]; } } };

    var TastyPieBackend = function () {};

    TastyPieBackend.prototype.build_resources = function(data, resource_type) {
        var objects = [];
        for(var i = 0, len = data.objects.length; i < len; ++i) {
            objects.push(new resource_type(data.objects[i]));
        }
        return objects;
    };

    TastyPieBackend.prototype.compile = function(query) {
        var data = {
            'format':'json',
            'limit':query._limit,
            'offset':query._offset
        };
        dict_copy.call(data, query._filters);
        return new CompiledQuery(this, data);
    };

    exporter('CompiledQuery', CompiledQuery);
    exporter('TastyPieBackend', new TastyPieBackend());
})(get_global_object('pieshop'));
