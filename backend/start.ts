import path from 'path'
import fs from 'fs'
import Fastify from 'fastify'
import fastifyView from '@fastify/view'
import fastifyStatic from '@fastify/static'
import handlebars from 'handlebars'

const app = Fastify()

app.register(fastifyStatic, {
  root: path.join(__dirname, 'static'),
  wildcard: false,
})

app.register(fastifyView, {
  engine: { handlebars },
  root: path.join(__dirname, 'views'),
})

app.get('/', async (_request, reply) => {
  reply.send('Hello, world!')
})

app.get('/edit', async (request, reply) => {
  const query = request.query as Record<string, string>
  const weekNumber = parseInt(query.weekNumber || '1')
  const dayOfWeek = parseInt(query.dayOfWeek || '0')
  const shift = parseInt(query.shift || '0')

  const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'database', 'default.json'), 'utf-8'))
  const names = data[dayOfWeek][shift]

  return reply.view('edit.html', { names })
})

app.listen({ port: 8125 }, (err, address) => {
  if (err) throw err
  console.log(`Server listening at ${address}`)
})
