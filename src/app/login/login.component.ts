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

  loginInForm: FormGroup; 
  error: String; 
  
  constructor(private router: Router, private fb: FormBuilder, private employeesService: EmployeesService, private cookieService: CookieService) {}

  ngOnInit(): void {
    this.loginInForm = this.fb.group({employeeId: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])]});
  }
}
