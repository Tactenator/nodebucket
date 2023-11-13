/**
 * Title: app.routing.module.ts
 * Author: Trevor McLaurine
 * Date: 11/13/2023
 * Description: App routing module
 */

// imports statements
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseLayoutComponent } from './layouts/base-layout/base-layout.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { TasksComponent } from './tasks/tasks.component';
import { signInGuard } from './sign-in-guard.guard';

// routes array with a path, component, and title for each route in the application (e.g. home, about, contact, etc.)
const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        title: 'Nodebucket: Home' // title for the home page
      },
      {
        path: 'home',
        component: HomeComponent,
        title: 'Nodebucket: Home'
      },
      {
        path: 'about',
        component: AboutComponent,
        title: 'Nodebucket - About'
      },
      {
        path: 'contact',
        component: ContactComponent,
        title: 'Nodebucket - Contact'
      },
      {
        path: 'login',
        component: LoginComponent,
        title: 'Nodebucket - Login'
      },
      {
        path: "tasks",
          component: TasksComponent,
          canActivate: [signInGuard]
      },
      {
        path: '**',
        component: NotfoundComponent,
        title: 'Nodebucket - 404'
      }
    ]
  },
  {
    // path for the security module (e.g. login, register, forgot password, etc.)
    path: 'security',
    loadChildren: () => import('./security/security.module').then(m => m.SecurityModule)
  }
];

@NgModule({
  // imports the RouterModule and defines the routes array and other options (e.g. useHash, enableTracing, scrollPositionRestoration)
  imports: [RouterModule.forRoot(routes, { useHash: true, enableTracing: false, scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
