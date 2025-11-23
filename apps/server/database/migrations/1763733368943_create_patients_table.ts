import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'patients'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      // ID Primário
      table.increments('patientId').primary().notNullable()
      
      // Dados Pessoais
      table.string('patientName').notNullable()
      table.string('email').notNullable().unique()
      table.string('cpf', 11).notNullable().unique()
      table.string('password').notNullable()
      table.string('phone', 15).notNullable()
      table.date('bithDate').notNullable()
      table.json('adress').notNullable()
      
      // Biometria (Nullable para permitir cadastro antes da digital)
      table.integer('dy50_id').nullable().unique() 

      // Dados Médicos/Opcionais
      table.string('gender').notNullable()
      table.string('bloodType').notNullable()
      table.string('emergencyPhone', 15).nullable()
      table.string('emergencyName').nullable()
      table.string('aditionalInfo').nullable()
      table.string('insurance').nullable()
      table.string('allergies').nullable()
      table.string('medicalDevices').nullable()
      table.string('medication').nullable()
      table.string('diseases').nullable()

      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}