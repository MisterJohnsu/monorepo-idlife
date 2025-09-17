import { test } from '@japa/runner'

export interface DocumentoCreateData {
  cd_documento: number
  nm_documento: string
  nm_caminho_arquivo: string
}

test.group('Documentos', () => {
  test('deve registrar um documento', async ({ client: api }) => {
    try {
      const response = await api.post('/documentos/register').json({
        data: {
          cd_documento: '16012006',
          nm_arquivo: 'documento de teste',
          nm_caminho_arquivo: 'caminho_do_arquivo',
        },
      })
      response.assertStatus(201)
    } catch (error) {
      console.error('Erro ao registrar documento:', error)
      throw error
    }
  })
  test('deve ocorrer um erro ao registrar um documento', async ({ client: api }) => {
    try {
      const response = await api.post('/documentos/register').json({ data: undefined })
      response.assertStatus(400)
    } catch (error) {
      console.error('Erro ao registrar paciente:', error)
      throw error
    }
  })

  test('deve buscar um documento e encontrar o mesmo', async ({ assert, client: api }) => {
    try {
      const response = await api.get('/documentos/16012006')
      const documento = response.body()

      response.assertStatus(200)
      assert.equal(documento.cdDocumento, 16012006)
    } catch (error) {
      console.error('Erro ao buscar documento:', error)
      throw error
    }
  })

  test('deve atualizar o nome do arquivo', async ({ assert, client: api }) => {
    try {
      const data = {
        nm_arquivo: 'documento 1',
      }
      const response = await api.put('/documentos/16012006').json({ data })
      assert.equal(response.body().nmArquivo, 'documento 1')

      response.assertStatus(200)
    } catch (error) {
      console.error('Erro ao registrar documento:', error)
      throw error
    }
  })

  test('deve deletar um documento', async ({ client: api }) => {
    try {
      const response = await api.delete('/documentos/16012006')
      response.assertStatus(204)
    } catch (error) {
      console.error('Erro ao deletar documento:', error)
      throw error
    }
  })
})
