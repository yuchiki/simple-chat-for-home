// express server

import express from 'express'
import bodyParser from 'body-parser'

const app = express()
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

const port = '3000'

const PATHS = {
  ROOT: '/',
  API_MESSAGES: '/api/v1/messages',
}

type Message = {
  name: string
  datetime: string
  message: string
}

const messages: Message[] = [
  {
    name: 'user1',
    datetime: '2021-08-01T12:00:00',
    message: 'Hello World!',
  },
  {
    name: 'user2',
    datetime: '2021-08-01T12:01:00',
    message: 'Hi there!',
  },
  {
    name: 'user1',
    datetime: '2021-08-01T12:02:00',
    message: 'How are you?',
  },
]

app.get(PATHS.API_MESSAGES, (_, res) => {
  res.send(messages)
})

export type PostMessage = {
  message: string
}

app.post (PATHS.API_MESSAGES, (req, res) => {
  console.log('POST /api/v1/messages')
  console.log(req.body)
  messages.push({
    name: req.body.name,
    datetime: new Date().toISOString(),
    message: req.body.message,
  })
  res.send('posted.')
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
