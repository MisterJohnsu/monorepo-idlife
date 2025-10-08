import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Paciente extends BaseModel {
  public static table = 'pacientes'

  @column({ isPrimary: true })
  declare paciente_id: number

  // Campos obrigatórios
  @column()
  declare paciente_template: string

  @column()
  declare paciente_name: string

  @column()
  declare email: string

  @column()
  declare cpf: string

  @column()
  declare sexo: string

  @column()
  declare tipo_sanguineo: string

  @column()
  declare telefone: string

  @column()
  declare dt_nascimento: string

  @column({ serializeAs: null })
  declare password: string

  // Campos opcionais
  @column()
  declare convenio?: string | null

  @column()
  declare alergia?: string | null

  @column()
  declare aparelho?: string | null

  @column()
  declare medicamentos?: string | null

  @column()
  declare info_adicional?: string | null

  @column()
  declare doencas?: string | null

  @column()
  declare telefone_ctt_emergencia?: string | null

  @column()
  declare ctt_emergencia_name?: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}