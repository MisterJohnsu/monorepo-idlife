import type { HttpContext } from '@adonisjs/core/http'
import { PatientService } from '#services/patient_service'
import Patient from '#models/patient'

export default class PatientController {
  
  private patientService = new PatientService()
  
  /**
   * Retorna um Patient por seu ID
   * 
   * @param {HttpContext} ctx - Contexto da requisi o
   * @returns {Promise<void>} - Uma promessa que resolve com o Patient ou uma resposta de erro
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
  /**
   * ATUALIZAR patient
   */
  public async update({ params, request, response }: HttpContext) {
    try {
      const allFields = [
        'patientName', 'email', 'password', 'phone', 'birthDate',
        'gender', 'bloodType', 'insurance', 'allergies', 'medicalDevices',
        'medication', 'aditionalInfo', 'address', 'diseases', 'emergencyPhone',
        'emergencyName'
      ]

      const rawData = request.only(allFields)

      const data: any = {}
      Object.keys(rawData).forEach(key => {
        if (rawData[key] !== undefined && rawData[key] !== null && rawData[key] !== '') {
          data[key] = rawData[key]
        }
      })

      const patient = await this.patientService.update(params.id, data)

      return response.ok({
        message: 'Paciente atualizado com sucesso',
        patient
      })

    } catch (error: any) {
      return response.notFound({ 
        error: 'patient não encontrado ou erro na atualização', 
        details: error.message 
      })
    }
  }
}