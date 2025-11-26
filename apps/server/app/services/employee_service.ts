import Employees from "#models/employee";

export class EmployeeService {

    public async create(data: any) {
        try {
            const dataCreateEmployee = {
                employeeName: data.employeeName,
                email: data.email,
                password: data.password,
                phone: data.phone,
                position: data.position,
                crm: data.crm,
                specialty: data.specialty,
            }
            const employee = await Employees.create({ ...dataCreateEmployee })
            return employee
        } catch (error) {
            throw error
        }
    }
}