import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Medicos extends BaseSchema {
  protected tableName = 'doctors'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('medico_id').primary()
      table.integer('crm').notNullable().unique()
      table.string('medic_name').notNullable()
      table.string('email').notNullable().unique()
      table.string('password').notNullable()
      table.string('especializacao').notNullable()

      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
