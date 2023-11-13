/**
 * Title: security-routing.module.ts
 * Author: Trevor McLaurine
 * Date: 11/13/2023
 * Description: Security Routing
 */

// imports statements
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecurityComponent } from './security.component';

const routes: Routes = [
  {
    path: '',
    component: SecurityComponent,
    title: 'Nodebucket: Security'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule { }
