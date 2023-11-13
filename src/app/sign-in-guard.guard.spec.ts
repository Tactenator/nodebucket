import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { signInGuardGuard } from './sign-in-guard.guard';

describe('signInGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
      TestBed.runInInjectionContext(() => signInGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
