
let addNewContact = (io) => {
  let clients = {};
  io.on("connection", (socket) => {
    let currentId = socket.request.user._id;
    clients[currentId] ? clients[currentId].push(socket.id) : (clients[currentId] = [socket.id]);

    socket.on("add-new-contact", (data) => {
      let currentUser = {
        id: socket.request.user._id,
        username: socket.request.user.username,
        avatar: socket.request.user.avatar
      };
      if(clients[data.contactId]) {
        clients[data.contactId].forEach(socketId => {
          io.to(`${socketId}`).emit("response-add-new-contact", currentUser);
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
    console.log(clients);
  });
};

module.exports = addNewContact;
