class NextButton extends HTMLElement {
  constructor(weekDay, renderPageFn) {
    super()
    this.addEventListener('click', () => {
      renderPageFn(weekDay.add(1, 'week'))
    })
  }
}

class PrevButton extends HTMLElement {
  constructor(weekDay, renderPageFn) {
    super()
    this.addEventListener('click', () => {
      renderPageFn(weekDay.subtract(1, 'week'))
    })
  }
}

export { NextButton, PrevButton }

// name unused since we built them programmatically
customElements.define('next-button', NextButton)
customElements.define('prev-button', PrevButton)
