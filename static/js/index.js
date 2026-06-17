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

async function renderTimeTable(date) {
  const shifts = await shiftsFromDate(date)

  const timeTableElement = new TimeTable(date, shifts, shouldAllowEdit())
  document.querySelector('#time-table').replaceWith(timeTableElement)

  const weekNotesElement = new WeekNotes("Questa settimana ricordarsi di ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum consequat mi quis pretium semper. Proin luctus orci ac neque venenatis.")
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
