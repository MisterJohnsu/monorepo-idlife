import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Medicos extends BaseSchema {
  protected tableName = 'medicos'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('cd_medico').primary()
      table.integer('crm').notNullable().unique()
      table.string('nm_medico').notNullable()
      table.string('email').notNullable().unique()
      table.string('senha').notNullable()
      table.string('nm_especializacao').notNullable()

      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
