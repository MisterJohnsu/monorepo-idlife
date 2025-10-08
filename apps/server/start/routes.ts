import router from '@adonisjs/core/services/router'

const PacientesController = () => import('#controllers/pacientes_controller')
const MedicosController = () => import('#controllers/medicos_controller')
const ConsultasController = () => import('#controllers/consultas_controller')

router
  .group(() => {
    router.post('/register', [PacientesController, 'create'])
    router.put('/:cpf', [PacientesController, 'update'])
    router.get('/:cpf', [PacientesController, 'show'])
    router.delete('/:cpf', [PacientesController, 'destroy'])
  })
  .prefix('pacientes')

router
  .group(() => {
    router.post('/register', [MedicosController, 'create'])
    router.get('/:crm', [MedicosController, 'show'])
    router.put('/:crm', [MedicosController, 'update'])
    router.delete('/:crm', [MedicosController, 'destroy'])
  })
  .prefix('medicos')

router
  .group(() => {
    router.post('/register', [ConsultasController, 'create'])
    router.post('/show', [ConsultasController, 'show'])
    router.put('/:consulta_id', [ConsultasController, 'update'])
    router.delete('/:consulta_id', [ConsultasController, 'destroy'])
  })
  .prefix('consultas')