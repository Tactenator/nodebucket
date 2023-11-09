import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {

  employeeIds: Array<string> = ["1007", "1008", "1009", "1010", "1011", "1012"];
  employee: Object;

  constructor(private cookieService: CookieService) { }

  async findEmployeeById(empId: string): Promise<Observable<any>> {
    const response = await fetch(`http://localhost:3000/api/employees/${empId}`)
    const employee = await response.json()
    this.cookieService.set('empId', employee.empId);
    this.cookieService.set('name', employee.name);
    return employee
  }

  validateEmployee(employeeId: string) {
    return this.employeeIds.some(id => id ===employeeId);
  }

}
