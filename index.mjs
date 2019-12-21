import * as path from "path";
import express from "express";
import WebSocket from "ws";
import session from "express-session";
import hbs from "express-handlebars";
import bodyParser from "body-parser";

import { Room } from "./users/room";
import { Teacher } from "./users/teacher";
import { Student } from './users/student';

const port = process.env.PORT || 5000;
const rootDir = process.cwd();

const app = express();

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
    res.render(role, {
        layout: "default",
        name: user.name,
        roomId: req.params.id
    });
});

const server = app.listen(port);

const wss = new WebSocket.Server({
    noServer: true
});

wss.on('connection', function connection(ws) {

});

server.on("upgrade", (req, socket, head) => {
    wss.handleUpgrade(req, socket, head, ws => {
        wss.emit("connection", ws, req);
    });
});
