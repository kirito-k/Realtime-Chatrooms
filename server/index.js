const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const router = require("./router");
const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
} = require("./appMethods");

app.use(router);

io.on("connection", (socket) => {
  //   New user joined
  socket.on("join", (data, callback) => {
    let { name, topic } = data;
    let { user, error } = addUser({ id: socket.id, name, topic });
    console.log(`${user.name} connected to topic ${user.topic}`);

    if (error) return callback({ error });

    socket.emit("message", {
      user: "admin",
      msg: `Welcome to ${user.topic} community ${user.name}`,
    });

    socket.broadcast.to(user.topic).emit("message", {
      user: "admin",
      msg: `${user.name} has joined the chat`,
    });

    socket.join(user.topic);
  });

  socket.on("sendMessage", (message, callback) => {
    let user = getUser(socket.id);

    console.log(`Message received (${user.name}): ${message}`);
    console.log(user);

    io.to(user.topic).emit("message", {
      user: user.name,
      msg: message,
    });

    callback();
  });

  //   User disconnected
  socket.on("disconnect", () => {
    console.log("User disconnected :(");
  });
});

const port = process.env.PORT || 4000;
server.listen(port, () => console.log(`Server runing on port ${port}`));
