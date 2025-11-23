import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Consulta extends BaseModel {
    @column({ isPrimary: true })
    declare appointmentId: number

    @column()
    declare patientId: number

    @column()
    declare doctorId: number

    @column.dateTime()
    declare dtConsulta: DateTime
    
    @column()
    declare observacoes?: string

    @column.dateTime({ autoCreate: true, columnName: 'created_at', serializeAs: 'created_at' })
  declare created_at: DateTime

  @column.dateTime({
    autoCreate: true,
    autoUpdate: true,
    columnName: 'updated_at',
    serializeAs: 'updated_at',
  })
  declare updated_at: DateTime
}
