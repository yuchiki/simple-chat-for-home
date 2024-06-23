import { StateManager } from './state/stateManager.js'
import { messageClient } from './communication/MessageClient.js'

import { IndexPageHTMLElements } from './components/IndexPage.js'


const MESSAGE_API_URL = `${window.location.protocol}/api/v1/messages`
const messageClient = new JSONClient(MESSAGE_API_URL)
const stateManager = new StateManager()

export const htmlElements = new IndexPageHTMLElements(stateManager, messageClient)

window.onload = async () => {
  htmlElements.registerEventHandlers()
  await htmlElements.fetchMessages()

  const name = window.localStorage.getItem('name') ?? ''
  htmlElements.stateManager.updateState({ name: name })
}
