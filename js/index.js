import TimeTable from './timetable.js'
import { NextButton, PrevButton } from './navbuttons.js'

window.addEventListener('load', () => {
  moment.locale('it')
  renderPage(moment())
})

async function renderPage(weekDay) {
  const main = document.querySelector('#main')
  main.innerHTML = ``
  main.append(prevWeekButton(weekDay.clone()))
  main.append(nextWeekButton(weekDay.clone()))
  main.append(await timeTable(weekDay.clone()))
}

function prevWeekButton(date) {
  return new PrevButton(date, renderPage)
}

function nextWeekButton(date) {
  return new NextButton(date, renderPage)
}

async function timeTable(date) {
  const shifts = await shiftsFromDate(date)
  return new TimeTable(date, shifts)
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
