import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'consultas'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('consulta_id').primary().notNullable()

      // Vínculo com Pacientes (PK: paciente_id)
      table
        .integer('paciente_id')
        .unsigned()
        .notNullable()
        .references('paciente_id')
        .inTable('pacientes')
        .onDelete('CASCADE')

      // Vínculo com Médicos (Tabela: doctors, PK: medico_id)
      table
        .integer('medico_id')
        .unsigned()
        .notNullable()
        .references('medico_id')
        .inTable('doctors') 
        .onDelete('CASCADE')

      // Dados da consulta
      table.date('dt_consulta').notNullable()
      table.string('diagnostico').notNullable()
      table.string('observacoes').nullable()

      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}