import router from '@adonisjs/core/services/router'

const PacientesController = () => import('#controllers/pacientes_controller')
const DocumentosController = () => import('#controllers/documentos_prova_controller')
const ConveniosController = () => import('#controllers/convenios_controller')
const MedicosController = () => import('#controllers/medicos_controller')
const ParentescosController = () => import('#controllers/parentescos_controller')
const TipoSanguineosController = () => import('#controllers/tipo_sanguineos_controller')

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
    router.post('/register', [DocumentosController, 'create'])
    router.put('/:id', [DocumentosController, 'update'])
    router.get('/:id', [DocumentosController, 'show'])
    router.delete('/:id', [DocumentosController, 'destroy'])
  })
  .prefix('documentos')

router
  .group(() => {
    router.post('/register', [ConveniosController, 'create'])
    router.put('/:id', [ConveniosController, 'update'])
    router.get('/:id', [ConveniosController, 'show'])
    router.delete('/:id', [ConveniosController, 'destroy'])
  })
  .prefix('convenios')

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
    router.post('/register', [ParentescosController, 'create'])
    router.put('/:id', [ParentescosController, 'update'])
    router.get('/:id', [ParentescosController, 'show'])
    router.delete('/:id', [ParentescosController, 'destroy'])
  })
  .prefix('parentescos')

router
  .group(() => {
    router.post('/register', [TipoSanguineosController, 'create'])
    router.put('/:id', [TipoSanguineosController, 'update'])
    router.get('/:id', [TipoSanguineosController, 'show'])
    router.delete('/:id', [TipoSanguineosController, 'destroy'])
  })
  .prefix('tipos_sanguineos')
