import type { HttpContext } from '@adonisjs/core/http'
import { PatientService } from '#services/patient_sevice'
import Patient from '#models/patient'

export default class PatientController {
  
  private PatientService = new PatientService()
  
  /**
   * Retorna um paciente por seu ID
   * 
   * @param {HttpContext} ctx - Contexto da requisi o
   * @returns {Promise<void>} - Uma promessa que resolve com o paciente ou uma resposta de erro
   * @throws {Response} - Uma resposta de erro HTTP com status 404 (Not Found)
   */
  public async show({ params, response }: HttpContext) {
    try {
      const patient = await Patient.findOrFail(params.id)
      return response.ok(patient)
    } catch {
      return response.notFound({ error: 'Paciente não encontrado' })
    }
  }
  // public async create({ request, response }: HttpContext) {
  //   try {
  //     const { data } = request.all()
  //     const paciente = await this.service.create(data)

  //     return response.created({
  //       message: 'Paciente cadastrado com sucesso',
  //       paciente
  //     })

  //   } catch (error) {
  //     return response.badRequest({ 
  //       error: 'Erro ao cadastrar paciente', 
  //       details: error.message 
  //     })
  //   }
  // }

  // public async createWithBiometric({ request, response }: HttpContext) {
  //   try {
  //     const { data } = request.all()
  //     const updatedPaciente = await this.service.linkBiometric(data.id, data.idPacienteAguardando)

  //     return response.created({
  //       message: 'Paciente com biometria cadastrado com sucesso',
  //       updatedPaciente
  //     })
  //   } catch (error) {
  //     return response.badRequest({ 
  //       error: 'Erro ao cadastrar paciente com biometria', 
  //       details: error.message 
  //     })
  //   }
  // }

  /**
   * ATUALIZAR PACIENTE
   */
  public async update({ params, request, response }: HttpContext) {
    try {
      const allFields = [
        'paciente_name', 'email', 'password', 'telefone', 'dt_nascimento',
        'sexo', 'tipo_sanguineo', 'convenio', 'alergia', 'aparelho',
        'medicamentos', 'info_adicional', 'doencas', 
        'telefone_ctt_emergencia', 'ctt_emergencia_name'
      ]

      const rawData = request.only(allFields)

      const data: any = {}
      Object.keys(rawData).forEach(key => {
        if (rawData[key] !== undefined && rawData[key] !== null && rawData[key] !== '') {
          data[key] = rawData[key]
        }
      })

      const paciente = await this.PatientService.update(params.id, data)

      return response.ok({
        message: 'Paciente atualizado com sucesso',
        paciente
      })

    } catch (error: any) {
      return response.notFound({ 
        error: 'Paciente não encontrado ou erro na atualização', 
        details: error.message 
      })
    }
  }

  /**
   * REMOVER PACIENTE
   */
  public async destroy({ params, response }: HttpContext) {
    try {
      await this.PatientService.delete(params.id)
      return response.ok({ message: 'Paciente removido com sucesso' })
    } catch (error) {
      return response.notFound({ error: 'Paciente não encontrado' })
    }
  }
}