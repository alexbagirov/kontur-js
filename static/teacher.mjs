const ws = connect();

ws.addEventListener('message', function (event)  {
    const data = JSON.parse(event.data);
    if (data['type'] === 'new') {
        handleNewStudent(data['payload']);
    } else if (data['type'] === 'question') {
        handleQuestion(data['payload']);
    } else if (data['type'] === 'answer') {
        handleAnswer(data['payload']);
    }
});


const connect = () => {
    const url = `${location.origin.replace(/^http/, "ws")}/ws`;
    return new WebSocket(url);
};

function handleNewStudent (student) {

}

function handleQuestion (studentId) {

}

function handleAnswer (studentId) {

}

function letAnswer (studentId) {
    
}

function answerQuestion (studentId) {
    
}