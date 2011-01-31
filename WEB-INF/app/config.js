var Response = require("ringo/webapp/response").Response;

exports.urls = [
    [(/^\/(paste)(\.\w+)?/), require("./request").app],
    [(/^\/(request)(\.\w+)?/), require("./request").app],
    ["/", function() {
        return Response.skin(module.resolve("skins/index.html"), {
            title: "restbin"
        });
    }]
];

exports.middleware = [
    require('ringo/middleware/gzip').middleware,
    require('ringo/middleware/etag').middleware,
    require('ringo/middleware/static').middleware(module.resolve('public')),
    require('ringo/middleware/error').middleware('skins/error.html'),
    require('ringo/middleware/notfound').middleware('skins/notfound.html')
];

exports.app = require("ringo/webapp").handleRequest;

exports.macros = [
    require("ringo/skin/macros"),
    require("ringo/skin/filters")
];

exports.charset = "UTF-8";
exports.contentType = "text/html";
