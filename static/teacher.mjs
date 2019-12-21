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

function createStudentElement(student)
{
    return `
    <div id="div${student.role}" class="form-row" style="margin: 30px">
        <div class="col">
            <label>${student.name}</label>
        </div>
        <div class="col" name="name${student.role}">
            <input class="btn" style="background-color: greenyellow" type="submit" value="Вопрос">
            <input class="btn" style="background-color: red" type="submit" value="X">
        </div>
        <div class="col" name="name${student.role}">
            <input class="btn" style="background-color: blue" type="submit" value="Ответ">
            <input class="btn" style="background-color: red" type="submit" value="X">
        </div>
    </div>`;
}

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