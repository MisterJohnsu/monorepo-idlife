import { test } from '@japa/runner'
import Paciente from '#models/patient'
import Ws from '#services/websocket_service'

test.group('functional', (group) => {

  group.each.setup(async () => {
    // Limpeza preventiva
    await Paciente.query().where('email', 'teste.japa@email.com').delete()
    await Paciente.query().where('email', 'digital.teste@email.com').delete()
    await Paciente.query().where('email', 'update.teste@email.com').delete()
    await Ws.boot()
  })

  /**
   * TESTE 1: CRIAR PACIENTE
   */
  test('deve criar um novo paciente com dados válidos', async ({ client, assert }) => {
    const payload = {
      data: {
        paciente_name: 'Japa Teste Silva',
        email: 'teste.japa@email.com',
        cpf: '11122233344',
        password: 'senha_secreta',
        telefone: '11999998888',
        dt_nascimento: '1990-01-01',
        sexo: 'M',
        tipo_sanguineo: 'O+'
      }

    }

    const response = await client.post('/api/pacientes/register').json(payload)


    response.assertStatus(201)
    response.assertBodyContains({ message: 'Paciente cadastrado com sucesso' })
  })

  /**
   * TESTE 2: VINCULAR DIGITAL
   */
  test('deve cadastrar a digital ao paciente criado', async ({ client, assert }) => {
    // 1. Cria paciente
    const paciente = await Paciente.create({
      paciente_name: 'Paciente Digital',
      email: 'digital.teste@email.com',
      cpf: '99988877766',
      password: '123',
      telefone: '11999990000',
      dtNascimento: '2000-01-01' as any,
      sexo: 'M',
      tipoSanguineo: 'O+'
    })

    // Garante que o ID foi carregado
    await paciente.refresh()

    const payload = { sensorId: 100 }

    // 2. Chama Rota
    const response = await client
      .post(`/api/pacientes/${paciente.paciente_id}/digital`)
      .json(payload)

    // 3. Assert (CORRIGIDO PARA 201)
    response.assertStatus(201)
    response.assertBodyContains({ message: 'Registro digital do paciente vinculado com sucesso' })

    await paciente.refresh()
    assert.equal(paciente.dy50_id, 100)
  }).skip()

  /**
   * TESTE 3: ATUALIZAR
   */
  test('deve atualizar as informações do paciente', async ({ client, assert }) => {
    const paciente = await Paciente.create({
      paciente_name: 'Paciente Update',
      email: 'update.teste@email.com',
      cpf: '88877766655',
      password: '123',
      telefone: '11000000000',
      dtNascimento: '1995-05-05' as any,
      sexo: 'F',
      tipoSanguineo: 'AB+'
    })

    await paciente.refresh()

    const payload = {
      telefone: '11988887777',
      convenio: 'Unimed'
    }

    const response = await client
      .put(`/api/pacientes/${paciente.paciente_id}`)
      .json(payload)

    response.assertStatus(200)
    response.assertBodyContains({ message: 'Paciente atualizado com sucesso' })

    await paciente.refresh()
    assert.equal(paciente.telefone, payload.telefone)
    assert.equal(paciente.convenio, payload.convenio)
  }).skip()

  /**
   * TESTE 4: ERRO VALIDAÇÃO
   */
  test('deve retornar erro 400 se faltar campos obrigatórios', async ({ client }) => {
    const payloadIncompleto = {
      paciente_name: 'Japa Incompleto',
      email: 'erro@japa.com'
    }

    const response = await client.post('/api/pacientes/register').json(payloadIncompleto)

    response.assertStatus(400) // Ou 500/422 dependendo de como seu Controller trata o erro manual
  }).skip()

})