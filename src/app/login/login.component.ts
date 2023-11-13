/**
 * Title: login.component.ts
 * Author: Trevor McLaurine
 * Date: 11/13/2023
 * Description: Login Component
 */

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeServiceService } from '../employee-service.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  logInForm: FormGroup;
  error: String;
  empId: String;

  constructor(private router: Router, private fb: FormBuilder, private employeesService: EmployeeServiceService, private cookieService: CookieService) {}

  ngOnInit(): void {
    //initiates login form
    this.logInForm = this.fb.group({employeeId: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])]});

    //checks to see if there is a cookie for employee id
    this.checkCookie()
  }

  onSubmit() {
    const formValues = this.logInForm.value;
    const employeeId = formValues.employeeId;
    //checks if the user ID inputted is valid. If it is, will send user to their task page. If not, will send error message.
    const validUser = this.employeesService.validateEmployee(employeeId)
    if(validUser) {
      this.employeesService.findEmployeeById(employeeId)
      .then(() => {
        this.router.navigate(['/tasks'])
      })
      .catch((error) => {
        console.log(error)
        this.error = 'Employee ID Not Found. Please try again. '
      })
    }
    return this.error = 'Employee ID Not Found. Please try again. '
  }

  //initializes this.empId if there is a cookie for employee ID
  checkCookie() {
    this.empId = this.cookieService.get('empId')
  }

  get form() {
    return this.logInForm.controls;
  }
}
