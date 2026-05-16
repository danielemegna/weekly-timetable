import path from 'path'
import fs from 'fs'
import Fastify from 'fastify'
import fastifyView from '@fastify/view'
import fastifyStatic from '@fastify/static'
import handlebars from 'handlebars'
import { getNamesFor } from './usecases/view'
import { addToShift } from './usecases/add'
import { deleteFromShift } from './usecases/delete'

const app = Fastify()

app.register(fastifyStatic, { root: path.join(__dirname, 'static'), wildcard: false })
app.register(fastifyView, { engine: { handlebars }, root: path.join(__dirname, 'views') })
app.register(require('@fastify/formbody'));

app.get('/', async (_request, reply) => {
  return reply.view('index.html')
})

app.get('/database/*', async (request, reply) => {
  const filePath = path.join(__dirname, 'database', (request.params as any)['*'])
  if (!fs.existsSync(filePath))
    return reply
      .header('Access-Control-Allow-Origin', '*')
      .code(404)
      .send()

  const content = fs.readFileSync(filePath, 'utf-8')
  return reply
    .type('application/json')
    .header('Access-Control-Allow-Origin', '*')
    .send(content)
})

app.get('/edit', async (request, reply) => {
  const queryParams = request.query as Record<string, string>
  const weekNumber = parseInt(queryParams.week || '1')
  const dayOfWeek = parseInt(queryParams.dayOfWeek || '0')
  const shift = parseInt(queryParams.shift || '0')

  const names = getNamesFor(weekNumber, dayOfWeek, shift)

  return reply.view('edit.html', { names })
})

app.post('/edit', async (request, reply) => {
  const queryParams = request.query as Record<string, string>
  const weekNumber = parseInt(queryParams.week || '1')
  const dayOfWeek = parseInt(queryParams.dayOfWeek || '0')
  const shift = parseInt(queryParams.shift || '0')
  const { action, name } = request.body as any

  switch (action) {
    case 'add':
      addToShift(weekNumber, dayOfWeek, shift, name)
      break;
    case 'delete':
      deleteFromShift(weekNumber, dayOfWeek, shift, name)
      break;
    default:
      throw Error(`Unknown edit action ${action}`)
  }

  reply.redirect(`/edit?${new URLSearchParams(queryParams).toString()}`)
})

app.listen({ port: 8125, host: '0.0.0.0' }, (err, address) => {
  if (err) throw err
  console.log(`Server listening at ${address}`)
})
