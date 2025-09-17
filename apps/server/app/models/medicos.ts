import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export default class Medico extends BaseModel {
  @column({ isPrimary: true })
  declare cd_medico: number

  @column()
  declare crm: number

  @column()
  declare nm_medico: string

  @column()
  declare email: string

  @column()
  declare password: string

  @column()
  declare nm_especializacao: string
  
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
