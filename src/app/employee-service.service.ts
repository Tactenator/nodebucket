/**
 * Title: employee-service.service.ts
 * Author: Trevor McLaurine
 * Date: 11/13/2023
 * Description: Employee services function for handling employee data
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {

  //initializes array of valid employee Ids
  employeeIds: Array<string> = ["1007", "1008", "1009", "1010", "1011", "1012"];
  employee: Object;

  constructor(private cookieService: CookieService) { }

  //sends request via fetch API to search for employee.
  async findEmployeeById(empId: string): Promise<Observable<any>> {
    const response = await fetch(`https://nodebucket-api.onrender.com/api/employees/${empId}`)
    const employee = await response.json()
    this.cookieService.set('empId', employee.empId);
    this.cookieService.set('name', employee.name);
    return employee
  }

  //validates if employee ID inputted is included in the employeeIds array.
  validateEmployee(employeeId: string) {
    return this.employeeIds.some(id => id ===employeeId);
  }

}
