import TimeTable from './timetable.js'

window.addEventListener('load', () => {
  moment.locale('it')
  renderTable(moment())
})

function renderTable(date) {
  const shifts = shiftsFromDate(date)
  const timetable = new TimeTable(date, shifts)
  const body = document.querySelector('body')
  body.prepend(timetable)
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
  ]
}
