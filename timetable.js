class TimeTable extends HTMLElement {

  connectedCallback() {
    console.log('time table connectedCallback')
    this.innerHTML = `
    <table class="pure-table pure-table-bordered green">
      <thead>
        <tr>
          <th>NOVEMBRE</th>
          <th>Mattino</th>
          <th>Sera</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Lun 19</td>
          <td>Cristina</td>
          <td>Anna</td>
        </tr>
        <tr>
          <td>Mar 20</td>
          <td>Anna</td>
          <td>Cristina & girls</td>
        </tr>
        <tr>
          <td>Mer 21</td>
          <td>Eleonora, Cristina</td>
          <td>Anna</td>
        </tr>
        <tr>
          <td>Gio 22</td>
          <td>Anna</td>
          <td>Sonia</td>
        </tr>
        <tr>
          <td>Ven 23</td>
          <td>Eleonora</td>
          <td>Cristina & girls</td>
        </tr>
        <tr>
          <td>Sab 24</td>
          <td>Anna, Monica, Erika, Elisa</td>
          <td>Daniele, Stefania, Giona</td>
        </tr>
        <tr>
          <td>Dom 25</td>
          <td>Barbara, Laura, Elena, Cinzia</td>
          <td>Anna, Rossana</td>
        </tr>
      </tbody>
    </table>`
  }

}

customElements.define('time-table', TimeTable)
