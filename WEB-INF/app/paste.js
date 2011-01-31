var HttpURLConnection = java.net.HttpURLConnection;
var MalformedURLException = java.net.MalformedURLException;
var URL = java.net.URL;
var URLEncoder = java.net.URLEncoder;
var BufferedReader = java.io.BufferedReader;
var InputStreamReader = java.io.InputStreamReader;
var IOException = java.io.IOException;
var OutputStreamWriter = java.io.OutputStreamWriter;

exports.paste = function(content) {
    content = URLEncoder.encode(content, "UTF-8");
    var location;
    try {
        var url = new URL("http://dpaste.com/api/v1/");
        var connection = url.openConnection();
        connection.setDoOutput(true);
        connection.setRequestMethod("POST");
        connection.setInstanceFollowRedirects(false);

        var writer = new OutputStreamWriter(connection.getOutputStream());
        writer.write("content=" + content);
        writer.close();

        var status = connection.getResponseCode();
        if (status == HttpURLConnection.HTTP_MOVED_TEMP) {
            location = connection.getHeaderField("Location");
        } else {
            throw new Error("Expected 302.  Got status:" + status);
        }
    } catch (err) {
        throw err;
    }
    return location;
};
