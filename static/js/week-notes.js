export default class WeekNotes extends HTMLElement {

  constructor(notes, weekNumber, allowEdit) {
    super()
    this.notes = notes
    this.weekNumber = weekNumber
    this.allowEdit = allowEdit
  }

  connectedCallback() {
    var html = `<div id="week-notes" `
    html += `class="${this.notes ? 'full' : 'empty'}" `

    if (this.allowEdit)
      html += `onclick="alert('Edit action: ` + this.weekNumber + `')" `

    if (!this.allowEdit && !this.notes)
      html += `style="display: none" `

    html += '>' + (this.notes ?? "+") + '</div>'
    this.outerHTML = html;
  }
}

// name unused since we built it programmatically
customElements.define('week-notes', WeekNotes)
