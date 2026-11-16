import path from 'path'
import fs from 'fs'
import Fastify from 'fastify'
import fastifyView from '@fastify/view'
import fastifyStatic from '@fastify/static'
import handlebars from 'handlebars'
import { getDefaultNamesFor, getNamesFor } from './usecases/view'
import { addToShift, addToShiftAsDefault } from './usecases/add'
import { deleteFromDefaultShift, deleteFromShift } from './usecases/delete'
import { getWeekNotesFor } from './usecases/view-week-notes'
import { storeWeekNotes } from './usecases/store-week-notes'

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
  try {
    const { isDefaultWeek, weekNumber, dayOfWeek, shift } = parseEditTarget(queryParams)
    const names = isDefaultWeek
      ? getDefaultNamesFor(dayOfWeek, shift)
      : getNamesFor(weekNumber, dayOfWeek, shift)

    return reply.view('edit.html', {
      names,
      isDefaultWeek,
      closeUrl: isDefaultWeek ? '/?editor=federica' : `/?editor=federica&weekNumber=${weekNumber}`,
    })
  } catch (error) {
    return reply.code(400).send((error as Error).message)
  }
})

app.post('/edit', async (request, reply) => {
  const queryParams = request.query as Record<string, string>
  try {
    const { isDefaultWeek, weekNumber, dayOfWeek, shift } = parseEditTarget(queryParams)
    const { action, name } = request.body as any

    switch (action) {
      case 'add':
        if (isDefaultWeek)
          addToShiftAsDefault(dayOfWeek, shift, name)
        else
          addToShift(weekNumber, dayOfWeek, shift, name)
        break;
      case 'delete':
        if (isDefaultWeek)
          deleteFromDefaultShift(dayOfWeek, shift, name)
        else
          deleteFromShift(weekNumber, dayOfWeek, shift, name)
        break;
      default:
        throw Error(`Unknown edit action ${action}`)
    }

    reply.redirect(`/edit?${new URLSearchParams(queryParams).toString()}`)
  } catch (error) {
    return reply.code(400).send((error as Error).message)
  }
})

app.get('/edit-week-notes', async (request, reply) => {
  const queryParams = request.query as Record<string, string>
  const weekNumber = parseInt(queryParams.week || '1')

  const notes = getWeekNotesFor(weekNumber)

  return reply.view('edit-week-notes.html', { notes, weekNumber })
})

app.post('/edit-week-notes', async (request, reply) => {
  const queryParams = request.query as Record<string, string>
  const weekNumber = parseInt(queryParams.week || '1')
  const { notes } = request.body as any

  storeWeekNotes(notes, weekNumber)

  // auto-close after save
  reply.redirect(`/?editor=federica&weekNumber=${weekNumber}`)
})

app.listen({ port: 8125, host: '0.0.0.0' }, (err, address) => {
  if (err) throw err
  console.log(`Server listening at ${address}`)
})

type EditTarget = {
  isDefaultWeek: boolean
  weekNumber: number
  dayOfWeek: number
  shift: number
}

function parseEditTarget(queryParams: Record<string, string>): EditTarget {
  const week = queryParams.week || '1'
  const isDefaultWeek = week === 'default'
  const weekNumber = parseInt(week)
  const dayOfWeek = parseInt(queryParams.dayOfWeek || '')
  const shift = parseInt(queryParams.shift || '')

  if (!isDefaultWeek && Number.isNaN(weekNumber))
    throw Error(`Invalid week query parameter: ${week}`)

  if (Number.isNaN(dayOfWeek))
    throw Error('The dayOfWeek query parameter is mandatory')

  if (Number.isNaN(shift))
    throw Error('The shift query parameter is mandatory')

  return { isDefaultWeek, weekNumber, dayOfWeek, shift }
}
