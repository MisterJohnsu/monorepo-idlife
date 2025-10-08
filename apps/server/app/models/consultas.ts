import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Consulta extends BaseModel {
    @column({ isPrimary: true })
    declare consulta_id: number

    @column()
    declare paciente_id: number

    @column()
    declare medico_id: number

    @column.dateTime()
    declare data_consulta: DateTime

    @column()
    declare diagnostico: string

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
