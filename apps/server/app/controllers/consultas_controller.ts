import { HttpContext } from '@adonisjs/core/http'
import Consulta from '#models/consultas'

export default class ConsultasController {
    async create({ request, response }: HttpContext) {
        try {
          const { data } = request.all()
    
          if (!data) {
            return response.badRequest({ message: 'No data provided for creation' })
          }
    
          const consulta = await Consulta.create(data)
    
          return response.created(consulta)
        } catch (error) {
          throw error
        }
      }
      async show({ params, response }: HttpContext) {
        try {
          const consulta_id = params.consulta_id
            if (!consulta_id) {
              return response.badRequest({ message: 'Consulta ID is required' })
            }
    
            const consulta = await Consulta.findBy('consulta_id', consulta_id)
    
            return response.ok(consulta)
        } catch (error) {
          throw error
        }
      }
      async update({ params, request, response }: HttpContext) {
        try {
          const consulta_id = params.consulta_id
          if (!consulta_id) {
            return response.badRequest({ message: 'Consulta ID is required' })
          }
    
          const { data } = request.all()
    
          if (!data) {
            return response.badRequest({ message: 'No data provided for update' })
          }
    
          const consulta = await Consulta.findBy('consulta_id', consulta_id)
    
          if (!consulta) {
            return response.badRequest({ message: 'Consulta not found' })
          }
    
          consulta.merge(data)
          await consulta.save()
    
          return response.ok(consulta)
        } catch (error) {
          throw error
        }
      }
        async destroy({ params, response }: HttpContext) {
          try {
            const consulta_id = params.consulta_id
            if (!consulta_id) {
              return response.badRequest({ message: 'Consulta ID is required' })
            }
    
            const consulta = await Consulta.findBy('consulta_id', consulta_id)
    
            if (!consulta) {
              return response.badRequest({ message: 'Consulta not found' })
            }
    
            await consulta.delete()
            return response.noContent()
          } catch (error) {
            throw error
          }
        }
}