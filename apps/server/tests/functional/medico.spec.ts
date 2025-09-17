import { test } from '@japa/runner'

export interface MedicoCreateData {
  cd_medico: number
  crm: number
  nm_medico: string
  nm_especializacao: string
}

test.group('Medicos', () => {
  test('deve registrar um medico', async ({ client: api }) => {
    try {
      const data: MedicoCreateData = {
        cd_medico: 1,
        crm: 123456,
        nm_medico: 'medico',
        nm_especializacao: 'especializacao',
      }
      const response = await api.post('/medicos/register').json({ data })
      response.assertStatus(201)
    } catch (error) {
      throw error
    }
  })

  test('deve listar todos os medicos', async ({ assert, client: api }) => {
    try {
      const response = await api.get('/medicos/123456')
      const medico = response.body()

      response.assertStatus(200)
      assert.equal(medico.crm, 123456)
    } catch (error) {
      console.error('Erro ao buscar medico:', error)
      throw error
    }
  })

  test('deve atualizar um medico', async ({ assert, client: api }) => {
    try {
      const data = {
        crm: 123,
      }
      const response = await api.put('/medicos/123456').json({ data })
      assert.equal(response.body().crm, 123)

      response.assertStatus(200)
    } catch (error) {
      throw error
    }
  })

  test('deve deletar um medico', async ({ client: api }) => {
    try {
      const response = await api.delete('/medicos/123')
      response.assertStatus(204)
    } catch (error) {
      console.error('Erro ao deletar medico:', error)
      throw error
    }
  })
})
