import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'consultas'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('consulta_id').primary().notNullable()

      // Vínculo com Pacientes (PK: paciente_id)
      table
        .integer('patientId')
        .unsigned()
        .notNullable()
        .references('patientId')
        .inTable('patients')
        .onDelete('CASCADE')

      // Vínculo com Médicos (Tabela: doctors, PK: medico_id)
      table
        .integer('doctorId')
        .unsigned()
        .notNullable()
        .references('doctorId')
        .inTable('doctors') 
        .onDelete('CASCADE')

      // Dados da consulta
      table.date('dtConsulta').notNullable()
      table.string('observations').nullable()

      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}