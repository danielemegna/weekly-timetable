import { getEditPageUrlFor } from "./backend-client.js"

export default class TimeTable extends HTMLElement {

  constructor(date, shifts, allowEdit) {
    super()
    this.startOfWeek = date.startOf('week')
    this.weekNumber = date.week()
    this.shifts = shifts
    this.allowEdit = allowEdit
  }

  connectedCallback() {
    this.outerHTML = this.buildHtml()
  }

  buildHtml() {
    const openTable = `
      <table
        id="time-table"
        class="pure-table pure-table-bordered ${this.colorFromWeekNumber()}"
      >`

    const tableHead = `
      <thead><tr>
        <th>${this.startOfWeek.format("MM.YYYY").toUpperCase()}</th>
        <th>Mattino</th>
        <th>Sera</th>
      </tr></thead>`

    var tableRows = "<tbody>"
    const day = this.startOfWeek.clone()
    for (var dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
      tableRows += `
        <tr>
          <td>${day.format("ddd D")}</td>
          ${this.renderCell(dayOfWeek, 0)}
          ${this.renderCell(dayOfWeek, 1)}
        </tr>`
      day.add(1, 'days')
    }

    const closeTable = `</tbody></table>`
    return openTable + tableHead + tableRows + closeTable
  }

  renderCell(dayOfWeek, shiftIndex) {
    const names = this.shifts[dayOfWeek][shiftIndex].join(", ")
    if (this.allowEdit) {
      return `<td onclick="redirectToEditPage(${this.weekNumber}, ${dayOfWeek}, ${shiftIndex})">
        ${names}
      </td>`
    }

    return `<td>${names}</td>`
  }

  colorFromWeekNumber() {
    const CLASSES = ["blue", "green", "purple", "yellow", "pink"] //, "orange", "red"]
    return CLASSES[this.weekNumber % CLASSES.length]
  }

}

window.redirectToEditPage = function redirectToEditPage(weekNumber, dayOfWeek, shift) {
  window.location.href = getEditPageUrlFor(weekNumber, dayOfWeek, shift)
}

// name unused since we built it programmatically
customElements.define('time-table', TimeTable)
