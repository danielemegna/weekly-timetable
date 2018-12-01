import TimeTable from './timetable.js'

window.addEventListener('load', () => {
  moment.locale('it')
  const today = moment()

  const main = document.querySelector('#main')
  main.innerHTML = ""
  main.append(timeTable(today))
})

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
  ]
}
