import { getEditPageUrlFor } from "./backend-client.js"

export default class TimeTable extends HTMLElement {

  constructor(weekDay, shifts, allowEdit) {
    super()
    this.startOfWeek = weekDay.startOf('week')
    this.shifts = shifts
    this.allowEdit = allowEdit
  }

  connectedCallback() {
    this.outerHTML = this.buildHtml()
  }

  buildHtml() {
    const day = this.startOfWeek.clone()
    const weekNumber = this.startOfWeek.week()

    const openTable = `
      <table id="time-table" class="pure-table pure-table-bordered ${colorFromWeekNumber(day.week())}">
        <thead><tr>
          <th>${day.format("MM.YYYY").toUpperCase()}</th>
          <th>Mattino</th>
          <th>Sera</th>
        </tr></thead>
        <tbody>`

    const closeTable = `</tbody></table>`

    var tableRows = ""
    for (var dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
      tableRows += `
        <tr>
          <td>${day.format("ddd D")}</td>
          ${this.renderCell(weekNumber, dayOfWeek, 0)}
          ${this.renderCell(weekNumber, dayOfWeek, 1)}
        </tr>`
      day.add(1, 'days')
    }

    return openTable + tableRows + closeTable
  }

  renderCell(weekNumber, dayOfWeek, shiftIndex) {
    const names = this.shifts[dayOfWeek][shiftIndex].join(", ")
    if (this.allowEdit) {
      return `<td onclick="redirectToEditPage(${weekNumber}, ${dayOfWeek}, 1)">
        ${names}
      </td>`
    }

    return `<td>${names}</td>`
  }

}

window.redirectToEditPage = function redirectToEditPage(weekNumber, dayOfWeek, shift) {
  window.location.href = getEditPageUrlFor(weekNumber, dayOfWeek, shift)
}

function colorFromWeekNumber(n) {
  const CLASSES = ["blue", "green", "purple", "yellow", "pink"] //, "orange", "red"]
  return CLASSES[n % CLASSES.length]
}

// name unused since we built it programmatically
customElements.define('time-table', TimeTable)
