var http = require('http');
var fs = require('fs');
var url = require('url');
// require('A'); A 라는 모듈을 사용할 것이라는 뜻 

function templateHTML(title, list, content) {
  return `
  <!doctype html>
  <html>
  <head>
  <title>WEB1 - ${title}</title>
  <meta charset="utf-8">
  </head>
  <body>
  <h1><a href="/">WEB</a></h1>
  ${list}
  ${content}
  </body>
  </html>
  `;
}

var app = http.createServer(function (request, response) {
  var _url = request.url;
  var queryObject = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname;

  if (pathname === '/') {
    if (queryObject.id === undefined) {
      fs.readdir('data', function (err, files) {
        var title = 'Welcome';
        var desc = 'Hello!';

        var list = `<ol>`;
        let i = 0;
        while (i < files.length) {
          list += `<li><a href="/?id=${files[i]}">${files[i]}</a></li>`
          i++;
        }
        list += `</ol>`;

        var template = templateHTML(title, list, content);

        response.writeHead(200);
        response.end(template);

      });


    } else {
      fs.readdir('data', function (err, files) {
        var title = 'Welcome';
        var desc = 'Hello!';

        var list = `<ol>`;
        let i = 0;
        while (i < files.length) {
          list += `<li><a href="/?id=${files[i]}">${files[i]}</a></li>`
          i++;
        }
        list += `</ol>`;


        fs.readFile(`data/${queryObject.id}`, 'utf-8', function (err, desc) {
          var title = queryObject.id;
          var template =
            `<!doctype html>
            <html>
            <head>
              <title>WEB1 - ${title}</title>
              <meta charset="utf-8">
            </head>
            <body>
              <h1><a href="/">WEB</a></h1>
              ${list}
              <h2>${title}</h2>
              <p>${desc}</p>
            </body>
            </html>`;
          // 200은 성공적으로 전송되었다는 뜻 
          response.writeHead(200);
          // end 의 매개변수로 무엇을 넣어주느냐에 따라 
          // 화면에 표시되는 내용이 달라진다! 
          // response.end(fs.readFileSync(__dirname + _url));
          response.end(template);
        });
      });
    }
  } else {
    // 404는 파일을 찾을 수 없다는 뜻 
    response.writeHead(404);
    response.end('Not Found');
  }
});

// 포트 번호를 3000으로 열어준다. 
app.listen(3000);