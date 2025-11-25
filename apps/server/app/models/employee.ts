import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Employees extends BaseModel {
    public static table = 'employees'
    public static primaryKey = 'employeesId'

    @column({ isPrimary: true, columnName: 'employees_id' })
    declare employeeId: number

    
    @column({ columnName: 'employee_name' })
    declare employeeName: string
    
    @column()
    declare email: string
    
    @column()
    declare password: string
    
    @column()
    declare phone: string
    
    @column()
    declare position: string
    

    @column()
    declare crm?: string
    
    @column()
    declare specialty?: string

    @column.dateTime({ autoCreate: true })
    declare createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare updatedAt: DateTime
}