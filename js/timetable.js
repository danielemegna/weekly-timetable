export default class TimeTable extends HTMLElement {
  
  constructor(weekDay) {
    super()
    this.startOfWeek = weekDay.startOf('week')
  }

  connectedCallback() {
    const day = this.startOfWeek.clone()

    var tableHtml = `<h2>Settimana ${day.week()}</h2>`
    tableHtml += `<table class="pure-table pure-table-bordered green">
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
          <td>Cristina</td>
          <td>Anna</td>
        </tr>`
      day.add(1, 'days')
    }

    tableHtml += `</tbody></table>`
    this.innerHTML = tableHtml
  }


}

customElements.define('time-table', TimeTable)
