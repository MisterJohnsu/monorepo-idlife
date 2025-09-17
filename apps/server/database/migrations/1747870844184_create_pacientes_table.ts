import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'pacientes'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('cd_paciente').primary().notNullable()
      table.string('cpf', 11).notNullable().unique()
      table.string('nm_paciente').notNullable()
      table.date('dt_nascimento').notNullable()
      table.string('nm_sexo').notNullable()
      table.string('nm_tipo_sanguineo').notNullable()
      table.string('cd_telefone_ctt_emergencia', 15).nullable()
      table.string('nm_ctt_emergencia', 100).nullable()
      table.string('tx_info_adicional').nullable()
      table.string('nm_convenio').nullable()
      table.string('nm_alergia').nullable()
      table.string('nm_aparelho').nullable()
      table.string('nm_medicamentos').nullable()
      table.string('nm_doenca').nullable()
      table.string('nm_parentesco').nullable()
      table.string('email').notNullable().unique()
      table.string('senha').notNullable()
      table.integer('cd_medico').unsigned().references('cd_medico').inTable('medicos')

      table.timestamps(true)
    })
  }
  async down() {
    this.schema.dropTable(this.tableName)
  }
}
