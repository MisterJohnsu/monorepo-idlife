import type { HttpContext } from '@adonisjs/core/http'
import encryption from '@adonisjs/core/services/encryption'      // Funcionários (Admin, Médico, Socorrista)
import Patient from '#models/patient' // Pacientes
import Employee from '#models/employee'

export default class AuthController {

  /**
   * LOGIN DE FUNCIONÁRIOS (Admin, Médico, Socorrista)
   * Verifica na tabela 'users' e retorna o cargo para o front redirecionar.
   */
  public async loginEmployee({ request, response }: HttpContext) {
    try {
      const { email, password } = request.only(['email', 'password'])

      // 1. Busca o funcionário
      const user = await Employee.findBy('email', email)

      // 2. Verifica se existe e a senha bate
      if (!user || !password) {
        return response.unauthorized({ error: 'Credenciais inválidas (Email ou Senha incorretos)' })
      }

      // 3. Gera um token simples (criptografado)
      // Incluímos o cargo no payload para validação extra se precisar
      const tokenPayload = {
        id: user.employeeId,
        email: user.email,
        cargo: user.position,
        type: 'funcionario',
        timestamp: Date.now()
      }
      
      const token = encryption.encrypt(JSON.stringify(tokenPayload))

      // 4. Retorna dados para o Frontend
      return response.ok({
        message: 'Login realizado com sucesso',
        token: {
          type: 'bearer',
          token: token
        },
        user: {
          id: user.employeeId,
          nome: user.employeeName,
          email: user.email,
          cargo: user.position // O Frontend usará isso para redirecionar
        }
      })

    } catch (error) {
      console.error('Erro no login de funcionário:', error)
      return response.internalServerError({ error: 'Erro interno ao realizar login' })
    }
  }

  /**
   * LOGIN DE PACIENTES
   * Verifica na tabela 'pacientes'.
   */
  public async loginPatient({ request, response }: HttpContext) {
    try {
      const { data } = request.all()

      // 1. Busca o paciente
      const patient = await Patient.findBy('email', data.email)
      
      // 2. Verifica senha
      if (!patient || !data.password) {
        return response.unauthorized({ error: 'Credenciais inválidas' })
      }

      // 3. Gera Token
      const tokenPayload = {
        id: patient.patientId,
        email: patient.email,
        type: 'patient',
        timestamp: Date.now()
      }
      
      const token = encryption.encrypt(JSON.stringify(tokenPayload))

      // 4. Retorno
      return response.ok({
        message: 'Bem-vindo, paciente',
        token: {
          type: 'bearer',
          token: token
        },
        user: {
          id: patient.patientId,
          nome: patient.patientName,
          email: patient.email,
          role: 'patient' // Fixo para pacientes
        }
      })

    } catch (error) {
      console.error('Erro no login do paciente:', error)
      return response.internalServerError({ error: 'Erro interno no login do paciente' })
    }
  }

  /**
   * VALIDAÇÃO DE TOKEN (Opcional / Middleware)
   * Usado para verificar se o usuário ainda está logado
   */
  public async validateToken({ request, response }: HttpContext) {
    try {
      const authHeader = request.header('authorization')
      
      if (!authHeader) {
        return response.unauthorized({ error: 'Token não fornecido' })
      }

      const token = authHeader.replace('Bearer ', '')
      
      // Descriptografa
      const decrypted = encryption.decrypt(token)
      if (!decrypted) {
        return response.unauthorized({ error: 'Token inválido ou corrompido' })
      }

      const payload = JSON.parse(decrypted as string)

      // Validação de Expiração (24 horas)
      const tokenAge = Date.now() - payload.timestamp
      const maxAge = 24 * 60 * 60 * 1000 

      if (tokenAge > maxAge) {
        return response.unauthorized({ error: 'Sessão expirada. Faça login novamente.' })
      }

      return response.ok({ 
        valid: true, 
        user: payload 
      })

    } catch (error) {
      return response.unauthorized({ error: 'Token inválido' })
    }
  }
}