import AuthController from '#controllers/auth_controller'
import DoctorController from '#controllers/doctor_controller'
import router from '@adonisjs/core/services/router'

router.group(() => {
  router.group(() => {
    router.post('/register', [DoctorController, 'patientCreate'])
    router.post('/search', [DoctorController, 'patientShow'])

    // Rota de login de pacientes no Adonis
    router.post('/login-patient', [AuthController, 'loginPatient'])
  }).prefix('patients')

  router.group(() => {
  router.post('/login-employee', [AuthController, 'loginEmployee'])
  })
}).prefix('api')