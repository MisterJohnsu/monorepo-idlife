import Employees from "#models/employee";
import WS from './Ws.ts';

export class EmployeeService {

    public async create(data: any) {
        try {
            const dataCreateEmployee = {
                position: data.position,
                crm: data.crm,
                employeeName: data.employeeName,
                email: data.email,
                password: data.password,
                specialty: data.specialty,
                phone: data.phone,
            }
            const employee = await Employees.create({ ...dataCreateEmployee })
            return employee
        } catch (error) {

        }
    }
}