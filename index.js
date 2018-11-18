import TimeTable from './timetable.js'

window.addEventListener('load', () => {
  console.log('on window load')
  moment.locale('it')
  renderTable()
})

function renderTable() {
  console.log('rendering table ..')
  const today = moment()
  const timetable = new TimeTable(today)
  const body = document.querySelector('body')
  body.prepend(timetable)
}
