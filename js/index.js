import TimeTable from './timetable.js'
import { NextButton, PrevButton } from './navbuttons.js'

window.addEventListener('load', () => {
  moment.locale('it')
  renderPage(moment())
})

function renderPage(weekDay) {
  const main = document.querySelector('#main')
  main.innerHTML = ``
  main.append(prevWeekButton(weekDay.clone()))
  main.append(nextWeekButton(weekDay.clone()))
  main.append(timeTable(weekDay.clone()))
}

function prevWeekButton(date) {
  return new PrevButton(date, renderPage)
}

function nextWeekButton(date) {
  return new NextButton(date, renderPage)
}

function timeTable(date) {
  const shifts = shiftsFromDate(date)
  return new TimeTable(date, shifts)
}

function shiftsFromDate(date) {
  const weekNumber = date.week()
  return [
    ["Cristina","Anna"],
    ["Anna","Cristina & girls"],
    ["Eleonora, Cristina","Anna"],
    ["Anna","Sonia"],
    ["Eleonora","Cristina & girls"],
    ["Anna, Monica, Erika, Elisa","Daniele, Stefania, Giona"],
    ["Barbara, Laura, Elena, Cinzia","Anna, Rossana"],
  ].sort( () => .5 - Math.random() );
}
