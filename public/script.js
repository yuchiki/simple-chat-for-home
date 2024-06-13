window.onload = async (event) => {
    await fetchMessagesAndRender();


  
}
 

const fetchMessagesAndRender = async () => {
    const response = await fetch('http://localhost:3000/api/v1/messages');
    console.log(response);
    const messages = await response.json();
    console.log(messages)
    // index.htmlのmessages-listにメッセージを追加する
    const messagesTable = document.getElementById('messages');
    messagesTable.innerHTML = '';
    messages.forEach((message) => {
        const row = document.createElement('tr');


        const datetime = document.createElement('td');
        datetime.textContent = message.datetime + ":";

        const name = document.createElement('th');
        name.textContent = message.name;


        const mes = document.createElement('td');
        mes.textContent = message.message;

        
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

}
