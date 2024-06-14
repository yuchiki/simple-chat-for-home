window.onload = async (event) => {
    await fetchMessagesAndRender();

    const name = window.localStorage.getItem('name')
    document.getElementById('name').value = name ?? ''
}
 

const fetchMessagesAndRender = async () => {
    const response = await fetch('http://localhost:3000/api/v1/messages');
    console.log(response);
    const messages = await response.json();

    console.log(messages)
    // index.htmlのmessages-listにメッセージを追加する
    const messagesTable = document.getElementById('messages');
    messagesTable.innerHTML = '';
    messages.reverse().forEach((message) => {
        const row = document.createElement('tr');
        row.dataset.messageId = message.id;
        row.onclick = rowOnClickHandler;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.name = 'delete';
        checkbox.value = message.id;
        checkbox.onclick = (e) => {
            e.stopPropagation();
        }

        const datetime = document.createElement('td');
        datetime.textContent = message.datetime;

        const name = document.createElement('th');
        name.textContent = message.name;


        const mes = document.createElement('td');
        mes.textContent = message.message;

        row.appendChild(checkbox);
        row.appendChild(datetime);
        row.appendChild(name);
        row.appendChild(mes);

        messagesTable.appendChild(row);
    });
}


const submitHandler = async (e) => {

    e.preventDefault()
    e.stopPropagation()


    const form = document.getElementById('form')
    
    const name = document.getElementById('name').value
    const message = document.getElementById('message').value    

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: name, message: message}),
    }

    const url = form.getAttribute('action') ?? ''
    const res = await fetch(url, options)

    fetchMessagesAndRender()

    document.getElementById('message').value = ''

}

const nameOnChangeHandler = (e) => {
    const name = document.getElementById('name').value
    window.localStorage.setItem('name', name)
}

const rowOnClickHandler = (e) => {
    const row = e.target.closest('tr')
    row.classList.toggle('selected')
    
    const checkbox = row.querySelector('input[type="checkbox"]')
    checkbox.checked = !checkbox.checked
}

const deleteHandler = async (e) => {
    // チェックされた行を取得
    const messagesTable = document.getElementById('messages');
    const rows = messagesTable.querySelectorAll('tr'); // チェックされた行には selected クラスが付与されている
    const checkedRows = Array.from(rows).filter(row => row.classList.contains('selected'));

    // チェックされた行のIDを取得
    const idsToDelete = checkedRows.map(row => row.dataset.messageId);

    // 送信
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ids: idsToDelete}),
    }

    const url = 'http://localhost:3000/api/v1/messages'
    const res = await fetch(url, options)

    fetchMessagesAndRender()
    

}   
