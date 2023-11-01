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
    this.logInForm = this.fb.group({employeeId: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])]});
    this.checkCookie()
  }

  onSubmit() {
    const formValues = this.logInForm.value;
    const employeeId = formValues.employeeId;
    this.employeesService.findEmployeeById(employeeId)
        .then((res) => {
          this.router.navigate(['/tasks'])
        })
        .catch((error) => {
          console.log(error)
          this.error = 'Employee ID Not Found. Please try again. '
        })
  }

  checkCookie() {
    this.empId = this.cookieService.get('empId')
  }

  get form() {
    return this.logInForm.controls;
  }
}
