import * as path from "path";
import express from "express";
import WebSocket from "ws";
import session from "express-session";
import hbs from "express-handlebars";
import bodyParser from "body-parser";
import expressWs from "express-ws";

import { Room } from "./users/room";
import { Teacher } from "./users/teacher";
import { Student } from './users/student';

const port = process.env.PORT || 5000;
const rootDir = process.cwd();

const app = express();
const ws = expressWs(app);

app.set("view engine", "hbs");

app.engine(
    "hbs",
    hbs({
        extname: "hbs",
        defaultView: "default",
        layoutsDir: path.join(rootDir, "/views/layouts/"),
    })
);

const rooms = {};

app.use(express.static(path.join(process.cwd(), "static")));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use(bodyParser.urlencoded({ extended: false }))


app.get('/room/create', (req, res) => {
    const teacher = new Teacher('teacher');
    const room = new Room(teacher);
    rooms[room.id] = room;
    req.session.userId = teacher.id;
    console.log('created');
    res.redirect(`/room/${room.id}`);
});

app.post('/room/join', (req, res) => {
    if (!req.body.roomId in rooms) {
        res.send('No such room');
    }

    const student = new Student(req.body.name);
    rooms[req.body.roomId].users[student.id] = student;
    req.session.userId = student.id;
    res.redirect(`/room/${req.body.roomId}`);
});

app.get('/room/:id', (req, res) => {
    console.log(req.params.id);
    if (!req.params.id in rooms) {
        res.send('No such room');
    }

    const room = rooms[req.params.id];
    if (!req.session.userId in room.users) {
        res.send('You must join the room');
    }
    const user = room.users[req.session.userId];
    const role = user.role === 1 ? 'teacher' : 'student';
    if (role === 'teacher') {
        const students = Object.values(room.users).filter(u => u.role === 2);
        res.render('teacher', {
            layout: "default",
            roomId: req.params.id,
            userId: user.id,
            students: students
        });
    } else {
        res.render('student', {
            layout: "default",
            name: user.name,
            roomId: req.params.id,
            userId: user.id
        });
    }

});

app.ws('/room/ws/:id', function (ws, req) {
    ws.on('message', function (msg) {
        const room = rooms[req.params.id];
        const user = room.users[req.session.userId];
        const data = JSON.parse(msg);

        switch (data['type']) {
            case 'openQuestion':
                room.users[data['userId']].hasQuestion = true;
                ws.send('ok');
                break;
            case 'openAnswer':
                room.users[data['userId']].hasAnswer = true;
                ws.send('ok');
                break;
            case 'closeQuestion':
                room.users[data['userId']].hasQuestion = false;
                ws.send('ok');
                break;
            case 'closeAnswer':
                for (const user of room.users) {
                    user.hasAnswer = false;
                }
                ws.send('ok');
                break;
            case 'getUsers':
                ws.send(JSON.stringify(rooms[req.params.id].users));
                break;
            default:
                ws.send('error');
                console.log(data);
                break;
        }
    });
});

const server = app.listen(port);

