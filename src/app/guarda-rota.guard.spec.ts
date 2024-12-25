import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { guardaRotaGuard } from './guarda-rota.guard';

describe('guardaRotaGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => guardaRotaGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
