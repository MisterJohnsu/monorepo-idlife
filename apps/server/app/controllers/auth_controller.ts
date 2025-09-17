import { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'
import Paciente from '#models/paciente'
import Medico from '#models/medicos'
import encryption from '@adonisjs/core/services/encryption'

export default class AuthController {
  // Login do Paciente
  public async loginPaciente({ request, response }: HttpContext) {
    try {
      const { email, password } = request.only(['email', 'password'])

      // Buscar paciente por email
      const paciente = await Paciente.findBy('email', email)

      if (!paciente) {
        return response.status(401).json({
          error: 'Credenciais inválidas'
        })
      }

      // Verificar password
      const isValidpassword = await hash.verify(paciente.password, password)

      if (!isValidpassword) {
        return response.status(401).json({
          error: 'Credenciais inválidas'
        })
      }

      // Gerar token
      const tokenPayload = {
        id: paciente.cd_paciente,
        email: paciente.email,
        type: 'patient',
        timestamp: Date.now()
      }
      const token = encryption.encrypt(JSON.stringify(tokenPayload))

      return response.json({
        user: {
          cd_paciente: paciente.cd_paciente,
          email: paciente.email,
          nm_paciente: paciente.nm_paciente,
        },
        token: token
      })
    } catch (error) {
      console.error('Erro no login do paciente:', error)
      return response.status(500).json({
        error: 'Erro interno do servidor'
      })
    }
  }

  // Login do Médico
  public async loginMedico({ request, response }: HttpContext) {
    try {
      const { email, password } = request.only(['email', 'password'])

      // Buscar médico por email
      const medico = await Medico.findBy('email', email)

      if (!medico) {
        return response.status(401).json({
          error: 'Credenciais inválidas'
        })
      }

      // Verificar password
      const isValidpassword = await hash.verify(medico.password, password)

      if (!isValidpassword) {
        return response.status(401).json({
          error: 'Credenciais inválidas'
        })
      }

      // Gerar token
      const tokenPayload = {
        id: medico.cd_medico,
        email: medico.email,
        type: 'doctor',
        timestamp: Date.now()
      }
      const token = encryption.encrypt(JSON.stringify(tokenPayload))

      return response.json({
        user: {
          cd_medico: medico.cd_medico,
          email: medico.email,
          nm_medico: medico.nm_medico,
          crm: medico.crm,
          nm_especializacao: medico.nm_especializacao,
        },
        token: token
      })
    } catch (error) {
      console.error('Erro no login do médico:', error)
      return response.status(500).json({
        error: 'Erro interno do servidor'
      })
    }
  }

  // Método para validar token (útil para middleware)
  public async validateToken({ request, response }: HttpContext) {
    try {
      const token = request.header('authorization')?.replace('Bearer ', '')

      if (!token) {
        return response.status(401).json({
          error: 'Token não fornecido'
        })
      }

      const decrypted: any = encryption.decrypt(token)
      const payload = JSON.parse(decrypted)

      // Verificar se o token não expirou (24 horas)
      const tokenAge = Date.now() - payload.timestamp
      const maxAge = 24 * 60 * 60 * 1000 // 24 horas

      if (tokenAge > maxAge) {
        return response.status(401).json({
          error: 'Token expirado'
        })
      }

      return response.json({
        valid: true,
        user: payload
      })
    } catch (error) {
      return response.status(401).json({
        error: 'Token inválido'
      })
    }
  }

  // Logout (invalidar token - opcional)
  public async logout({ response }: HttpContext) {
    return response.json({
      message: 'Logout realizado com sucesso'
    })
  }
}