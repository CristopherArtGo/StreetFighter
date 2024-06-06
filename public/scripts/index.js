// let FightingGround = require("Figj")
// $(document).ready(() => {
//     const socket = io();
//     socket.on("status", (data) => {
//         console.log(data.msg);
//         socket.emit("confirmation", { msg: "Connection confirmation -Client" });
//     });

//     let a = new FightingGround("ch1", "ryu"); //create a new playGround and pass the id where the first character will be displayed
//     a.initialize();
//     setInterval(() => {
//         a.mainLoop();
//     }, 100);

//     // let b = new FightingGround("ch2", "sagat"); //create a new playGround and pass the id where the first character will be displayed
//     // b.initialize();
//     // setInterval(() => {
//     //     b.mainLoop();
//     // }, 100);

//     // $("button").on("click", () => {
//     //     socket.emit("raiseHand");
//     //     return false;
//     // });

//     // socket.on("updateUserScreen", (data) => {
//     //     $(".messages").html(``);
//     //     for (let i = 0; i < data.msg.length; i++) {
//     //         $(".messages").append(`<p>${data.msg[i].message}</p>`);
//     //     }
//     //     $(".messages").scrollTop($(".messages").get(0).scrollHeight);
//     // });
// });
