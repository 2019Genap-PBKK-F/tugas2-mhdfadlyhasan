var http = require("http");
var fs = require('fs');

fs.readFile('./home/ridho/tugas2/05111740000078/index.html', function (err, html) {
    if (err) {
        throw err;
    }
    http.createServer(function(request, response) {  
        response.writeHeader(200, {"Content-Type": "text/html"});  
        response.write(html);
        response.end();  
    }).listen(8014,'10.199.14.46',() => {
        console.log(`Server running at locahost`)})
});