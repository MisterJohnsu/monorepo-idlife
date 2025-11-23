import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Doctors extends BaseSchema {
  // A tabela será criada com o nome 'doctors' para bater com a referência em Consultas
  protected tableName = 'doctors'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('doctorId').primary().unique()
      
      table.boolean('isAdmin').notNullable().defaultTo(false)
      table.string('crm').notNullable().unique()
      table.string('doctorName').notNullable()
      table.string('email').notNullable().unique()
      table.string('password').notNullable()
      table.string('specialty').notNullable()

      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}