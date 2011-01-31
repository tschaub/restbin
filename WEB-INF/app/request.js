var Request = require("ringo/webapp/request").Request;
var Response = require("ringo/webapp/response").Response;
var paste = require("./paste").paste;

var types = {
    json: "application/json",
    html: "text/html",
    txt: "text/plain"
};

exports.app = function(req, action, type) {
    type = (type || "").replace(".", "");
    if (!(type in types)) {
        type = "html";
    }
    var request = new Request(req);
    var details = {
        method: request.method,
        headers: request.headers,
        scheme: request.scheme,
        host: request.host,
        port: request.port,
        path: (request.scriptName + "/" + request.pathInfo).replace("//", "/"),
        queryString: request.queryString
    };
    
    var response;
    if (action === "paste") {
        var href = paste(JSON.stringify(details));
        if (type === "html") {
            response = {
                status: 302,
                headers: {"Location": href},
                body: []
            };
        } else {
            response = {
                status: 200,
                headers: {"Content-Type": types[type]},
                body: [JSON.stringify({href: href})]
            };
        }
    } else {
        if (type === "html") {
            response = Response.skin(module.resolve("skins/request.html"), {
                details: JSON.stringify(details)
            });
        } else {
            response = {
                status: 200,
                headers: {"Content-Type": types[type]},
                body: [JSON.stringify(details)]
            };
        }
    }
    return response;
};
