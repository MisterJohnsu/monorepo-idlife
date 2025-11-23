import Patient from '#models/patient'
import Ws from './Ws.ts'

interface CreatePatientDTO {
    pacienteName: string
    email: string
    cpf: string
    password: string
    telefone: string
    dtNascimento: string
    sexo: string
    tipoSanguineo: string
    convenio?: string
    alergia?: string
    aparelho?: string
    medicamentos?: string
    info_adicional?: string
    doencas?: string
    telefone_ctt_emergencia?: string
    ctt_emergencia_name?: string
    biometricId?: number
}

export class PatientService {

    public async create(data: CreatePatientDTO, registerBiometric?: string | null) {
        try {
            if (registerBiometric) {
                const socket = Ws.io

                const cpf = await socket?.emit('consultCpf')

                if (!cpf) {
                    throw new Error('CPF não encontrado ou ws não conectado.')
                }
                const patient = await Patient.findByOrFail('cpf', cpf)

                patient.merge({ dy50_id: data.biometricId })
                await patient.save()

                return patient
            }

            const patient = await Patient.create({ ...data })
            return patient
        } catch (error) {
            throw error
        }
    }

    public async update(id: number, dados: Partial<Patient>) {
        try {
            const patient = await Patient.findOrFail(id)
            patient.merge(dados)
            await patient.save()
            console.log(`[PacienteService] Sucesso: Paciente ${patient.patientName} atualizado.`)
            return patient
        } catch (error) {
            console.error('[PacienteService] Erro ao atualizar paciente:', error)
            throw error // Repassa o erro para quem chamou
        }
    }

    public async show(id: number) {
        try {
            const patient = await Patient.findOrFail(id)
            return patient
        } catch (error) {
            console.error('[PacienteService] Erro ao buscar paciente:', error)
            throw error // Repassa o erro para quem chamou
        }
    }

    public async delete(id: number) {
        try {
            const patient = await Patient.findOrFail(id)
            await patient.delete()
            console.log(`[PacienteService] Sucesso: Paciente ID ${id} deletado.`)
            return true
        } catch (error) {
            console.error('[PacienteService] Erro ao deletar paciente:', error)
            throw error // Repassa o erro para quem chamou
        }
    }
}