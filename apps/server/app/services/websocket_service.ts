import { Server } from 'socket.io'
import server from '@adonisjs/core/services/server'
class Ws {
  io: Server | undefined
  private booted = false

  boot() {
  if (this.booted) return

  this.booted = true

  console.log("🔌 WebSocket bootando...")

  this.io = new Server(server.getNodeServer(), {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  })

  this.io.on("connection", () => {
    console.log("🎉 Cliente conectado ao WebSocket!")
  })
}
}

export default new Ws()
