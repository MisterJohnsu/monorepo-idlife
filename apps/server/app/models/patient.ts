import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'
export default class Patient extends BaseModel {
  public static table = 'patients'

  public static primaryKey = 'pacienteId'

  @column({ isPrimary: true , columnName: 'patient_id' })
  declare patientId: number

  // Campos obrigatórios
  @column()
  declare dy50_id: number | null

  @column({ columnName: 'patient_name' })
  declare patientName: string

  @column()
  declare email: string

  @column()
  declare cpf: string

  @column()
  declare gender: string

  @column({ columnName: 'blood_type' })
  declare bloodType: string

  @column()
  declare phone: string

  @column({ columnName: 'birth_date' })
  declare birthDate: Date

  
  @column({ serializeAs: null })
  declare password: string
  
  // Campos opcionais
  @column()
  declare address: { street: string, city: string, state: string }

  @column()
  declare insurance?: string | null

  @column()
  declare allergies?: string | null

  @column({ columnName: 'medical_devices' })
  declare medicalDevices?: string | null

  @column()
  declare medications?: string | null

  @column({ columnName: 'additional_info' })
  declare additionalInfo?: string | null

  @column()
  declare diseases?: string | null

  @column({ columnName: 'emergency_phone' })
  declare emergencyPhone?: string | null

  @column({ columnName: 'emergency_name' })
  declare emergencyName?: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}