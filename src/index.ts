// express server

import express from 'express'

const app = express()
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

app.get(PATHS.API_MESSAGES, (_, res) => {
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

  res.send(JSON.stringify(messages, null, '\n'))
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
