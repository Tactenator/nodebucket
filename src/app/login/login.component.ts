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
  
  constructor(private router: Router, private fb: FormBuilder, private employeesService: EmployeeServiceService, private cookieService: CookieService) {}

  ngOnInit(): void {
    this.logInForm = this.fb.group({employeeId: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])]});
  }

  onSubmit() {
    const formValues = this.logInForm.value;
    const employeeId = formValues.employeeId;
    this.employeesService.findEmployeeById(employeeId)
        .then((res) => {
          this.cookieService.set('empId', employeeId, 1); 
          this.cookieService.set('name', `$res.name`, 1); 
          this.router.navigate(['/task-dashboard'])
        })
        .catch((error) => {
          console.log(error)
          this.error = 'Employee ID Not Found. Please try again. '
        })
  }

  get form() {
    return this.logInForm.controls;
  }
}
