import Paciente from '#models/paciente' // Ou Paciente, dependendo do seu Model
import Ws from './Ws.ts'

interface CreatePacienteDTO {
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

export class PacientService {

    public async create(data: CreatePacienteDTO, registerBiometric?: string | null) {
        try {
            if (registerBiometric) {

                const socket = Ws.io

                const cpf = await socket?.emit('consultCpf')
                
                if (!cpf) {
                    throw new Error('CPF não encontrado ou ws não conectado.')
                }
                const pacient = await Paciente.findByOrFail('cpf', cpf)
                
                pacient.merge({ dy50_id: data.biometricId })
                await pacient.save()

                return pacient
            }

            const pacient = await Paciente.create({ ...data })
            return pacient
        } catch (error) {
            throw error
        }
    }

    public async update(id: number, dados: Partial<Paciente>) {
        try {
            const paciente = await Paciente.findOrFail(id)
            paciente.merge(dados)
            await paciente.save()
            console.log(`[PacienteService] Sucesso: Paciente ${paciente.paciente_name} atualizado.`)
            return paciente
        } catch (error) {
            console.error('[PacienteService] Erro ao atualizar paciente:', error)
            throw error // Repassa o erro para quem chamou
        }
    }

    public async show(id: number) {
        try {
            const paciente = await Paciente.findOrFail(id)
            return paciente
        } catch (error) {
            console.error('[PacienteService] Erro ao buscar paciente:', error)
            throw error // Repassa o erro para quem chamou
        }
    }

    public async delete(id: number) {
        try {
            const paciente = await Paciente.findOrFail(id)
            await paciente.delete()
            console.log(`[PacienteService] Sucesso: Paciente ID ${id} deletado.`)
            return true
        } catch (error) {
            console.error('[PacienteService] Erro ao deletar paciente:', error)
            throw error // Repassa o erro para quem chamou
        }
    }
}