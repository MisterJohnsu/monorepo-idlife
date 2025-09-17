import { test } from '@japa/runner'

export interface PacienteCreateData {
  cd_paciente: number
  cpf: number
  nm_paciente: string
  dt_nascimento: string
  cd_telefone_ctt_emergencia: string
  nm_ctt_emergencia: string
  tx_info_adicional: string
  cd_parentesco: number
  cd_tipo_sanguineo: number
  cd_documento: number
  cd_convenio: number
  cd_medico: number
}

test.group('Pacientes', () => {
  test('deve registrar um paciente', async ({ client: api }) => {
    try {
      const response = await api.post('/pacientes/register').json({
        data: {
          cd_paciente: 14022006,
          cpf: 12345678901,
          nm_paciente: 'John Doe',
          dt_nascimento: '1990-01-01',
          cd_telefone_ctt_emergencia: '1234567890',
          nm_ctt_emergencia: 'John Doe',
          tx_info_adicional: 'John Doe',
          cd_parentesco: 1,
          cd_tipo_sanguineo: 1,
          cd_documento: 1,
          cd_convenio: 1,
          cd_medico: 1,
        },
      })
      response.assertStatus(201)
    } catch (error) {
      console.error('Erro ao registrar paciente:', error)
      throw error
    }
  })

  test('deve ocorrer um erro ao registrar um paciente', async ({ client: api }) => {
    try {
      const response = await api.post('/pacientes/register').json({ data: undefined })
      response.assertStatus(400)
    } catch (error) {
      console.error('Erro ao registrar paciente:', error)
      throw error
    }
  })

  test('Deve buscar um paciente e encontrar o mesmo', async ({ assert, client: api }) => {
    try {
      const response = await api.get('/pacientes/12345678901')
      const paciente = response.body()

      response.assertStatus(200)
      assert.equal(paciente.cdPaciente, 14022006)
    } catch (error) {
      console.error('Erro ao registrar paciente:', error)
      throw error
    }
  })

  test('Deve atualizar o nome do paciente', async ({ assert, client: api }) => {
    try {
      const data = {
        nm_paciente: 'Jane Doe',
      }
      const response = await api.put('/pacientes/12345678901').json({ data })
      assert.equal(response.body().nmPaciente, 'Jane Doe')

      response.assertStatus(200)
    } catch (error) {
      console.error('Erro ao registrar paciente:', error)
      throw error
    }
  })

  test('Deve apagar um paciente', async ({ client: api }) => {
    try {
      const response = await api.delete('/pacientes/12345678901')

      response.assertStatus(204)
    } catch (error) {
      console.error('Erro ao registrar paciente:', error)
      throw error
    }
  })
})
