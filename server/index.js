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
    let { name, room } = data;
    let { user, error } = addUser({ id: socket.id, name, room });
    if (error) return callback({ error });

    socket.emit("message", {
      user: "admin",
      msg: `Welcome to ${user.room} community ${user.name}`,
    });

    socket.broadcast.to(user.room).emit("message", {
      user: "admin",
      msg: `${user.name} has joined the chat`,
    });

    socket.join(user.room);

    io.to(user.room).emit("currentUsers", {
      users: getUsersInRoom(user.room),
    });
  });

  socket.on("sendMessage", (message, callback) => {
    let user = getUser(socket.id);

    console.log(`Message received (${user.name}): ${message}`);
    console.log(user);

    io.to(user.room).emit("message", {
      user: user.name,
      msg: message,
    });

    callback();
  });

  //   User disconnected
  socket.on("disconnect", () => {
    let user = removeUser(socket.id);
    if (user) {
      io.to(user.room).emit("message", {
        user: "admin",
        msg: `${user.name} has left the chatroom.`,
      });

      io.to(user.room).emit("currentUsers", {
        users: getUsersInRoom(user.room),
      });
    }
  });
});

const port = process.env.PORT || 4000;
server.listen(port, () => console.log(`Server runing on port ${port}`));
