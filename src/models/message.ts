type Message = {
  id: number
  name: string
  date: Date
  message: string
}

const messages = new Map<number, Message> ()

const generateID = (function* () {
  let id = 0
  for (;;) {
    yield id++
  }
})()

export const createMessage = (message: Omit<Message, 'id'>): Message => {
  const id = generateID.next().value
  const newMessage = { id, ...message }
  messages.set(id, newMessage)
  return newMessage
}

export const readMessages = (): Message[] => {
  return Array.from(messages.values())
}

export const deleteMessages = (ids: number[]): void => {
  console.log(messages)
  ids.forEach((id) => {
    console.log(messages.delete(id))
  })
}
