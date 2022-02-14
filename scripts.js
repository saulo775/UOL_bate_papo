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
    userParticipant.catch(nameAlreadyExists)

}


function allowedName(userParticipant) {
    console.log(userParticipant.status)
    console.log(userParticipant);
    setInterval(updateStatus, 5000);
    
    const messages = axios.get('https://mock-api.driven.com.br/api/v4/uol/messages');
    messages.then(searchMessages);
}

function nameAlreadyExists(erro) {
    console.log(erro.response.status)
    if (erro.response.status === 400) {
        alert("nome já existe!!");
        yourName();
    }
}

function updateStatus() {
    let teste = axios.post('https://mock-api.driven.com.br/api/v4/uol/status',userName);
    teste.then(teste2);

    function teste2(teste) {
        console.log(teste.status);
    }
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



function searchMessages(messages) {
    let main = document.querySelector('main');
    let data = {
        message: messages.data
    };

    for (let i = 0; i < data.message.length; i++) {
        main.innerHTML = main.innerHTML + `
            <div class="message-container ${data.message[i].type}">
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
    let participant = participants.data
    console.log(participant)

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