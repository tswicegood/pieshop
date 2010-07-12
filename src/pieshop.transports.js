var get_global_object, exp=null;
try {
    exp = exports;
    get_global_object = require('./namespace').get_global_object;
} catch(Error) {}

(function (global) {
    var exporter = global.getExporter('transports');
    var jQueryAjaxTransport = function () {};
    jQueryAjaxTransport.prototype.perform = function(method, resource, compiled_query, callback) {
        var backends = global.require('pieshop.backends'),
            CompiledQuery = backends.CompiledQuery;
        if(!(compiled_query instanceof CompiledQuery)) {
            throw new Error("Transport.perform takes three arguments (Resource, CompiledQuery, callback)");
        }
        var data = compiled_query.data,
            backend = compiled_query.backend;
        jQuery.ajax({
            'url':resource.resource_uri,
            'data':data,
            'type':method,
            'success':function(incoming_data) {
                var resources = backend.build_resources(incoming_data, resource);
                callback(incoming_data);
            }
        });
    };
    exporter('jQueryAjaxTransport', new jQueryAjaxTransport());
})(get_global_object('pieshop'));

