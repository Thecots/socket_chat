console.clear();

const io = require("socket.io")(5030, {
  cors: {
    origin: "*"
  }
});

const express = require('express');
const path = require('path');
const app = express();

/* settings */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

/* socket */
io.on('connection', socket => {
  socket.on('uconnect', data => {
    socket.broadcast.emit('uconnected',data)
  })

  socket.on('send-chat-message', data => {
    socket.broadcast.emit('chat-message',data)
  })
})
/* routes */
app.get('/',(req,res)=> {
  res.sendFile(path.join(__dirname+'/public/index.html'))
})

/* listener */
app.listen(5050,() => {
  console.log('http://localhost:5050');
})