// Este serviço cuida especificamente das regras de negócio do Paciente
import Paciente from '#models/paciente' // Ou Paciente, dependendo do seu Model

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
    dy50Id?: number | null
}

export default class PacienteService {

    public async create(data: CreatePacienteDTO, biometric?: boolean) {
        try {
            if (biometric) {
                
            }
            
            const paciente = await Paciente.create({ ...data })

            if (!paciente) {
                throw new Error('Falha ao criar paciente')
            }

            return 'Paciente criado com sucesso'
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