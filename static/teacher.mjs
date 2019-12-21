const ws = connect();

ws.addEventListener('message', function (event)  {
    const data = JSON.parse(event.data);
    if (data['type'] === 'newStudent') {
        handleNewStudent(data['studentName'], data['studentId']);
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


function handleNewStudent (name, id) {
    const student = {name, id};
    let newDiv = document.createElement("div");
    newDiv.id = 'div' + student.id;
    newDiv.innerHTML = '<div class="col">' + 
            '<label>${student.name}</label></div>';
    document.getElementById("ul1").append(newDiv)
}

function handleQuestion (studentId) {
    let newDiv = document.createElement("div");
    newDiv.innerHTML = '<input class=\"btn\" style=\"background-color: greenyellow\" type=\"submit\" value=\"Вопрос\">\n' +
        '<input class=\"btn\" style=\"background-color: red\" type=\"submit\" value=\"X\">';
    document.getElementById("div" + studentId).append(newDiv)
}

function handleAnswer (studentId) {
    let newDiv = document.createElement("div");
    newDiv.innerHTML = '<input class="btn" style="background-color: blue" type="submit" value="Ответ">' +
        '<input class="btn" style="background-color: red" type="submit" value="X">';
    document.getElementById("div" + studentId).append(newDiv)
}

function letAnswer (studentId) {
    
}

function answerQuestion (studentId) {
    
}