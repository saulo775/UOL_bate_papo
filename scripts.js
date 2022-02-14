const userName = {
    name: 'cleber bambam'
}

const participants = axios.post('https://mock-api.driven.com.br/api/v4/uol/participants', userName);
const messages = axios.get('https://mock-api.driven.com.br/api/v4/uol/messages');

messages.then(searchMessages);
setInterval(updateStatus, 5000);

function updateStatus() {
    axios.post('https://mock-api.driven.com.br/api/v4/uol/status',userName);
    // userActive.then(ola);

    // function ola(userActive) {
    //     console.log(userActive);
    // }
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
    console.log(messages)
}

function sendMessage() {
    alert("clicado")
}