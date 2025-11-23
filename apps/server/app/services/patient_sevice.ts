import Patient from '#models/patient'
import Ws from './Ws.ts'

interface CreatepatientDTO {
    patientName: string
    email: string
    cpf: string
    password: string
    phone: string
    birthDate: Date
    sex: string
    bloodType: string
    insurance?: string
    alergies?: string
    medicalDevices?: string
    medication?: string
    aditionalInfo?: string
    diseases?: string
    emergencyPhone?: string
    emergencyName?: string
    biometricId?: number
}

export class PatientService {

    public async create(data: CreatepatientDTO, registerBiometric?: string | null) {
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
            console.log(`[patienteService] Sucesso: patiente ${patient.patientName} atualizado.`)
            return patient
        } catch (error) {
            console.error('[patienteService] Erro ao atualizar patiente:', error)
            throw error // Repassa o erro para quem chamou
        }
    }

    public async show(id: number) {
        try {
            const patient = await Patient.findOrFail(id)
            return patient
        } catch (error) {
            console.error('[patienteService] Erro ao buscar patiente:', error)
            throw error // Repassa o erro para quem chamou
        }
    }

    public async delete(id: number) {
        try {
            const patient = await Patient.findOrFail(id)
            await patient.delete()
            console.log(`[patienteService] Sucesso: patiente ID ${id} deletado.`)
            return true
        } catch (error) {
            console.error('[patienteService] Erro ao deletar patiente:', error)
            throw error // Repassa o erro para quem chamou
        }
    }
}