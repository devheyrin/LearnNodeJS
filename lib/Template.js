let Template = {
    html(title, list, content, control) {
        return `
      <!doctype html>
      <html>
      <head>
      <title>WEB - ${title}</title>
      <meta charset="utf-8">
      </head>
      <body>
      <h1><a href="/">WEB</a></h1>
      ${list}
      ${control}
      ${content}
      </body>
      </html>
      `;
    },
    list(files) {
        var list = `<ol>`;
        let i = 0;
        while (i < files.length) {
            list += `<li><a href="/?id=${files[i]}">${files[i]}</a></li>`
            i++;
        }
        list += `</ol>`;
        return list;
    },
}
export default Template;