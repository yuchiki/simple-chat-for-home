import { MessageTable } from './../components/MessageTable.js'
import { JSONClient } from './../communication/JSONClient.js'
import { StateManager } from './../state/stateManager.js'
import { ToggleSet } from './../util/toggleSet.js'

type Message = { id: string, name: string, message: string, date: string } // TODO: 重複しているのでまとめる
export class IndexPageHTMLElements {
  nameInput: HTMLInputElement
  messageInput: HTMLInputElement
  form: HTMLFormElement
  deleteButton: HTMLButtonElement
  messagesTable: MessageTable

  stateManager: StateManager
  messageClient: JSONClient

  constructor(stateManager: StateManager, messageClient: JSONClient) {
    this.stateManager = stateManager
    this.messageClient = messageClient
    this.stateManager.registerRender(() => {
      this.render()
    })
    this.nameInput = document.getElementById('name') as HTMLInputElement
    this.messageInput = document.getElementById('message') as HTMLInputElement
    this.form = document.getElementById('form') as HTMLFormElement
    this.deleteButton = document.getElementById('delete') as HTMLButtonElement
    this.messagesTable = new MessageTable(document.getElementById('messages') as HTMLTableElement, stateManager)
  }

  registerEventHandlers() {
    this.form.onsubmit = async (e: Event) => {
      e.preventDefault()
      e.stopPropagation()

      await this.messageClient.post({ name: this.stateManager.state.name, message: this.stateManager.state.message })
      this.stateManager.updateState({ message: '', selectedRows: new ToggleSet() })
      await this.fetchMessages()
    }

    this.deleteButton.onclick = async () => {
      await this.messageClient.delete({ ids: [...this.stateManager.state.selectedRows] })
      this.stateManager.updateState({ selectedRows: new ToggleSet() })
      await this.fetchMessages()
    }

    this.nameInput.onchange = () => {
      this.stateManager.updateState({ name: this.nameInput.value })
      window.localStorage.setItem('name', this.stateManager.state.name)
    }

    this.messageInput.onchange = () => {
      this.stateManager.updateState({ message: this.messageInput.value })
    }
  }

  render() {
    console.log(this.stateManager.state)

    this.messagesTable.render()
    this.nameInput.value = this.stateManager.state.name
    this.messageInput.value = this.stateManager.state.message
  }

  async fetchMessages() {
    const messages = await this.messageClient.get({}) as Message[]
    this.stateManager.updateState({ messages: messages })
  }
}
