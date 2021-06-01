
let deleteContact = (io) => {
  let clients = {};
  io.on("connection", (socket) => {
    let currentId = socket.request.user._id;
    clients[currentId] ? clients[currentId].push(socket.id) : (clients[currentId] = [socket.id]);
    
    socket.on("delete-contact", (data) => {
      let currentUser = {
        id: socket.request.user._id
      };
      if(clients[data.contactId]) {   // Check id contact có đang online hay không ?
        clients[data.contactId].forEach(socketId => {
          io.to(`${socketId}`).emit("response-delete-contact", currentUser);
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

module.exports = deleteContact;
