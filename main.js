var http = require('http');
var fs = require('fs');
var app = http.createServer(function(request,response){
    var url = request.url;
    if(request.url == '/'){
      url = '/index.html';
    }
    if(request.url == '/favicon.ico'){
        response.writeHead(404);
        response.end();
        return;
    }
    response.writeHead(200);
    // end 의 매개변수로 무엇을 넣어주느냐에 따라 
    // 화면에 표시되는 내용이 달라진다! 
    response.end(fs.readFileSync(__dirname + url));
 
});
app.listen(3000);