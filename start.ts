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
import { getDatabaseOrDefault } from './usecases/db-access'

const app = Fastify()

app.register(fastifyStatic, { root: path.join(__dirname, 'static'), wildcard: false })
app.register(fastifyView, { engine: { handlebars }, root: path.join(__dirname, 'views') })
app.register(require('@fastify/formbody'));

app.get('/', async (_request, reply) => {
  return reply.view('index.html')
})

app.get('/v2', async (request, reply) => {
  const { weekNumber: weekParam } = request.query as Record<string, string>
  const today = new Date()
  const requestedWeek = weekParam ? parseInt(weekParam) : NaN
  const hasWeekOverride = !Number.isNaN(requestedWeek)
  const { weekNumber: currentWeek, year: isoYear } = getIsoWeek(today)
  const weekNumber = hasWeekOverride ? requestedWeek : currentWeek
  const monday = getMondayOfWeek(hasWeekOverride
    ? getDateOfIsoWeek(weekNumber, isoYear)
    : today)

  const weekDbContent = getDatabaseOrDefault(weekNumber)

  return reply.view('v2.html', { db: weekDbContent, monday })
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
      weekNumber,
      isDefaultWeek,
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

handlebars.registerHelper('monthYear', (monday: Date) =>
  `${('0' + (monday.getMonth() + 1)).slice(-2)}.${monday.getFullYear()}`)

handlebars.registerHelper('weekdayLabel', (_monday: Date, dayOfWeek: number) =>
  ['lun', 'mar', 'mer', 'gio', 'ven', 'sab', 'dom'][dayOfWeek])

handlebars.registerHelper('dayOfMonth', (monday: Date, dayOfWeek: number) => {
  const day = new Date(monday)
  day.setDate(day.getDate() + dayOfWeek)
  return day.getDate()
})

handlebars.registerHelper('shiftClass', (names: string[]) =>
  !names || names.length === 0 ? 'empty' : names.length === 1 ? 'warn' : '')

handlebars.registerHelper('joinNames', (names: string[]) => names ? names.join(', ') : '')

function getIsoWeek(date: Date): { weekNumber: number, year: number } {
  const thursday = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  thursday.setUTCDate(thursday.getUTCDate() - ((thursday.getUTCDay() + 6) % 7) + 3)

  const firstThursday = new Date(Date.UTC(thursday.getUTCFullYear(), 0, 4))
  firstThursday.setUTCDate(firstThursday.getUTCDate() - ((firstThursday.getUTCDay() + 6) % 7) + 3)

  return {
    weekNumber: 1 + Math.round((thursday.getTime() - firstThursday.getTime()) / 604800000),
    year: thursday.getUTCFullYear(),
  }
}

function getMondayOfWeek(date: Date): Date {
  const monday = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  monday.setDate(monday.getDate() - ((monday.getDay() + 6) % 7))
  return monday
}

function getDateOfIsoWeek(weekNumber: number, isoYear: number): Date {
  const monday = getMondayOfWeek(new Date(isoYear, 0, 4))
  monday.setDate(monday.getDate() + (weekNumber - 1) * 7)
  return monday
}
