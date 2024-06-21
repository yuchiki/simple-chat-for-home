import { StateManager } from './state/stateManager.js'
import { messageClient } from './communication/MessageClient.js'

import { IndexPageHTMLElements } from './components/IndexPage.js'

const stateManager = new StateManager()

export const htmlElements = new IndexPageHTMLElements(stateManager, messageClient)

window.onload = async () => {
  htmlElements.registerEventHandlers()
  await htmlElements.fetchMessages()

  const name = window.localStorage.getItem('name') ?? ''
  htmlElements.stateManager.updateState({ name: name })
}
