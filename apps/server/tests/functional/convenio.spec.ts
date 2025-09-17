import { test } from '@japa/runner'

export interface ConvenioCreateData {
  cd_convenio: number
  nm_convenio: string
}

test.group('Convenio', () => {
  test('deve registrar um convenio', async ({ client: api }) => {
    try {
      const data: ConvenioCreateData = {
        cd_convenio: 16012006,
        nm_convenio: 'convenio x',
      }
      const response = await api.post('/convenios/register').json({ data })

      response.assertStatus(201)
    } catch (error) {
      console.error('Erro ao registrar convenio:', error)
      throw error
    }
  })

  test('deve buscar um convenio e encontrar o mesmo', async ({ assert, client: api }) => {
    try {
      const response = await api.get('/convenios/16012006')
      const convenio = response.body()

      response.assertStatus(200)
      assert.equal(convenio.cdConvenio, 16012006)
    } catch (error) {
      console.error('Erro ao buscar convenio:', error)
      throw error
    }
  })

  test('deve atualizar o nome do arquivo', async ({ assert, client: api }) => {
    try {
      const data = {
        nm_convenio: 'convenio 1',
      }
      const response = await api.put('/convenios/16012006').json({ data })
      assert.equal(response.body().nmConvenio, 'convenio 1')

      response.assertStatus(200)
    } catch (error) {
      console.error('Erro ao registrar documento:', error)
      throw error
    }
  })

  test('deve deletar um convenio', async ({ client: api }) => {
    try {
      const response = await api.delete('/convenios/16012006')
      response.assertStatus(204)
    } catch (error) {
      console.error('Erro ao deletar convenio:', error)
      throw error
    }
  })
})
