import * as path from "path";
import express from "express";
import WebSocket from "ws";
import session from "express-session";
import {Teacher} from "users/teacher";
import {Room} from "./room";

const port = process.env.PORT || 5000;

const app = express();

const rooms = [];


app.use(express.static(path.join(process.cwd(), "static")));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));

app.post('/room/create', (req, res) => {
    const teacher = new Teacher('teacher');
    const room = new Room(teacher);
    rooms.push(room);
    req.session.id = teacher.id;
    res.redirect(`/room/${room.id}`);
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
