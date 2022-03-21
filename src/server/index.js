
const express = require("express");
const os = require("os");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
  }
});
// server-side
io.on("connection", (socket) => {
  console.log(socket.id);
  const id = socket.handshake.query.id;
  socket.join(id);

  socket.on('send-message', ({ recipients, text, sender }) => {
    // console.log('Hi, received new message', recipients, text, id);
    recipients.forEach(recipient => {
      const newRecipients = recipients.filter(r => r !== recipient);
      newRecipients.push(id);
      socket.broadcast.to(recipient).emit('receive-message', {
        recipients: newRecipients, sender, text
      });
    });
  });
});

app.use(express.static("dist"));
app.use(express.json());

app.get("/api/getUsername", (req, res) =>
  res.send({ username: os.userInfo().username })
);
app.get("/", (req, res) => {
  res.send("Front Page");
});
httpServer.listen(process.env.PORT || 8000, () =>
  console.log(`Listening on port ${process.env.PORT || 8000}!`)
);
