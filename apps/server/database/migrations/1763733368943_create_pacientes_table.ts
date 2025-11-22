import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'pacientes'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      // ID Primário
      table.increments('paciente_id').primary().notNullable()
      
      // Dados Pessoais
      table.string('paciente_name').notNullable()
      table.string('email').notNullable().unique()
      table.string('cpf', 11).notNullable().unique()
      table.string('password').notNullable()
      table.string('telefone', 15).notNullable()
      table.date('dt_nascimento').notNullable()
      
      // Biometria (Nullable para permitir cadastro antes da digital)
      table.integer('dy50_id').nullable().unique() 

      // Dados Médicos/Opcionais
      table.string('sexo').notNullable()
      table.string('tipo_sanguineo').notNullable()
      table.string('telefone_ctt_emergencia', 15).nullable()
      table.string('ctt_emergencia_name').nullable()
      table.string('info_adicional').nullable()
      table.string('convenio').nullable()
      table.string('alergia').nullable()
      table.string('aparelho').nullable()
      table.string('medicamentos').nullable()
      table.string('doencas').nullable()

      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}