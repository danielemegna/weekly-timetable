import './timetable.js'

window.addEventListener('load', () => {
  console.log('on window load')
  renderTable()
})

function renderTable() {
  console.log('rendering table ..')
  const body = document.querySelector('body')
  const timetable = document.createElement('time-table')
  body.prepend(timetable)
}
