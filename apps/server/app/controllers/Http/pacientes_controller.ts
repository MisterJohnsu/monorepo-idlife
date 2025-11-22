import type { HttpContext } from '@adonisjs/core/http'
import PacienteService from '#services/pacientes_service'
import Paciente from '#models/paciente'

export default class PacienteController {
  
  // Instancia o serviço
  private service = new PacienteService()

  /**
   * LISTAR TODOS
   */
  public async index({ response }: HttpContext) {
    const pacientes = await Paciente.all()
    return response.ok(pacientes)
  }

  /**
   * BUSCAR UM (pelo ID)
   */
  public async show({ params, response }: HttpContext) {
    try {
      const paciente = await Paciente.findOrFail(params.id)
      return response.ok(paciente)
    } catch {
      return response.notFound({ error: 'Paciente não encontrado' })
    }
  }

  /**
   * Creates a new Paciente
   * 
   * @body {Object} data
   * @body {string} data.paciente_name
   * @body {string} data.email
   * @body {string} data.password
   * @body {string} data.telefone
   * @body {string} data.dt_nascimento
   * @body {string} data.sexo
   * @body {string} data.tipo_sanguineo
   * @body {string} data.convenio
   * @body {string} data.alergia
   * @body {string} data.aparelho
   * @body {string} data.medicamentos
   * @body {string} data.info_adicional
   * @body {string} data.doencas
   * @body {string} data.telefone_ctt_emergencia
   * @body {string} data.ctt_emergencia_name
   * 
   * @response {Object} paciente
   * @response {number} paciente.paciente_id
   * @response {string} paciente.crm
   * @response {string} paciente.paciente_name
   * @response {string} paciente.email
   * @response {string} paciente.telefone
   * @response {string} paciente.dt_nascimento
   * @response {string} paciente.sexo
   * @response {string} paciente.tipo_sanguineo
   * @response {string} paciente.convenio
   * @response {string} paciente.alergia
   * @response {string} paciente.aparelho
   * @response {string} paciente.medicamentos
   * @response {string} paciente.info_adicional
   * @response {string} paciente.doencas
   * @response {string} paciente.telefone_ctt_emergencia
   * @response {string} paciente.ctt_emergencia_name
   * 
   * @status 201
   * @throws {HttpException}
   * @throws {ValidationError}
   */
  public async create({ request, response }: HttpContext) {
    try {
      const { data } = request.all()
      const paciente = await this.service.create(data)

      return response.created({
        message: 'Paciente cadastrado com sucesso',
        paciente
      })

    } catch (error) {
      return response.badRequest({ 
        error: 'Erro ao cadastrar paciente', 
        details: error.message 
      })
    }
  }

  public async createWithBiometric({ request, response }: HttpContext) {
    try {
      const { data } = request.all()
      const paciente = await this.service.create(data, true)

      return response.created({
        message: 'Paciente com biometria cadastrado com sucesso',
        paciente
      })
    } catch (error) {

    }
  }

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

      const paciente = await this.service.update(params.id, data)

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
      await this.service.delete(params.id)
      return response.ok({ message: 'Paciente removido com sucesso' })
    } catch (error) {
      return response.notFound({ error: 'Paciente não encontrado' })
    }
  }
}