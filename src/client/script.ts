import { MessageTable } from './components/MessageTable.js'
import { JSONClient } from './communication/JSONClient.js'
import { StateManager } from './state/stateManager.js'
import { ToggleSet } from './util/toggleSet.js'

const MESSAGE_API_URL = 'http://localhost:3000/api/v1/messages'

type Message = { id: string, name: string, message: string, date: string } // TODO: 重複しているのでまとめる
class IndexPageHTMLElements {
  nameInput: HTMLInputElement
  messageInput: HTMLInputElement
  form: HTMLFormElement
  deleteButton: HTMLButtonElement
  messagesTable: MessageTable

  stateManager: StateManager

  constructor(stateManager: StateManager) {
    this.stateManager = stateManager
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
    this.form.onsubmit = submitHandler
    this.deleteButton.onclick = deleteHandler
    this.nameInput.onchange = nameOnChangeHandler
    this.messageInput.onchange = messageOnChangeHandler
  }

  render() {
    console.log(this.stateManager.state)

    this.messagesTable.render()
    this.nameInput.value = this.stateManager.state.name
    this.messageInput.value = this.stateManager.state.message
  }
}
const messageClient = new JSONClient(MESSAGE_API_URL)
const stateManager = new StateManager()

const htmlElements = new IndexPageHTMLElements(stateManager)

window.onload = async () => {
  htmlElements.registerEventHandlers()
  await fetchMessages()

  const name = window.localStorage.getItem('name') ?? ''
  htmlElements.stateManager.updateState({ name: name })
}

const fetchMessages = async () => {
  const messages = await messageClient.get({}) as Message[]
  console.log(messages)
  htmlElements.stateManager.updateState({ messages: messages })
}

export const messageOnChangeHandler = () => {
  htmlElements.stateManager.updateState({ message: htmlElements.messageInput.value })
}

export const submitHandler = async (e: Event) => {
  e.preventDefault()
  e.stopPropagation()

  await messageClient.post({ name: htmlElements.stateManager.state.name, message: htmlElements.stateManager.state.message })
  htmlElements.stateManager.updateState({ message: '', selectedRows: new ToggleSet() })
  await fetchMessages()
}

export const nameOnChangeHandler = () => {
  htmlElements.stateManager.updateState({ name: htmlElements.nameInput.value })
  window.localStorage.setItem('name', htmlElements.stateManager.state.name)
}

export const deleteHandler = async () => {
  await messageClient.delete({ ids: [...htmlElements.stateManager.state.selectedRows] })
  htmlElements.stateManager.updateState({ selectedRows: new ToggleSet() })
  await fetchMessages()
}
