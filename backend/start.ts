import http = require('http');
import fs = require('fs');
import path = require('path');
import handlebars = require('handlebars');

const editHtmlTemplate = handlebars.compile(
  fs.readFileSync(path.join(__dirname, 'views', 'edit.html'), 'utf-8')
)

http.createServer((request, response) => {
  console.log(request.url)
  switch(request.url) {
    case '/': {
      response.writeHead(200, { 'Content-Type': 'text/plain' })
      response.end('Hello, world!', 'utf-8')
      break;
    }
    case '/edit': {
      const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'database', 'default.json'), 'utf-8'));
      const names = data[0][0];

      const html = editHtmlTemplate({ names });
      response.writeHead(200, { 'Content-Type': 'text/html' })
      response.end(html, 'utf-8')
      break;
    }
    default: {
      response.writeHead(500)
      response.end('Male!')
      break;
    }
  }
}).listen(8125);
