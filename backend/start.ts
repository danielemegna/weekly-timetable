import path from 'path'
import fs from 'fs'
import Fastify from 'fastify'
import fastifyView from '@fastify/view'
import fastifyStatic from '@fastify/static'
import handlebars from 'handlebars'

const app = Fastify()

app.register(fastifyStatic, { root: path.join(__dirname, 'static'), wildcard: false })
app.register(fastifyView, { engine: { handlebars }, root: path.join(__dirname, 'views') })
app.register(require('@fastify/formbody'));

app.get('/', async (_request, reply) => {
  reply.send('Hello, world!')
})

app.get('/edit', async (request, reply) => {
  const query = request.query as Record<string, string>
  const week = parseInt(query.week || '1')
  const dayOfWeek = parseInt(query.dayOfWeek || '0')
  const shift = parseInt(query.shift || '0')

  const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'database', `week_${week}.json`), 'utf-8'))
  const names = data[dayOfWeek][shift]

  return reply.view('edit.html', { names })
})

app.post('/edit', async (request, reply) => {
  const query = request.query as Record<string, string>
  const week = parseInt(query.week || '1')
  const dayOfWeek = parseInt(query.dayOfWeek || '0')
  const shift = parseInt(query.shift || '0')
  const { action, name } = request.body as any

  console.debug({week, dayOfWeek, shift, action, name})

  reply.send('Ok!')
})

app.listen({ port: 8125 }, (err, address) => {
  if (err) throw err
  console.log(`Server listening at ${address}`)
})
