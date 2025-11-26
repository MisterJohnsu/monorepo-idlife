import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'appointments'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('appointment_id').primary().notNullable()

     table
        .integer('patient_id')
        .unsigned()
        .references('patient_id')
        .inTable('patients')
        .onDelete('CASCADE')

      // FK para Funcionários (Médicos)
      // A tabela 'employees' JÁ EXISTE agora, então não dará erro
      table
        .integer('employee_id')
        .unsigned()
        .references('employee_id')
        .inTable('employees')
        .onDelete('CASCADE')

      table.dateTime('appointment_date').notNullable()
      table.text('diagnosis').nullable()
      table.text('notes').nullable()

      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}