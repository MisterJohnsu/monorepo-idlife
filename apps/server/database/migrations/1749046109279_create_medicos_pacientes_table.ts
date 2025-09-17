import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'medicos_pacientes'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table
        .integer('cd_paciente')
        .unsigned()
        .references('cd_paciente')
        .inTable('pacientes')
        .onDelete('CASCADE')
        .notNullable()
      table
        .integer('cd_medico')
        .unsigned()
        .references('cd_medico')
        .inTable('medicos')
        .onDelete('CASCADE')
        .notNullable()

      table.primary(['cd_paciente', 'cd_medico'])

      table.timestamps(true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
