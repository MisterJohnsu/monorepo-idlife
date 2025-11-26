import Patient from '#models/patient';

export class PatientService {

    public async create(data: any, registerBiometric?: string | null) {
        try {
            if (registerBiometric) {
                const patient = await Patient.findByOrFail('cpf', data.cpf)
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
                emergency_contact: { name: data.emergencyName, phone: data.emergencyPhone, relation: data.relation },
                gender: data.gender,
                insurance: data.insurance,
                medicalDevices: data.medicalDevices,
                medications: data.medications,
                patientName: data.patientName,
                phone: data.phone,
                password: 'defaultPassword123',
                dy50_id: ""
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
            return patient
        } catch (error) {
            console.error('[patienteService] Erro ao atualizar patiente:', error)
            throw error // Repassa o erro para quem chamou
        }
    }

    public async showPatient(data: any) {
        try {
            let cpf
            let name
            let patients

            if (data?.searchEmail) {
                patients = await Patient.findByOrFail('email', data.email)
                return patients
            }

            if (data?.searchBiometric) {
                patients = await Patient.findByOrFail('dy50_id', data.biometricId)
                return patients
            }

            if (/^\d{11}$/.test(data)) {
                cpf = data
                patients = await Patient.findByOrFail('cpf', cpf)
            } else {
                name = data
                patients = await Patient.query().where('patientName', 'like', `%${name}%`)
            }
            return patients
        } catch (error) {
            console.error('[patienteService] Erro ao buscar patiente:', error)
            throw error
        }
    }

    public async delete(cpf: string) {
        try {
            const patient = await Patient.findByOrFail('cpf', cpf)
            await patient.delete()
            return true
        } catch (error) {
            console.error('[patienteService] Erro ao deletar patiente:', error)
            throw error // Repassa o erro para quem chamou
        }
    }
}