const users = [];

function addUser({ id, name, room }) {
  name = name.trim();
  room = room.trim();

  let found = users.find((user) => {
    user.name === name && user.room === room;
  });

  if (found) {
    return { error: "User name already taken" };
  } else {
    let user = { id, name, room };
    users.push(user);
    return { user };
  }
}

function removeUser(id) {
  // Assumes user will be present in users
  let index = users.findIndex((user) => user.id === id);

  return users.splice(index, 1)[0];
}

function getUser(id) {
  let index = users.findIndex((user) => user.id === id);

  return users[index];
}

function getUsersInRoom(room) {
  return users.filter((user) => user.room === room);
}

module.exports = { addUser, removeUser, getUser, getUsersInRoom };