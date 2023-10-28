import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {

  employeeIds: Array<number> = [1007, 1008, 1009, 1010, 1011, 1012];

  constructor() { }

  async findEmployeeById(id: string): Promise<Observable<any>> {
    const response = await fetch(`http://localhost:3000/api/employees/${id}`)
    const employee = await response.json()
    console.log(employee)
    return employee
  }

  validateEmployee(employeeId: number) {
    return this.employeeIds.some(id => id ===employeeId);
  }

}
