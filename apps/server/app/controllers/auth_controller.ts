import { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'
import Patient from '#models/patient'
import Doctor from '#models/doctors'
import encryption from '@adonisjs/core/services/encryption'

export default class AuthController {
  // Login do Paciente
  public async loginPatient({ request, response }: HttpContext) {
    try {
      const { email, password } = request.only(['email', 'password'])

      // Buscar paciente por email
      const patient = await Patient.findBy('email', email)

      if (!patient) {
        return response.status(401).json({
          error: 'Credenciais inválidas'
        })
      }

      // Verificar password
      const isValidpassword = await hash.verify(patient.password, password)

      if (!isValidpassword) {
        return response.status(401).json({
          error: 'Credenciais inválidas'
        })
      }

      // Gerar token
      const tokenPayload = {
        patientId: patient.patientId,
        email: patient.email,
        type: 'patient',
        timestamp: Date.now()
      }
      const token = encryption.encrypt(JSON.stringify(tokenPayload))

      return response.json({
        user: {
          patientId: patient.patientId,
          email: patient.email,
          patientName: patient.patientName,
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
      const doctor = await Doctor.findBy('email', email)

      if (!doctor) {
        return response.status(401).json({
          error: 'Credenciais inválidas'
        })
      }

      // Verificar password
      const isValidpassword = await hash.verify(doctor.password, password)

      if (!isValidpassword) {
        return response.status(401).json({
          error: 'Credenciais inválidas'
        })
      }

      // Gerar token
      const tokenPayload = {
        id: doctor.doctorId,
        email: doctor.email,
        type: 'doctor',
        timestamp: Date.now()
      }
      const token = encryption.encrypt(JSON.stringify(tokenPayload))

      return response.json({
        user: {
          doctorId: doctor.doctorId,
          email: doctor.email,
          doctorName: doctor.doctorName,
          crm: doctor.crm,
          specialty: doctor.specialty,
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