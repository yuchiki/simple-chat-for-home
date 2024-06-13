// express server

import express from 'express'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const port = '3000'

const PATHS = {
  ROOT: '/',
  API_MESSAGES: '/api/v1/messages',
}

type Message = {
  user: string
  datetime: string
  message: string
}

app.get(PATHS.ROOT, (_, res) => {
  res.send('Hello World!')
})

const messages: Message[] = [
  {
    user: 'user1',
    datetime: '2021-08-01T12:00:00',
    message: 'Hello World!',
  },
  {
    user: 'user2',
    datetime: '2021-08-01T12:01:00',
    message: 'Hi there!',
  },
  {
    user: 'user1',
    datetime: '2021-08-01T12:02:00',
    message: 'How are you?',
  },
]

app.get(PATHS.API_MESSAGES, (_, res) => {
  res.send(messages)
})

app.post(PATHS.API_MESSAGES, (req, res) => {
  messages.push({
    user: req.ip ?? 'unknown',
    datetime: new Date().toISOString(),
    message: req.body,
  })
  res.send('posted.')
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
