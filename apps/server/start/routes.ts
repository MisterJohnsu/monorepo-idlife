import MedicController from '#controllers/medic_controller'
import router from '@adonisjs/core/services/router'


router.group(() => {
  router.group(() => {
    router.post('/register', [MedicController, 'pacientCreate'])
    // router.put('/:id', [PacienteController, 'update'])
    // router.delete('/:id', [PacienteController, 'destroy'])
    // router.get('/:id', [PacienteController, 'show'])
  }).prefix('pacients')
}).prefix('api')