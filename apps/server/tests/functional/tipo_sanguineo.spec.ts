import { test } from '@japa/runner'

export interface TipoSanguineoCreateData {
  cd_tipo_sanguineo: number
  nm_tipo_sanguineo: string
}

test.group('TipoSanguineo', () => {
  test('deve registrar um tipo sanguíneo', async ({ client: api }) => {
    try {
      const data: TipoSanguineoCreateData = {
        cd_tipo_sanguineo: 1,
        nm_tipo_sanguineo: 'A+',
      }
      const response = await api.post('/tipos_sanguineos/register').json({ data })
      response.assertStatus(201)
    } catch (error) {
      throw error
    }
  })

  test('deve listar todos os tipos sanguíneos', async ({ assert, client: api }) => {
    try {
      const response = await api.get('/tipos_sanguineos/1')
      const tipo = response.body()

      response.assertStatus(200)
      assert.equal(tipo.cdTipoSanguineo, 1)
    } catch (error) {
      console.error('Erro ao buscar tipo sanguíneo:', error)
      throw error
    }
  })

  test('deve atualizar um tipo sanguíneo', async ({ assert, client: api }) => {
    try {
      const data = {
        cd_tipo_sanguineo: 1,
        nm_tipo_sanguineo: 'A-',
      }
      const response = await api.put('/tipos_sanguineos/1').json({ data })
      assert.equal(response.body().nmTipoSanguineo, 'A-')

      response.assertStatus(200)
    } catch (error) {
      throw error
    }
  })

  test('deve deletar um tipo sanguíneo', async ({ client: api }) => {
    try {
      const response = await api.delete('/tipos_sanguineos/1')
      response.assertStatus(204)
    } catch (error) {
      console.error('Erro ao deletar tipo sanguíneo:', error)
      throw error
    }
  })
})
