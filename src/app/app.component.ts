/**
 * Title: app.component.ts
 * Author: Trevor McLaurine
 * Date: 11/13/2023
 * Description: App component
 */

// imports statements
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <!-- This router-outlet displays the content of the BaseLayout or AuthLayout components -->
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
}
