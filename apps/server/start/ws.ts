import app from '@adonisjs/core/services/app'
import Ws from '#services/Ws'
app.ready(() => {
  Ws.boot()
  const io = Ws.io
  const storage = Ws.storage
  
  io?.on('connection', (socket) => {
    console.log('id conectado ===> ', socket.id)

    socket.on("leitura-sensor", (data) => {
      console.log("biometricId:", data.biometricId);
        const biometricId = data.biometricId
        storage.set(socket.id, { biometricId })
        console.log('Storage atualizado:', storage)
    })

    socket.on('consultCpf', () => {
      console.log('Consultando CPF para socket id:', socket.id)
      const clientData = storage.get(socket.id)
    })
  })
})