import { CanActivateFn } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { inject } from '@angular/core';

export const signInGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService);

  const user = cookieService.get('employeeID');
  if (user) {
    return true;
  }
  
  else {
    const router = inject(Router);
    router.navigate(['/sign-in']);
    return false;
  }
};

export const signInGuardGuard: CanActivateFn = (route, state) => {
  return true;
};
