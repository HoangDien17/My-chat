
let addListFriend = (io) => {
  let clients = {};
  io.on("connection", (socket) => {
    let currentId = socket.request.user._id;
    clients[currentId] ? clients[currentId].push(socket.id) : (clients[currentId] = [socket.id]);

    socket.on("add-to-friend", (data) => {
      let currentUser = {
        id: socket.request.user._id,
        username: socket.request.user.username,
        avatar: socket.request.user.avatar
      };
      if(clients[data.contactId]) {   // Check id contact có đang online hay không ?
        clients[data.contactId].forEach(socketId => {
          io.to(`${socketId}`).emit("response-add-to-friend", currentUser);
        })
      }
    });

    socket.on("disconnect", () => {
      clients[currentId] = clients[currentId].filter(socketId => {
        return socketId !== socket.id;
      });
      if(!clients[currentId].length) {
        delete clients[currentId];
      }
    })
  });
};

module.exports = addListFriend;
