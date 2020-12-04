const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const router = require("./router");

app.use(router);

io.on("connection", (socket) => {
    console.log("A new user connected");

    socket.on("join", (data, callback) => {
        console.log(`${data.name} ${data.topic}`);
        callback("User data received by server")
    })

    socket.on("disconnect", () => {
        console.log("User disconnected :(");
    })
})

const port = process.env.PORT || 4000;
server.listen(port, () => console.log(`Server runing on port ${port}`));
