import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export default class Medico extends BaseModel {
  @column({ isPrimary: true })
  declare medico_id: number

  @column()
  declare crm: number

  @column()
  declare medico_name: string

  @column()
  declare email: string

  @column()
  declare password: string

  @column()
  declare especializacao: string
  
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
