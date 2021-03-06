import { createServer } from 'http';
import { writeFile, readdir, readFile, rename, unlink } from 'fs';
import { parse } from 'url';
import { parse as pathParse } from 'path';
import { parse as qsParse } from 'querystring';
import Template from './lib/Template.js';

// require('A'); A 라는 모듈을 사용할 것이라는 뜻 

let template = Template;

var app = createServer(function (request, response) {
  var _url = request.url;
  var queryObject = parse(_url, true).query;
  var pathname = parse(_url, true).pathname;
  console.log(pathname);

  if (pathname === '/') {
    if (queryObject.id === undefined) {
      readdir('data', function (err, files) {
        var title = 'Welcome';
        var desc = 'Hello!';
        var list = template.list(files);
        var html = template.html(title, list,
          `<h2>${title}</h2><p>${desc}</p>`,
          `<a href="/get/create">글쓰기</a>`);
        response.writeHead(200);
        response.end(html);
      });
    } else {
      readdir('data', function (err, files) {
        let filteredId = pathParse(queryObject.id).base;
        readFile(`data/${filteredId}`, 'utf-8', function (err, desc) {
          var title = filteredId;
          var list = template.list(files);
          var html = template.html(title, list,
            `<h2>${title}</h2><p>${desc}</p>`,

            `<a href="/get/create">글쓰기</a>
             <a href="/get/update?id=${title}">수정</a>
             <form action="/post/delete" method="post">
             <input type="hidden" name="id" value="${title}">
             <input type="submit" value="삭제">
             </form>`);
          response.writeHead(200);
          response.end(html);
        });
      });
    }
  } else if (pathname === '/get/create') {
    readdir('data', function (err, files) {
      var title = 'WEB - 글쓰기';
      var list = template.list(files);
      var html = template.html(title, list,
        `<form action="/post/create" method="post">
          <p><input type="text" name="title" placeholder="제목"></p>
          <p>
              <textarea name="desc" placeholder="내용"></textarea>
          </p>
          <p>
              <input type="submit">
          </p>
          </form>`, '')
      response.writeHead(200);
      response.end(html);
    });

  } else if (pathname == '/post/create') {
    let body = '';
    // 데이터를 읽어오면서 body에 추가해줍니다~ 
    request.on('data', function (data) {
      body += data;
    });
    request.on('end', function () {
      let post = qsParse(body);
      let title = post.title;
      let desc = post.desc;
      writeFile(`data/${title}`, desc, 'utf8',
        function (err) {
          // 302 - 다른 페이지로 보내세요~ 
          response.writeHead(302, { Location: `/?id=${title}` });
          response.end();
        });
    });
  } else if (pathname == '/get/update') {
    readdir('data', function (err, files) {
      let filteredId = pathParse(queryObject.id).base;
      readFile(`data/${filteredId}`, 'utf-8', function (err, desc) {
        var title = filteredId;
        var list = template.list(files);
        var html = template.html(title, list,
          `<form action="/post/update" method="post">
          <input type="hidden" name="id" value="${title}">
          <p><input type="text" name="title" placeholder="제목"
          value="${title}"></p>
          <p>
              <textarea name="desc" placeholder="내용">${desc}</textarea>
          </p>
          <p>
              <input type="submit">
          </p>
          </form>`, '')
        response.writeHead(200);
        response.end(html);
      });
    });
  } else if (pathname == '/post/update') {
    let body = '';
    request.on('data', function (data) {
      body += data;
    });
    request.on('end', function () {
      let post = qsParse(body);
      let id = post.id;
      let filteredId = pathParse(id).base;
      let title = post.title;
      let desc = post.desc;
      console.log(post);
      // 예전파일명을 새파일명으로 수정! 
      rename(`data/${filteredId}`, `data/${title}`, function (err) {
        console.log('renamed');
        // 수정된 파일명에 내용 쓰기! 
        writeFile(`data/${title}`, desc, 'utf8',
          function (err) {
            response.writeHead(302, { Location: `/?id=${title}` });
            response.end();
          });
      });
    });
  } else if (pathname == '/post/delete') {
    let body = '';
    request.on('data', function (data) {
      body += data;
    });
    request.on('end', function () {
      let post = qsParse(body);
      let id = post.id;
      let filteredId = pathParse(id).base;
      unlink(`data/${filteredId}`, function (err) {
        response.writeHead(302, { Location: `/` });
        response.end();
      });
    });
  } else {
    // 404는 파일을 찾을 수 없다는 뜻 
    response.writeHead(404);
    response.end('Not Found');
  }
});

// 포트 번호를 3000으로 열어준다. 
app.listen(3000);