const io = require("socket.io")(5000, {
  cors: {
    origin: "http://192.168.1.2:3000",
  },
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  console.log("a user connected");

  //take user_id and socket id from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
  });

  //send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);

    io.to(user?.socketId).emit("getMessage", { senderId, text });
  });

  //remove on disconnect
  socket.on("disconnect", () => {
    removeUser(socket.id);
    console.log("a User Disconnected");
  });
});
