import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'appointments'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('appointment_id').primary().notNullable()

      // Vínculo com Pacientes (PK: paciente_id)
      table
        .integer('patient_id')
        .unsigned()
        .notNullable()
        .references('patient_id')
        .inTable('patients')
        .onDelete('CASCADE')

      // Vínculo com Médicos (Tabela: doctors, PK: medico_id)
      table
        .integer('employee_id')
        .unsigned()
        .notNullable()
        .references('employee_id')
        .inTable('employees') 
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