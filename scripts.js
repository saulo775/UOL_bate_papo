const object = {
    name: 'saulo'
}

const participants = axios.get('https://mock-api.driven.com.br/api/v4/uol/participants');
const messages = axios.get('https://mock-api.driven.com.br/api/v4/uol/messages');


function openCloseModal() {
    let selected = document.querySelector('section.modal');
    let active = selected.classList.contains('active');

    if (!active) {
        selected.classList.add('active');
    }else{
        selected.classList.remove('active');
    }
}


messages.then(processaResposta);

function processaResposta(response) {
   //console.log(response);
}
