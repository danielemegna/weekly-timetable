export default class WeekNotes extends HTMLElement {

  constructor(notes) {
    super()
    this.notes = notes
  }

  connectedCallback() {
    if(!this.notes) {
      this.outerHTML = '';
    }

    this.outerHTML = `<div id="week-notes">${this.notes}</div>`
  }
}

// name unused since we built it programmatically
customElements.define('week-notes', WeekNotes)
