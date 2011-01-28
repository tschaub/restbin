
var {Response} = require('ringo/webapp/response');

exports.app = function() {
    return Response.skin(module.resolve('skins/index.html'), {
        title: "restbin"
    });
};
