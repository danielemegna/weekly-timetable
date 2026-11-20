import TimeTable from './timetable.js'
import WeekNotes from './week-notes.js'
import { NextButton, PrevButton } from './navbuttons.js'
import { fetchWeekData } from './backend-client.js'

window.addEventListener('load', () => {
  moment.locale('it')
  const params = new URLSearchParams(document.location.search)
  const weekParam = params.get('weekNumber')
  const yearParam = params.get('year')

  let dateToBeUsed = moment()
  if(yearParam)
    dateToBeUsed = dateToBeUsed.year(parseInt(yearParam))
  if(weekParam)
    dateToBeUsed = dateToBeUsed.week(parseInt(weekParam))

  renderPage(dateToBeUsed.startOf('week'))
})

async function renderPage(startOfWeek) {
  await renderTimeTable(startOfWeek.clone())
  renderPrevWeekButton(startOfWeek.clone())
  renderNextWeekButton(startOfWeek.clone())
}

async function renderTimeTable(startOfWeek) {
  const weekNumber = startOfWeek.week()
  const allowEdit = shouldAllowEdit()

  const {shifts, notes} = await fetchWeekData(weekNumber)

  const timeTableElement = new TimeTable(startOfWeek, shifts, allowEdit)
  document.querySelector('#time-table').replaceWith(timeTableElement)

  const weekNotesElement = new WeekNotes(notes, weekNumber, allowEdit)
  document.querySelector('#week-notes').replaceWith(weekNotesElement)
}

function renderPrevWeekButton(date) {
  const htmlElement = new PrevButton(date, renderPage)
  document.querySelector('#prev-button').replaceWith(htmlElement)
}

function renderNextWeekButton(date) {
  const htmlElement = new NextButton(date, renderPage)
  document.querySelector('#next-button').replaceWith(htmlElement)
}

function shouldAllowEdit() {
  const params = new URLSearchParams(document.location.search);
  return params.get("editor") == "federica"
}
