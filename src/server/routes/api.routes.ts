import { Express } from 'express'
import * as MessageControllers from '../controllers/api/messages.controllers'

export const registerApiRoutes = (app: Express): void => {
  const API_MESSAGES = '/api/v1/messages'

  app.get(API_MESSAGES, ...MessageControllers.getMessagesHandlers)
  app.post (API_MESSAGES, ...MessageControllers.postMessageHandlers)
  app.delete(API_MESSAGES, ...MessageControllers.deleteMessagesHandlers)
}
