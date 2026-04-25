import http from 'http'
import fs from 'fs'
import path from 'path'
import handlebars from 'handlebars'

const editHtmlTemplate = handlebars.compile(
  fs.readFileSync(path.join(__dirname, 'views', 'edit.html'), 'utf-8')
)

http.createServer((request, response) => {
  const requestedUrl = new URL(request.url!, `http://${request.headers.host}`)
  switch(requestedUrl.pathname) {
    case '/': {
      response.writeHead(200, { 'Content-Type': 'text/plain' })
      response.end('Hello, world!', 'utf-8')
      break
    }
    case '/edit': {
      const weekNumber = parseInt(requestedUrl.searchParams.get('weekNumber') || '1')
      const dayOfWeek = parseInt(requestedUrl.searchParams.get('dayOfWeek') || '0')
      const shift = parseInt(requestedUrl.searchParams.get('shift') || '0')

      const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'database', 'default.json'), 'utf-8'))
      const names = data[dayOfWeek][shift]

      const html = editHtmlTemplate({ names })
      response.writeHead(200, { 'Content-Type': 'text/html' })
      response.end(html, 'utf-8')
      break;
    }
    default: {
      response.writeHead(500)
      response.end('Bad request!')
      break;
    }
  }
}).listen(8125);
