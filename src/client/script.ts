const MESSAGE_API_URL = 'http://localhost:3000/api/v1/messages'

window.onload = async () => {
  await fetchMessagesAndRender()

  const name = window.localStorage.getItem('name') ?? ''
  const nameInput = document.getElementById('name') as HTMLInputElement
  nameInput.value = name
}

const fetchMessagesAndRender = async () => {
  const response = await fetch(MESSAGE_API_URL)
  console.log(response)
  const messages = await response.json() as { id: string, name: string, message: string, date: string }[]

  console.log(messages)
  // index.htmlのmessages-listにメッセージを追加する
  const messagesTable = document.getElementById('messages') as HTMLTableElement
  messagesTable.innerHTML = ''
  messages.reverse().forEach((message) => {
    const row = document.createElement('tr')
    row.dataset['messageId'] = message.id
    row.onclick = rowOnClickHandler

    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.name = 'delete'
    checkbox.value = message.id
    checkbox.onclick = (e) => {
      e.stopPropagation()
    }

    const datetime = document.createElement('td')
    datetime.textContent = new Date(message.date).toLocaleString('ja-JP')

    const name = document.createElement('th')
    name.textContent = message.name

    const mes = document.createElement('td')
    mes.textContent = message.message

    row.appendChild(checkbox)
    row.appendChild(datetime)
    row.appendChild(name)
    row.appendChild(mes)

    messagesTable.appendChild(row)
  })
}

export const submitHandler = async (e: Event) => {
  e.preventDefault()
  e.stopPropagation()

  const form = document.getElementById('form') as HTMLFormElement
  const nameInput = document.getElementById('name') as HTMLInputElement
  const messageInput = document.getElementById('message') as HTMLInputElement

  const name = nameInput.value
  const message = messageInput.value

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: name, message: message }),
  }

  const url = form.getAttribute('action') ?? ''
  await fetch(url, options)

  await fetchMessagesAndRender()

  messageInput.value = ''
}

export const nameOnChangeHandler = () => {
  const nameInput = document.getElementById('name') as HTMLInputElement
  const name = nameInput.value
  window.localStorage.setItem('name', name)
}

export const rowOnClickHandler = (e: MouseEvent) => {
  const row = (e.target as HTMLElement).closest('tr') as HTMLTableRowElement
  row.classList.toggle('selected')

  const checkbox = row.querySelector('input[type="checkbox"]') as HTMLInputElement
  checkbox.checked = !checkbox.checked
}

export const deleteHandler = async () => {
  // チェックされた行を取得
  const messagesTable = document.getElementById('messages') as HTMLTableElement
  const rows = messagesTable.querySelectorAll('tr') // チェックされた行には selected クラスが付与されている
  const checkedRows = Array.from(rows).filter(row => row.classList.contains('selected'))

  // チェックされた行のIDを取得
  const idsToDelete = checkedRows.map(row => row.dataset['messageId'])

  // 送信
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ids: idsToDelete }),
  }

  await fetch(MESSAGE_API_URL, options)

  await fetchMessagesAndRender()
}
