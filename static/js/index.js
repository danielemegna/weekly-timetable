import TimeTable from './timetable.js'
import WeekNotes from './week-notes.js'
import { NextButton, PrevButton } from './navbuttons.js'
import { shiftsFromDate } from './backend-client.js'

window.addEventListener('load', () => {
  moment.locale('it')
  renderPage(moment())
})

async function renderPage(weekDay) {
  await renderTimeTable(weekDay.clone())
  renderPrevWeekButton(weekDay.clone())
  renderNextWeekButton(weekDay.clone())
}

async function renderTimeTable(weekDay) {
  const weekNumber = weekDay.week()
  const startOfWeek = weekDay.startOf('week')
  const shifts = await shiftsFromDate(weekNumber)
  const allowEdit = shouldAllowEdit()

  const timeTableElement = new TimeTable(startOfWeek, shifts, allowEdit)
  document.querySelector('#time-table').replaceWith(timeTableElement)

  const weekNotesElement = new WeekNotes(weekNotesFrom(shifts), weekNumber, allowEdit)
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

function weekNotesFrom(shifts) {
  if(shifts.length < 8) return null
  if(shifts[7].length < 0) return null

  return shifts[7][0]
}
