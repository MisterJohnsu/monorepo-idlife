import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'
export default class Paciente extends BaseModel {
  public static table = 'pacientes'

  public static primaryKey = 'pacienteId'

  @column({ isPrimary: true })
  declare paciente_id: number

  // Campos obrigatórios
  @column()
  declare dy50_id: number | null

  @column()
  declare paciente_name: string

  @column()
  declare email: string

  @column()
  declare cpf: string

  @column()
  declare gender: string

  @column()
  declare tipoSanguineo: string

  @column()
  declare telefone: string

  @column()
  declare dtNascimento: string

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