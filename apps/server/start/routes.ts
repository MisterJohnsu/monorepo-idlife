import { DoctorController } from '#controllers/doctor_controller'
import router from '@adonisjs/core/services/router'


router.group(() => {
  router.group(() => {
    router.post('/register', [DoctorController, 'pacientCreate'])
    // router.put('/:id', [PacienteController, 'update'])
    // router.delete('/:id', [PacienteController, 'destroy'])
    // router.get('/:id', [PacienteController, 'show'])
  }).prefix('pacients')
}).prefix('api')