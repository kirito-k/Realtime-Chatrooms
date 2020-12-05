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
  console.log("A new user connected");

  //   New user joined
  socket.on("join", (data, callback) => {
    let { name, topic } = data;
    let { user, error } = addUser({ id: socket.id, name, topic });

    if (error) return callback({error});
    socket.join(user.topic)
  });

  //   User disconnected
  socket.on("disconnect", () => {
    console.log("User disconnected :(");
  });
});

const port = process.env.PORT || 4000;
server.listen(port, () => console.log(`Server runing on port ${port}`));
