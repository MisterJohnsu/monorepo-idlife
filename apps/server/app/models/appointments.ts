import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Appointments extends BaseModel {
    @column({ isPrimary: true, columnName: 'appointment_id' })
    declare appointmentId: number

    @column({ columnName: 'patient_id' })
    declare patientId: number

    @column({ columnName: 'employee_id' })
    declare employeeId: number

    @column.dateTime()
    declare appointment_date: DateTime
    
    @column()
    declare diagnosis?: string

    @column()
    declare notes?: string

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
