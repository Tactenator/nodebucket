/**
 * Title: nav.component.ts
 * Author: Trevor McLaurine
 * Date: 11/13/2023
 * Description: Nav Component
 */

// imports statements
import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  empId: String;

  constructor(private cookieService: CookieService ) {}

  checkCookie() {
    this.empId = this.cookieService.get('empId')
    console.log(this.empId)
  }
}
