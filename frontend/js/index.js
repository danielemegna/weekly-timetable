import TimeTable from './timetable.js'
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
  const htmlElement = new TimeTable(date, shifts, true)
  document.querySelector('#time-table').replaceWith(htmlElement)
}

function renderPrevWeekButton(date) {
  const htmlElement = new PrevButton(date, renderPage)
  document.querySelector('#prev-button').replaceWith(htmlElement)
}

function renderNextWeekButton(date) {
  const htmlElement = new NextButton(date, renderPage)
  document.querySelector('#next-button').replaceWith(htmlElement)
}
