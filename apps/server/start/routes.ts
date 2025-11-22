import router from '@adonisjs/core/services/router'

const PacienteController = () => import('#controllers/Http/pacientes_controller')
const SensorController = () => import('#controllers/Http/biometria_controller')

router.group(() => {

  router.get('/', async () => {
    return { status: 'API Online', version: '1.0' }
  })

  router.post('/leitura-sensor', [SensorController, 'handleLeitura'])

  router.group(() => {
    
    router.post('/register', [PacienteController, 'create'])
    router.post('/register/biometric', [PacienteController, 'createWithBiometric'])
    router.put('/:id', [PacienteController, 'update'])
    router.delete('/:id', [PacienteController, 'destroy'])
    router.get('/:id', [PacienteController, 'show'])
    

  }).prefix('pacientes')

}).prefix('api')