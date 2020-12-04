const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const router = require("./router");

app.use(router);

io.on("connection", (socket) => {
    console.log(`socket: ${socket}`);
    console.log("Someone acutally connected");

    socket.on("disconnect", () => {
        console.log("Someone disconnected :(");
    })
})

const port = process.env.PORT || 4000;
server.listen(port, () => console.log(`Server runing on port ${port}`));
