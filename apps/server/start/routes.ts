import EmployeeController from '#controllers/employee_controller'
import AuthController from '#controllers/auth_controller'
import router from '@adonisjs/core/services/router'

router.group(() => {
  router.group(() => {
    router.post('/register', [EmployeeController, 'patientCreate'])
    router.get('/search/:id', [EmployeeController, 'patientShow'])

    // Rota de login de pacientes no Adonis
    router.post('/login-patient', [AuthController, 'loginPatient'])
  }).prefix('patients')

  router.group(() => {
  router.post('/login-employee', [AuthController, 'loginEmployee'])
  router.post('/register', [EmployeeController, 'employeeCreate'])
  }).prefix('employees')
}).prefix('api')