import Patient from '#models/patient';
import Ws from './Ws.ts';

export class PatientService {

    public async create(data: any, registerBiometric?: string | null) {
        try {
            if (registerBiometric) {
                const socket = Ws.io

                const cpf = socket?.emit("consultCpf");
                socket?.on("consultCpf", (response) => {
                    console.log("Dados recebidos do servidor:", response);
                });

                if (!cpf) {
                    throw new Error('CPF não encontrado ou ws não conectado.')
                }
                const patient = await Patient.findByOrFail('cpf', cpf)

                patient.merge({ dy50_id: data.biometricId })
                await patient.save()

                return patient
            }

            const dataCreatePatient = {
                additionalInfo: data.additionalInfo,
                address: { city: data.city, state: data.state, street: data.address },
                allergies: data.allergies,
                birthDate: data.birthDate,
                bloodType: data.bloodType,
                cpf: data.cpf,
                email: data.email,
                emergencyName: data.emergencyName,
                emergencyPhone: data.emergencyPhone,
                gender: data.gender,
                insurance: data.insurance,
                medicalDevices: data.medicalDevices,
                medications: data.medications,
                patientName: data.patientName,
                phone: data.phone,
                password: 'defaultPassword123',
            }

            const patient = await Patient.create({ ...dataCreatePatient })
            // const patient = await Patient.create({ ...data })
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

    public async showPatient(cpfOrName: string) {
        try {
            let cpf
            let name
            let patients

            if (/^\d{11}$/.test(cpfOrName)) {
                cpf = cpfOrName
                patients = await Patient.query().where('cpf', cpf)
            } else {
                name = cpfOrName
                patients = await Patient.query().where('patientName', 'like', `%${name}%`)
            }
            return patients
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