import { HttpContext } from '@adonisjs/core/http'
import BiometriaService from '../../services/biometria_service.ts'

export default class BiometriaController {
  
  // Instanciamos o service
  private biometriaService = new BiometriaService()

  /**
   * Método que recebe o POST da Bridge
   * Rota: POST /api/leitura-sensor
   */
  public async handleLeitura({ request, response }: HttpContext) {
    // 1. Pega o dado enviado pela Bridge
    // Esperamos um JSON: { "leituraSensor": "Identificado: ID 77" }
    const { leituraSensor } = request.body()

    // Validação simples
    if (!leituraSensor) {
      return response.badRequest({ erro: 'Campo "leituraSensor" é obrigatório.' })
    }

    try {
      // 2. Passa a bola para o Service processar
      const resultado = await this.biometriaService.processarLeitura(leituraSensor)

      // 3. Log para vermos no terminal do Adonis que funcionou
      console.log('[SensorController] Resultado processado:', resultado)

      // 4. Retorna OK para a Bridge saber que recebemos
      return response.ok(resultado)

    } catch (error) {
      console.error(error)
      return response.internalServerError({ erro: 'Falha interna ao processar leitura' })
    }
  }
}