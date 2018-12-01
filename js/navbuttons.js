class NavButton extends HTMLElement {
  constructor(weekDay, renderPageFn) {
    super()
    this.addEventListener('click', () => {
      renderPageFn(weekDay)
    })
  }
}

class NextButton extends NavButton {
  constructor(weekDay, renderPageFn) {
    super(weekDay.add(1, 'week'), renderPageFn)
  }
}

class PrevButton extends NavButton {
  constructor(weekDay, renderPageFn) {
    super(weekDay.subtract(1, 'week'), renderPageFn)
  }
}

export { NextButton, PrevButton }
customElements.define('next-button', NextButton)
customElements.define('prev-button', PrevButton)
