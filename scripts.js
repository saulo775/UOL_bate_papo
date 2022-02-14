const userName = {
    name: ''
}

function yourName() {
    userName.name = '';
    userName.name = prompt("Qual seu nome?");

    if (userName.name === '') {
        yourName();
    }
    const userParticipant = axios.post('https://mock-api.driven.com.br/api/v4/uol/participants', userName);
    
    userParticipant.then(allowedName);
    userParticipant.catch(nameAlreadyExists);
}

function allowedName(userParticipant) {
    setInterval(updateStatus, 5000);
    
    updateMessages();
}

function nameAlreadyExists(erro) {
    if (erro.response.status === 400) {
        alert("nome já existe!!");
        yourName();
    }
}

function updateStatus() {
    axios.post('https://mock-api.driven.com.br/api/v4/uol/status',userName);
}

function openCloseModal() {
    let selected = document.querySelector('section.modal');
    let active = selected.classList.contains('active');

    if (!active) {
        selected.classList.add('active');
    }else{
        selected.classList.remove('active');
    }
}

setInterval(updateMessages, 3000);

function updateMessages() {
    const messages = axios.get('https://mock-api.driven.com.br/api/v4/uol/messages');
    messages.then(searchMessages);
}

function searchMessages(messages) {
    let main = document.querySelector('main');
    let data = {
        message: messages.data
    };

    for (let i = 0; i < data.message.length; i++) {
        main.innerHTML = main.innerHTML + `
            <div class="message-container ${data.message[i].type}" data-identifier="message">
                    <h5>${data.message[i].time}</h5>
                    <strong>${data.message[i].from}</strong>
                    <p>${data.message[i].text}</p>
            </div>
        `
    }
}

function sendMessage(button) {
    let input = document.querySelector('.send-message-container input').value;
    let message = {
        from: `${userName.name}`,
        to: "Todos",
        text: `${input}`,
        type: "message"
    }

    if (input !== null) {
        axios.post('https://mock-api.driven.com.br/api/v4/uol/messages', message);
    }
    document.querySelector('.send-message-container input').value = "";
}

function showParticipants(participants) {
    let contacts = document.querySelector('.container-contacts');
    let participant = participants.data;

    for (let i = 0; i < participant.length; i++) {
        contacts.innerHTML = contacts.innerHTML + `
        <div class="contact active" onclick="selectContact()">
            <div>
                <ion-icon name="person-circle"></ion-icon>
                <p>${participant[i].name}</p>
            </div>
            <ion-icon name="checkmark-sharp"></ion-icon>
        </div>
        `
    }
}