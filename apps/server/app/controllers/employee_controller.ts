import { PatientService } from '#services/patient_service'
import type { HttpContext } from '@adonisjs/core/http'

export default class EmployeeController{

    private patientService = new PatientService()

    public async patientCreate({ request, response }: HttpContext) {
        try {
            const { data } = request.all()

            if( data.biometricId ) {
                const pacient = await this.patientService.create(data, 'registerBiometric')
                return response.created({
                  message: 'Biometria cadastrada com sucesso',
                  pacient
                })
            }

            const pacient = await this.patientService.create(data)

            return response.created({
              message: 'Paciente cadastrado com sucesso',
              pacient
            })
        } catch (error) {
            return response.badRequest({ 
              error: 'Erro ao cadastrar paciente', 
              details: error.message 
            })
        }
    }

    public async patientUpdate({ params, request, response }: HttpContext) {
        try {
            const { dados } = request.all()
            const updatedPaciente = await this.patientService.update(params.id, dados)

            return response.ok({
                message: 'Paciente atualizado com sucesso',
                updatedPaciente
            })
        } catch (error) {
            return response.badRequest({ 
              error: 'Erro ao atualizar paciente', 
              details: error.message 
            })
        }
    }

    public async patientDelete({ params, response }: HttpContext) {
        try {
            await this.patientService.delete(params.id)

            return response.ok({
                message: 'Paciente deletado com sucesso'
            })
        } catch (error) {
            return response.badRequest({ 
              error: 'Erro ao deletar paciente', 
              details: error.message 
            })
        }
    }

    public async patientShow({ params, response }: HttpContext) {
        try {

            const patient = await this.patientService.showPatient(params.id)
            return response.ok({
                patient
            })
        } catch (error) {
            return response.badRequest({ 
              error: 'Erro ao buscar paciente', 
              details: error.message 
            })
        }
    }
}