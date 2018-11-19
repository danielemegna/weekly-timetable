export default class TimeTable extends HTMLElement {
  
  constructor(weekDay, shifts) {
    super()
    this.startOfWeek = weekDay.startOf('week')
    this.shifts = shifts
  }

  connectedCallback() {
    const day = this.startOfWeek.clone()

    var tableHtml = `
      <table class="pure-table pure-table-bordered ${colorFromWeekNumber(day.week())}">
        <thead><tr>
          <th>${day.format("MMMM").toUpperCase()}</th>
          <th>Mattino</th>
          <th>Sera</th>
        </tr></thead>
        <tbody>`

    for(var i=0; i<7; i++) {
      tableHtml += `
        <tr>
          <td>${day.format("ddd D")}</td>
          <td>${this.shifts[i][0]}</td>
          <td>${this.shifts[i][1]}</td>
        </tr>`
      day.add(1, 'days')
    }

    tableHtml += `</tbody></table>`
    this.innerHTML = tableHtml
  }

}

function colorFromWeekNumber(n) {
  const CLASSES = ["blue", "green", "purple", "orange", "yellow", "pink"]
  return CLASSES[n % (CLASSES.length-1)]
}

customElements.define('time-table', TimeTable)
