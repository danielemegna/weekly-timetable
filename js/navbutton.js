export default class NavButton extends HTMLElement {
  
  constructor(cssId, onClickCallback) {
    super()
    this.id = cssId
    this.addEventListener('click', onClickCallback)
  }

}

customElements.define('nav-button', NavButton)
