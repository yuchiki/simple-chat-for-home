import { RequestHandler } from 'express'
import * as Message from '../../models/message'
import { validationResult, matchedData, checkSchema, ValidationChain } from 'express-validator'
import { ParamsDictionary } from 'express-serve-static-core'
import { RunnableValidationChains } from 'express-validator/lib/middlewares/schema'

type getMessagesBody = unknown

type PostMessageBody = {
  name: string
  message: string
}
const postMessageSchema: RunnableValidationChains<ValidationChain> = checkSchema({
  name: {
    in: ['body'],
    isString: true,
    notEmpty: true,
  },
  message: {
    in: ['body'],
    isString: true,
    notEmpty: true,
  },
})

const postMessage: RequestHandler<ParamsDictionary, string, PostMessageBody> = (req, res) => {
  console.log('POST /api/v1/messages')
  console.log(req.body)

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    console.log(errors)
    res.status(400).send('Bad Request')
    return
  }

  const body = matchedData<PostMessageBody>(req)

  Message.createMessage({
    name: body.name,
    date: new Date(),
    message: body.message,
  })

  res.send('posted.')
}

type DeleteMessagesBody = {
  ids: number[]
}

const getMessages: RequestHandler<ParamsDictionary, unknown, getMessagesBody> = (_, res, next) => {
  res.send(Message.readMessages())
  next()
}

const deleteMessagesSchema: RunnableValidationChains<ValidationChain> = checkSchema({
  'ids': {
    in: ['body'],
    isArray: true,
    notEmpty: true,
  },
  'ids.*': {
    in: ['body'],
    isInt: true,
    toInt: true,
  },
})

const deleteMessages: RequestHandler<ParamsDictionary, unknown, DeleteMessagesBody> = (req, res) => {
  const ids = req.body.ids
  console.log('DELETE /api/v1/messages')
  console.log(ids)

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    console.log(errors)
    res.status(400).send('Bad Request')
    return
  }

  const body = matchedData<DeleteMessagesBody>(req)

  Message.deleteMessages(body.ids)

  res.send('deleted.')
}

export const getMessagesHandlers = [getMessages]
export const postMessageHandlers = [postMessageSchema, postMessage]
export const deleteMessagesHandlers = [deleteMessagesSchema, deleteMessages]
