var http = require('http'); // http module 을 사용할 것이다! 
var fs = require('fs');
var url = require('url'); // url 모듈을 사용할 것이다!

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var title = queryData.id
  
    if(_url == '/'){
      title = 'Welcome';
    }
    if(_url == '/favicon.ico'){
        response.writeHead(404);
        response.end();
        return;
    }    
    response.writeHead(200);
    fs.readFile(`data/${title}`, 'utf-8', function(err, desc) {
      var template = 
        `<!doctype html>
        <html>
        <head>
          <title>WEB1 - ${title}</title>
          <meta charset="utf-8">
        </head>
        <body>
          <h1><a href="/">WEB</a></h1>
          <ol>
            <li><a href="/?id=HTML">HTML</a></li>
            <li><a href="/?id=CSS">CSS</a></li>
            <li><a href="/?id=JavaScript">JavaScript</a></li>
          </ol>
          <h2>${title}</h2>
          <p>${desc}</p>
        </body>
        </html>`;
    // end 의 매개변수로 무엇을 넣어주느냐에 따라 
    // 화면에 표시되는 내용이 달라진다! 
    // response.end(fs.readFileSync(__dirname + _url));
    response.end(template);
    });



    
});

app.listen(3000);