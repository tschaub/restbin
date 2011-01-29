var Request = require("ringo/webapp/request").Request;
var Response = require("ringo/webapp/response").Response;

var types = {
    json: "application/json",
    html: "text/html",
    txt: "text/plain"
};

exports.app = function(req, type) {
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
    if (type === "html") {
        return Response.skin(module.resolve("skins/request.html"), {
            details: JSON.stringify(details)
        });
    } else {
        response = {
            status: 200,
            headers: {"Content-Type": types[type]},
            body: [JSON.stringify(details)]
        };
    }
    return response;
};
