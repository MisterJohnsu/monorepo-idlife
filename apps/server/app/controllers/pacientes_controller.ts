import { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'
import Paciente from '#models/paciente'

export default class PacienteController {
  public async register({ request, response }: HttpContext) {
    try {
      // Campos obrigatórios
      const requiredFields = [
        'nm_paciente',
        'email',
        'cpf',
        'nm_sexo',
        'nm_tipo_sanguineo',
        'cd_telefone',
        'dt_nascimento',
        'password'
      ]

      // Campos opcionais
      const optionalFields = [
        'nm_convenio',
        'nm_alergia',
        'nm_aparelho',
        'nm_medicamentos',
        'tx_info_adicional',
        'nm_doenca',
        'cd_telefone_ctt_emergencia',
        'nm_ctt_emergencia'
      ]

      // Verificar se todos os campos obrigatórios estão presentes
      for (const field of requiredFields) {
        if (!request.input(field)) {
          return response.status(422).json({
            error: `O campo ${field} é obrigatório`
          })
        }
      }

      // Obter campos obrigatórios
      const data = request.only(requiredFields)

      // Adicionar campos opcionais apenas se estiverem presentes no request
      const finalData = { ...data }
      for (const field of optionalFields) {
        const value = request.input(field)
        if (value !== undefined && value !== null && value !== '') {
          finalData[field] = value
        }
      }

      // Verificar se email já existe
      const existingPaciente = await Paciente.findBy('email', data.email)
      if (existingPaciente) {
        return response.status(409).json({
          error: 'Email já cadastrado'
        })
      }

      // Verificar se CPF já existe
      const existingCpf = await Paciente.findBy('cpf', data.cpf)
      if (existingCpf) {
        return response.status(409).json({
          error: 'CPF já cadastrado'
        })
      }

      // Hash da senha
      finalData.password = await hash.make(data.password)

      // Criar paciente
      const paciente = await Paciente.create(finalData)

      return response.status(201).json({
        message: 'Paciente cadastrado com sucesso',
        user: {
          cd_paciente: paciente.cd_paciente,
          nm_paciente: paciente.nm_paciente,
          email: paciente.email,
          cpf: paciente.cpf,
          nm_tipo_sanguineo: paciente.nm_tipo_sanguineo,
          cd_telefone: paciente.cd_telefone,
        }
      })
    } catch (error) {
      console.error('Erro no registro do paciente:', error)
      return response.status(500).json({
        error: 'Erro interno do servidor',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      })
    }
  }

  public async update({ params, request, response }: HttpContext) {
    try {
      const paciente = await Paciente.findOrFail(params.id)
      
      // Campos que podem ser atualizados
      const updateFields = [
        'nm_paciente',
        'cd_telefone',
        'nm_convenio',
        'nm_alergia',
        'nm_aparelho',
        'nm_medicamentos',
        'tx_info_adicional',
        'nm_doenca',
        'cd_telefone_ctt_emergencia',
        'nm_ctt_emergencia'
      ]

      // Obter apenas os campos que foram enviados na requisição
      const data: any = {}
      for (const field of updateFields) {
        const value = request.input(field)
        if (value !== undefined) {
          data[field] = value
        }
      }

      // Atualizar apenas os campos fornecidos
      paciente.merge(data)
      await paciente.save()

      return response.json({
        message: 'Paciente atualizado com sucesso',
        paciente
      })
    } catch (error) {
      console.error('Erro ao atualizar paciente:', error)
      return response.status(500).json({
        error: 'Erro ao atualizar paciente',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      })
    }
  }

  // Outros métodos permanecem iguais...
  public async index({ response }: HttpContext) {
    try {
      const pacientes = await Paciente.all()
      return response.json(pacientes)
    } catch (error) {
      console.error('Erro ao buscar pacientes:', error)
      return response.status(500).json({
        error: 'Erro ao buscar pacientes'
      })
    }
  }

  public async show({ params, response }: HttpContext) {
    try {
      const paciente = await Paciente.findOrFail(params.id)
      return response.json(paciente)
    } catch (error) {
      return response.status(404).json({
        error: 'Paciente não encontrado'
      })
    }
  }

  public async destroy({ params, response }: HttpContext) {
    try {
      const paciente = await Paciente.findOrFail(params.id)
      await paciente.delete()

      return response.json({
        message: 'Paciente removido com sucesso'
      })
    } catch (error) {
      return response.status(404).json({
        error: 'Paciente não encontrado'
      })
    }
  }

  // Método para atualizar apenas informações médicas
  public async updateMedicalInfo({ params, request, response }: HttpContext) {
    try {
      const paciente = await Paciente.findOrFail(params.id)
      
      // Campos médicos que podem ser atualizados
      const medicalFields = [
        'nm_convenio',
        'nm_alergia',
        'nm_aparelho',
        'nm_medicamentos',
        'tx_info_adicional',
        'nm_doenca',
        'cd_telefone_ctt_emergencia',
        'nm_ctt_emergencia',
        'cd_medico'
      ]

      // Obter apenas os campos que foram enviados na requisição
      const data: any = {}
      for (const field of medicalFields) {
        const value = request.input(field)
        if (value !== undefined) {
          data[field] = value
        }
      }

      // Atualizar apenas os campos fornecidos
      paciente.merge(data)
      await paciente.save()

      return response.json({
        message: 'Informações médicas atualizadas com sucesso',
        paciente
      })
    } catch (error) {
      console.error('Erro ao atualizar informações médicas:', error)
      return response.status(500).json({
        error: 'Erro ao atualizar informações médicas',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      })
    }
  }
}