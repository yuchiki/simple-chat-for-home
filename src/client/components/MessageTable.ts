import { StateManager } from '../state/stateManager.js'

export class MessageTable {
  table: HTMLTableElement
  stateManager: StateManager

  constructor(table: HTMLTableElement, stateManager: StateManager) {
    this.table = table
    this.stateManager = stateManager
  }

  render() {
    this.table.innerHTML = ''
    const rows = this.stateManager.state.messages.map((message) => {
      const row = document.createElement('tr')
      row.dataset['messageId'] = message.id
      row.onclick = () => {
        this.stateManager.updateState({ selectedRows: this.stateManager.state.selectedRows.toToggled(message.id) })
      }

      const checkbox = document.createElement('input')
      checkbox.type = 'checkbox'
      checkbox.name = 'delete'
      checkbox.value = message.id
      if (this.stateManager.state.selectedRows.has(message.id)) {
        row.classList.add('selected')
        checkbox.checked = true
      }

      checkbox.onclick = (e) => {
        e.stopPropagation()
      }

      const datetime = document.createElement('td')
      datetime.textContent = new Date(message.date).toLocaleString('ja-JP')

      const name = document.createElement('th')
      name.textContent = message.name

      const mes = document.createElement('td')
      mes.textContent = message.message

      row.appendChild(checkbox)
      row.appendChild(datetime)
      row.appendChild(name)
      row.appendChild(mes)

      return row
    })

    rows.forEach(row => this.table.appendChild(row))
  }
}
