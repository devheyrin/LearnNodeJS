import { createServer } from 'http';
import { readdir, readFile } from 'fs';
import { parse } from 'url';
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

function templateList(files) {
  var list = `<ol>`;
  let i = 0;
  while (i < files.length) {
    list += `<li><a href="/?id=${files[i]}">${files[i]}</a></li>`
    i++;
  }
  list += `</ol>`;
  return list;
}

var app = createServer(function (request, response) {
  var _url = request.url;
  var queryObject = parse(_url, true).query;
  var pathname = parse(_url, true).pathname;

  if (pathname === '/') {
    readdir('data', function (err, files) {
      let _title = 'Welcome';
      let _desc = 'Hello!';
      var list = templateList(files);
      if (queryObject.id === undefined) {
        var template = templateHTML(_title, list, `<h2>${_title}</h2><p>${_desc}</p>`);
        response.writeHead(200);
        response.end(template);
      } else {
        _title = queryObject.id;
        readFile(`data/${queryObject.id}`, 'utf-8', function (err, desc) {
          var template = templateHTML(_title, list, `<h2>${_title}</h2><p>${desc}</p>`);
          response.writeHead(200);
          response.end(template);
        });
      }
    });
  } else {
    // 404는 파일을 찾을 수 없다는 뜻 
    response.writeHead(404);
    response.end('Not Found');
  }
});

// 포트 번호를 3000으로 열어준다. 
app.listen(3000);