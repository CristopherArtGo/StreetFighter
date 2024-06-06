const express = require("express");
const app = express();
app.use(express.static(__dirname + "/public"));
const path = require("path");
const server = app.listen(8000);
const io = require("socket.io")(server);
app.set("views", path.join(__dirname, "./public/views"));
app.set("view engine", "ejs");

let users = [];
let charactersPosition = { ch1: [-25, 200], ch2: [-25, 200] };
let gameStarted = false;

app.get("/", (req, res) => {
    res.render("index");
});

io.on("connection", (socket) => {
    socket.emit("status", { msg: "Connected! -from Server!", id: socket.id });

    socket.on("confirmation", (data) => {
        console.log(data.msg + socket.id);
        let role;
        if (users.length < 2) {
            users.length == 0 ? (role = "Player 1") : (role = "Player 2");
            users.push({ id: socket.id, role: role, ready: false });
            socket.emit("initialRole", { role: role });
        } else {
            users.push({ id: socket.id, role: "Spectator", ready: false });
            socket.emit("initialRole", { role: "Spectator" });

            if (gameStarted) {
                //return current player positions
                socket.emit("startGame");
                socket.emit("currentPosition", {
                    charactersPosition: charactersPosition,
                });
            }
        }

        console.log(users);
    });

    socket.on("disconnect", () => {
        let role;
        let index;
        let winner;
        for (let i = 0; i < users.length; i++) {
            if (users[i].id === socket.id) {
                index = i;
                role = users[i].role;
                users.splice(i, 1);
                break;
            }
        }
        if (role != "Spectator") {
            gameStarted = false;
            winner = users[0];
            socket.broadcast.emit("endGame", { winner: winner, loserRole: `Player ${index + 1}` });
        }
        users[0] ? (users[0].role = "Player 1") : false;
        users[1] ? (users[1].role = "Player 2") : false;
        socket.broadcast.emit("userLeft", { msg: `${socket.id} (${role}) has left`, users: users });
    });

    socket.on("ready", () => {
        for (let i = 0; i < users.length; i++) {
            if (users[i].id === socket.id) {
                users[i].ready = true;
            }
        }
        if (users.length >= 2 && users[0].ready && users[1].ready) {
            gameStarted = true;
            socket.emit("startGame");
            socket.broadcast.emit("startGame");
        }
    });

    socket.on("checkRole", () => {
        let user;
        for (let i = 0; i < users.length; i++) {
            if (users[i].id === socket.id) {
                user = users[i];
            }
        }
    });

    socket.on("sendMove", (data) => {
        role = data.role;
        if (role.includes("Player")) {
            let playerNum = role[role.length - 1];
            socket.emit("updateAction", { playerNum: playerNum, action: data.action });
            socket.broadcast.emit("updateAction", { playerNum: playerNum, action: data.action });
        }
    });

    socket.on("sendPosition", (data) => {
        users.length ? (charactersPosition = data) : false;
    });

    socket.on("gameOver", (data) => {
        gameStarted = false;
        socket.emit("endGame", { winner: `Player ${data.winner}`, loserRole: `Player ${data.loser}` });
        socket.broadcast.emit("endGame", { winnerRole: `Player ${data.winner}`, loserRole: `Player ${data.loser}` });
        users[0] ? (users[0].role = "Player 1") : false;
        users[1] ? (users[1].role = "Player 2") : false;
    });
});
