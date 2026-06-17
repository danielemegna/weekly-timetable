export default class WeekNotes extends HTMLElement {

  constructor(notes) {
    super()
    this.notes = notes
  }

  connectedCallback() {
    this.outerHTML = `<div
      id="week-notes"
      style="${!this.notes ? 'display:none' : ''}"
    >${this.notes}</div>`
  }
}

// name unused since we built it programmatically
customElements.define('week-notes', WeekNotes)
