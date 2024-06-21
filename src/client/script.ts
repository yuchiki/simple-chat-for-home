import { JSONClient } from './communication/JSONClient.js'
import { StateManager } from './state/stateManager.js'

import { IndexPageHTMLElements } from './components/IndexPage.js'

const MESSAGE_API_URL = 'http://localhost:3000/api/v1/messages'

const messageClient = new JSONClient<Record<string, never>, { name: string, message: string }, Record<string, never>, { ids: string[] }> (MESSAGE_API_URL)
const stateManager = new StateManager()

export const htmlElements = new IndexPageHTMLElements(stateManager, messageClient)

window.onload = async () => {
  htmlElements.registerEventHandlers()
  await htmlElements.fetchMessages()

  const name = window.localStorage.getItem('name') ?? ''
  htmlElements.stateManager.updateState({ name: name })
}
