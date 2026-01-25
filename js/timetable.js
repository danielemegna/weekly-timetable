export default class TimeTable extends HTMLElement {
  
  constructor(weekDay, shifts) {
    super()
    this.startOfWeek = weekDay.startOf('week')
    this.shifts = shifts
  }

  connectedCallback() {
    this.outerHTML = htmlFor(this.startOfWeek, this.shifts)
  }

}

function htmlFor(startOfWeek, shifts) {
  const day = startOfWeek.clone()

  const openTable = `
    <table class="pure-table pure-table-bordered ${colorFromWeekNumber(day.week())}">
      <thead><tr>
        <th>${day.format("MM.YYYY").toUpperCase()}</th>
        <th>Mattino</th>
        <th>Sera</th>
      </tr></thead>
      <tbody>`

  const closeTable = `</tbody></table>`

  var tableRows = ``
  for(var i=0; i<7; i++) {
    tableRows += `
      <tr>
        <td>${day.format("ddd D")}</td>
        <td>${shifts[i][0]}</td>
        <td>${shifts[i][1]}</td>
      </tr>`
    day.add(1, 'days')
  }

  return openTable + tableRows + closeTable
}


function colorFromWeekNumber(n) {
  const CLASSES = ["blue", "green", "purple", "orange", "yellow", "pink", "red"]
  return CLASSES[n % CLASSES.length]
}

// name unused since we built it programmatically
customElements.define('time-table', TimeTable)
