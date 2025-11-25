import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Employees extends BaseSchema {
  protected tableName = 'employees'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('employee_id').primary().unique()
      
      table.string('employee_name').notNullable()
      table.string('email').notNullable().unique()
      table.string('password').notNullable()
      table.string('phone').notNullable()
      table.string('position').notNullable()
      table.string('specialty').nullable()
      table.string('crm').nullable().unique()

      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}