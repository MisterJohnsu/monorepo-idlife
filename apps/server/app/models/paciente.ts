import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Paciente extends BaseModel {
  public static table = 'pacientes'

  @column({ isPrimary: true })
  declare cd_paciente: number

  // Campos obrigatórios
  @column()
  declare nm_paciente: string

  @column()
  declare email: string

  @column()
  declare cpf: string

  @column()
  declare nm_sexo: string

  @column()
  declare nm_tipo_sanguineo: string

  @column()
  declare cd_telefone: string

  @column()
  declare dt_nascimento: string

  @column({ serializeAs: null })
  declare password: string

  // Campos opcionais
  @column()
  declare nm_convenio?: string | null

  @column()
  declare nm_alergia?: string | null

  @column()
  declare nm_aparelho?: string | null

  @column()
  declare nm_medicamentos?: string | null

  @column()
  declare tx_info_adicional?: string | null

  @column()
  declare nm_doenca?: string | null

  @column()
  declare cd_telefone_ctt_emergencia?: string | null

  @column()
  declare nm_ctt_emergencia?: string | null

  @column()
  declare cd_medico?: number | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}