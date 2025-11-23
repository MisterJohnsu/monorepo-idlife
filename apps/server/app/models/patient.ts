import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'
export default class Patient extends BaseModel {
  public static table = 'pacientes'

  public static primaryKey = 'pacienteId'

  @column({ isPrimary: true })
  declare patientId: number

  // Campos obrigatórios
  @column()
  declare dy50_id: number | null

  @column()
  declare patientName: string

  @column()
  declare email: string

  @column()
  declare cpf: string

  @column()
  declare gender: string

  @column()
  declare bloodType: string

  @column()
  declare phone: string

  @column()
  declare birthDate: Date

  @column()
  declare adress: string

  @column({ serializeAs: null })
  declare password: string

  // Campos opcionais
  @column()
  declare insurance?: string | null

  @column()
  declare allergies?: string | null

  @column()
  declare medicalDevices?: string | null

  @column()
  declare medication?: string | null

  @column()
  declare aditionalInfo?: string | null

  @column()
  declare diseases?: string | null

  @column()
  declare emergencyPhone?: string | null

  @column()
  declare emergencyName?: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}