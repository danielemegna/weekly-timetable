import TimeTable from './timetable.js'
import WeekNotes from './week-notes.js'
import { NextButton, PrevButton } from './navbuttons.js'
import { fetchWeekData } from './backend-client.js'

window.addEventListener('load', () => {
  moment.locale('it')
  const params = new URLSearchParams(document.location.search)
  const weekParam = params.get('weekNumber')
  const dateToBeUsed = weekParam ? moment().week(parseInt(weekParam)) : moment()
  renderPage(dateToBeUsed)
})

async function renderPage(weekDay) {
  await renderTimeTable(weekDay.clone())
  renderPrevWeekButton(weekDay.clone())
  renderNextWeekButton(weekDay.clone())
}

async function renderTimeTable(weekDay) {
  const weekNumber = weekDay.week()
  const startOfWeek = weekDay.startOf('week')
  const allowEdit = shouldAllowEdit()

  const {shifts, notes} = await fetchWeekData(weekNumber)

  const timeTableElement = new TimeTable(startOfWeek, shifts, allowEdit, false)
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
