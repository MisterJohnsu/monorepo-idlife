import Ws from '#services/Ws'
import app from '@adonisjs/core/services/app'
app.ready(() => {
  Ws.boot()
  const io = Ws.io
  const storage = Ws.storage
  
  io?.on('connection', (socket) => {
    console.log('connected: ', socket.id)

    socket.on('registerCpf', (cpf) => {
      console.log('Salvando CPF para socket id:', socket.id, 'CPF:', cpf)
      storage.set(socket.id, { cpf })
    })

    socket.on('consultCpf', () => {
      console.log('Consultando CPF para socket id:', socket.id)
      const data = storage.get(socket.id)?.cpf
      if (!data) {
        socket.emit("consultCpf", { message: "Nenhum CPF encontrado para este socket." })
        return
      }
      socket.emit("consultCpf", {message: "CPF Encontrado", data})
      return { data }
    })
  })
})