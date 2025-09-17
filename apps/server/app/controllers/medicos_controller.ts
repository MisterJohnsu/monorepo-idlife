import type { HttpContext } from '@adonisjs/core/http'
import Medico from '#models/medicos'

export default class MedicosController {
  /**
   * Creates a new Medico
   *
   * @body {Object} data
   * @body {string} data.crm
   * @body {string} data.nm_medico
   * @body {string} data.nm_especializacao
   *
   * @response {Object} medico
   * @response {number} medico.cd_medico
   * @response {string} medico.crm
   * @response {string} medico.nm_medico
   * @response {string} medico.nm_especializacao
   * @response {string} medico.created_at
   * @response {string} medico.updated_at
   *
   * @status 201
   * @throws {HttpException}
   * @throws {ValidationError}
   */
  async create({ request, response }: HttpContext) {
    try {
      const { data } = request.all()

      if (!data) {
        return response.badRequest({ message: 'No data provided for creation' })
      }

      const medico = await Medico.create(data)

      return response.created(medico)
    } catch (error) {
      throw error
    }
  }

  /**
   * Fetches a medico by its CRM
   *
   * @queryParam {string} crm required
   *
   * @response {Object} medico
   * @response {number} medico.cd_medico
   * @response {string} medico.crm
   * @response {string} medico.nm_medico
   * @response {string} medico.nm_especializacao
   * @response {string} medico.created_at
   * @response {string} medico.updated_at
   *
   * @status 200
   * @throws {HttpException}
   * @throws {ValidationError}
   */
  async show({ params, response }: HttpContext) {
    try {
      const cmr = params.crm

      if (!cmr) {
        return response.badRequest({ message: 'Medico ID is required' })
      }

      const medico = await Medico.findBy('crm', cmr)

      return response.ok(medico)
    } catch (error) {
      throw error
    }
  }

  /**
   * Updates a medico by its CRM
   *
   * @queryParam {string} crm required
   *
   * @requestBody {Object} data
   * @requestBody {number} data.cd_medico
   * @requestBody {string} data.crm
   * @requestBody {string} data.nm_medico
   * @requestBody {string} data.nm_especializacao
   *
   * @response {Object} medico
   * @response {number} medico.cd_medico
   * @response {string} medico.crm
   * @response {string} medico.nm_medico
   * @response {string} medico.nm_especializacao
   * @response {string} medico.created_at
   * @response {string} medico.updated_at
   *
   * @status 200
   * @throws {HttpException}
   * @throws {ValidationError}
   */

  async update({ params, request, response }: HttpContext) {
    try {
      const { data } = request.all()
      const crm = params.crm

      if (!data || !crm) {
        return response.badRequest({ message: 'No data provided for update' })
      }

      const medico = await Medico.findBy('crm', crm)

      if (!medico) {
        return response.badRequest({ message: 'Medico not found' })
      }

      medico.merge(data)
      await medico.save()

      return response.ok(medico)
    } catch (error) {
      throw error
    }
  }

  /**
   * Deletes a medico by its CRM
   *
   * @queryParam {string} crm required
   *
   * @status 204
   * @throws {HttpException}
   * @throws {ValidationError}
   */
  async destroy({ params, response }: HttpContext) {
    try {
      const crm = params.crm

      if (!crm) {
        return response.badRequest({ message: 'Medico ID is required' })
      }

      const medico = await Medico.findBy('crm', crm)

      if (!medico) {
        return response.notFound({ message: 'Medico not found' })
      }

      await medico.delete()
      return response.noContent()
    } catch (error) {
      throw error
    }
  }
}
