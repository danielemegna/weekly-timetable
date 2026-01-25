import TimeTable from './timetable.js'
import { NextButton, PrevButton } from './navbuttons.js'

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
  const htmlElement = new TimeTable(date, shifts)
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

async function shiftsFromDate(date) {
  const weekNumber = date.week()
  console.info(`Fetching week ${weekNumber} ....`)
  var fetchResponse = await fetch(`database/week_${weekNumber}.json`)
  if(fetchResponse.status == 404) {
    console.info(`Week not found, fetching defaults ...`)
    fetchResponse = await fetch(`database/default.json`)
  }
  const databaseContent = await fetchResponse.json()
  return databaseContent.sort(() => .5 - Math.random())
}
