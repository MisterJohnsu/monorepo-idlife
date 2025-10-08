import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'consultas'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('consulta_id').primary().notNullable()
      table.foreign('paciente_id').references('paciente_id').inTable('pacientes')
      table.foreign('medico_id').references('medico_id').inTable('medicos')
      table.date('dt_consulta').notNullable()
      table.string('diagnostico').notNullable()
      table.string('observacoes').nullable()

      table.timestamps(true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
