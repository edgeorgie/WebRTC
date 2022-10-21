const { server } = require('../app')

const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
})

io.on('connection', (socket) => {
  console.log('a user connected')
  socket.emit('me', socket.id)

  socket.on('disconnect', () => {
    socket.broadcast.emit('Connection finished')
  })

  socket.on('calluser', ({ userToCall, signalData, from, name }) => {
    io.to(userToCall).emit('calluser', {
      signal: signalData,
      from,
      name
    })
  })

  socket.on('answercall', (data) => {
    io.to(data.to).emit('callaccepted', data.signal)
  })
})

module.exports = io
